import string
import random
from datetime import datetime
from flask import Flask, g, jsonify, request, render_template
from functools import wraps
import sqlite3


app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0


# --------- DATABASE HELPER FUNCTIONS --------- 

def get_db():
    '''
    Connects to the database
    '''
    db = getattr(g, '_database', None)

    if db is None:
        db = g._database = sqlite3.connect('db/belay.db')
        db.row_factory = sqlite3.Row
        setattr(g, '_database', db)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def query_db(query, args=(), one=False):
    '''
    Reusable function to query the database with
    or without arguments and return a list of tuples.
    '''
    db = get_db()
    cursor = db.execute(query, args)
    rows = cursor.fetchall()
    db.commit()
    cursor.close()
    if rows:
        if one: 
            return rows[0]
        return rows
    return None


@app.route('/')
@app.route('/channels/<channel_id>')
@app.route('/login')
def index(channel_id=None):
    '''
    Renders the webpage.
    '''
    return app.send_static_file('index.html')

# ---------  API ROUTES --------- 

@app.route('/api/signup', methods=["POST"])
def signup():
    '''
    Allows a user to sign up and generates session token.
    '''
    username = request.headers["username"]
    password = request.headers["password"]
    session_token = ''.join(random.choices(string.ascii_lowercase + string.digits, k=40))
    user = query_db("insert into users (username, password, session_token) values (?, ?, ?)", args=[username, password, session_token],
                    one=True)
    return jsonify({"session_token": session_token})


@app.route('/api/login', methods=["GET"])
def login():
    '''
    Allows a user to login and authenticates user.
    '''
    rv = {"status": 404, "error_msg": "account info not found"}
    username = request.headers["userName"]
    password = request.headers["password"]
    session_token = query_db("select session_token from users where username = ? and password = ?",
                           [username, password], one=True)
    if session_token:
        rv = {"session_token":session_token[0], "status": 200}
        print("SESSION_TOKEN: ", session_token)
    return rv

@app.route('/api/create_channel', methods=["POST"])
def create_channel():
    '''
    Creates a new channel
    '''
    if check_session_token():
        channel_name = request.headers["channelName"]
        result = query_db("insert into channels (channel_name) values (?) returning id", [channel_name], one=True)[0]
        print("successfully added channel to DB")
        return jsonify(result)
    else:
        return {"error": "could not validate session token"}


@app.route('/api/get_channels', methods=["GET"])
def get_channels():
    '''
    Returns a json object containing the current channels.
    '''
    if check_session_token():
        channels = query_db("select * from channels", (), one=False)
        channels_js = []
        for channel in channels:
            channel_obj = {}
            channel_obj["id"] = channel[0]
            channel_obj["name"] = channel[1]
            channels_js.append(channel_obj)
        print(channels_js)
        return jsonify(channels_js)
    else:
        return {"error": "Session token not found"}
    

@app.route('/api/get_messages', methods=["GET"])
def get_messages():
    '''
    Returns a json object containing all the messages
    for a given channel.
    '''
    if check_session_token():
        channel_id = request.headers["channelId"]
        print("CHANNEL ID: ", channel_id)
        msgs_js = []
        msgs = query_db("select * from messages where channel_id = ?", [channel_id], one=False)
        if msgs:
            for msg in msgs:
                msg_obj = {}
                msg_id = msg[0]
                user_id = msg[3]
                msg_obj["id"] = msg_id
                msg_obj["msg_user"] = get_username(user_id)
                msg_obj["msg_body"] = msg[1]
                msg_obj["reply_count"] = reply_count(msg_id)
                msgs_js.append(msg_obj)
            print(msgs_js)
            return jsonify(msgs_js)
        else:
            return jsonify(msgs)
    else:
        {"error": "Session token not found"}
    


@app.route('/api/get_replies', methods=["GET"])
def get_replies():
    '''
    Returns a json object containing all the replies
    for a given message.
    '''
    if check_session_token():
        msg_id = request.headers["messageId"]
        print("RECEIVED MSG_ID: ", msg_id)
        replies_js = []
        replies = query_db("select reply_user_id, reply_body from messages where id = ?", [msg_id], one=False)
        print(replies)
        if len(replies) != 0:
            for reply in replies:
                reply_obj = {}
                reply_user_id = reply[0]
                reply_obj["username"] = get_username(reply_user_id)
                reply_obj["reply_body"] = reply[1]
                replies_js.append(reply_obj)
            print(replies)
            return jsonify(replies_js)
        else:
            return jsonify(replies)
    else:
        return {"error": "Session token not found"}


@app.route('/api/add_message', methods=["POST"])
def add_message():
    '''
    Allows a user to post a message
    '''
    if check_session_token():
        session_token = request.headers["sessionToken"]
        user_id = query_db("select id from users where session_token = ?", [session_token], one=True)[0]
        msg_body = request.headers["message"]
        channel_id = request.headers["channelId"]
        result = query_db("insert into messages (msg_body, channel_id, user_id, reply_body, reply_user_id) values (?, ?, ?, ?, ?) returning id",
                          [msg_body, channel_id, user_id, None, None], one=True)[0]
        return jsonify(result)
    else:
        return {"error": "Session token not found"}


@app.route('/api/update_username', methods=["POST"])
def update_username():
    '''
    Allows a user to update the username
    '''
    if check_session_token():
        session_token = request.headers["sessionToken"]
        new_username = request.headers["username"]
        result = query_db("update users set username = ? where session_token = ?", [new_username, session_token], one=False)
        return jsonify(result)
    else:
        return {"error": "Session token not found"}

@app.route('/api/update_password', methods=["POST"])
def update_password():
    '''
    Allows the user to update their password
    '''
    if check_session_token():
        session_token = request.headers["sessionToken"]
        new_password = request.headers["password"]
        result = query_db("update users set password = ? where session_token = ?", [new_password, session_token], one=False)
        return jsonify(result)
    else:
        return {"error": "Session token not found"}

@app.route('/api/update_last_read', methods=["POST"])
def update_last_read():
    '''
    Get the last read message. Need to implement.
    '''
    pass


@app.route('/api/get_unread_count', methods=["GET"])
def get_unread_count():
    '''
    Get count of unread messages. Need to implement.
    '''
    pass


# ---------  HELPER FUNCTIONS --------- 

def check_session_token():
    '''
    Authenticates user
    '''
    rv = None
    session_token = request.headers["sessionToken"]
    print("HELLO")
    print("SESSION_TOKEN: ", session_token)
    user = query_db("select id from users where session_token = ?", [session_token], one=True)
    if user:
        rv = user[0]
        print("USER_ID: ", rv)
    return rv
    

def get_username(user_id):
    '''
    Returns the username given the user id.
    '''
    username = query_db("select username from users where id = ?", [user_id], one=True)[0]
    return username

def reply_count(msg_id):
    '''
    Returns an integer describing the number
    of replies for a message.
    '''
    count = query_db("select count(reply_user_id) from messages where id = ?", [msg_id], one=True)[0]
    return count


# ---------  Commented out code --------- 
# def new_user():
#     name = "Unnamed User #" + ''.join(random.choices(string.digits, k=6))
#     password = ''.join(random.choices(string.ascii_lowercase + string.digits, k=10))
#     session_token = ''.join(random.choices(string.ascii_lowercase + string.digits, k=40))
#     u = query_db('insert into users (username, password, session_token) ' + 
#         'values (?, ?, ?) returning id, username, password, session_token',
#         (name, password, session_token),
#         one=True)
#     return name, session_token