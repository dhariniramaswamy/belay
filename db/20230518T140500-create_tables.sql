create table users (
    id INTEGER PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    session_token VARCHAR(30) NOT NULL
);

create table channels (
    id INTEGER PRIMARY KEY,
    channel_name VARCHAR(30) NOT NULL
);

create table messages (
    id INTEGER PRIMARY KEY,
    msg_body VARCHAR(255) NOT NULL,
    channel_id INTEGER NOT NULL,
    user_id INTEGER,
    reply_body VARCHAR(255),
    reply_user_id INTEGER,
    FOREIGN KEY(channel_id) REFERENCES channels(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(reply_user_id) REFERENCES users(id)
);

create table reactions (
    id INTEGER PRIMARY KEY,
    emoji VARCHAR(30),
    user_id INTEGER,
    msg_id INTEGER
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(msg_id) REFERENCES messages(id)
);

create table users_messages (
    user_id INTEGER,
    message_id INTEGER,
    PRIMARY KEY(user_id, message_id)
);


