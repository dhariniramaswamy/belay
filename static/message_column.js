import Message from "./message.js";

export default function MessagesColumn({messages, setReplies, 
    currentChannel, setPage, setCurrentMessage}) {
    console.log(messages);
    if (messages) {
    return (
        <div className="messages-column">
        <h2> Messages </h2>
        {
            Object.keys(messages).map((key) => {
                return (
                <div key = {key}>
                    <Message
                        messageId = {messages[key].id}
                        userName = {messages[key].msg_user}
                        msgBody = {messages[key].msg_body}
                        replyCount = {messages[key].reply_count}
                        setReplies={setReplies}
                        setCurrentMessage = {setCurrentMessage}
                        setPage={setPage}
                        currentChannel={currentChannel}
                    />
                </div>
            );
                })
        }
        <div className="add-message">
            <textarea id="message" rows="12" cols="50"></textarea>
            <button onClick= {() => {
                const message = document.getElementById("message").value;
                const sessionToken = window.localStorage.getItem("dramaswamy_session_token");
                if (message){
                    fetch("/api/add_message", {
                        "method": "POST",
                        "headers": {"Content-Type": "application/json",
                                    "channelId": currentChannel,
                                    "sessionToken": sessionToken,
                                    "message": message}
                    })
                    .then((response) => response.json())
                    .then((data) => console.log(data))
                }   
            }}>Post</button>
        </div>
    </div>
    );
    } else {
        return (
            <div className="messages-column">
                <h2> Messages </h2>
                <div className="add-message">
                    <textarea id="message" rows="12" cols="50"></textarea>
                    <button onClick= {() => {
                        const message = document.getElementById("message").value;
                        const sessionToken = window.localStorage.getItem("dramaswamy_session_token");
                        if (message){
                            fetch("/api/add_message", {
                                "method": "POST",
                                "headers": {"Content-Type": "application/json",
                                            "channelId": currentChannel,
                                            "sessionToken": sessionToken,
                                            "message": message}
                            })
                            .then((response) => response.json())
                            .then((data) => console.log(data))
                        }   
                    }}>Post</button>
                </div>
    </div>
        );
        }
}