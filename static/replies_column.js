import Reply from "./reply.js";

export default function RepliesColumn({currentMessage, replies, setShowReplies}) {
    const handleCloseReplies = () => {
        setShowReplies(false);
      };
    if (replies) {
    return (

        <div className="replies-column">
            <h2> Thread </h2>
            <button className="close-replies" onClick={handleCloseReplies}>X</button>
            {
                Object.keys(replies).map((key) => {
                    return (
                    <div key = {key}>
                        <Reply
                            userName = {replies[key].username}
                            body = {replies[key].reply_body}
                        />
                    </div>
                );
                    })
            }
                <div className="add-reply">
                    <textarea id="reply" rows="12" cols="50"></textarea>
                    <button onClick= {() => {
                        const reply = document.getElementById("reply").value;
                        const sessionToken = window.localStorage.getItem("dramaswamy_session_token");
                        if (reply){
                            fetch("/api/add_reply", {
                                "method": "POST",
                                "headers": {"Content-Type": "application/json",
                                            "messageId": currentMessage,
                                            "sessionToken": sessionToken,
                                            "reply": reply}
                            })
                            .then((response) => response.json())
                            .then((data) => console.log(data))
                        }   
                    }}>Post</button>
                </div>
        </div>
    ); 
} else {
    return(
        <div className="replies-column">
            <h2> Thread </h2>
            <button className="close-replies" onClick={handleCloseReplies}>X</button>
        <div className="add-reply">
        <textarea id="reply" rows="12" cols="50"></textarea>
        <button onClick= {() => {
            const reply = document.getElementById("reply").value;
            const sessionToken = window.localStorage.getItem("dramaswamy_session_token");
            if (reply){
                fetch("/api/add_reply", {
                    "method": "POST",
                    "headers": {"Content-Type": "application/json",
                                "messageId": currentMessage,
                                "sessionToken": sessionToken,
                                "reply": reply}
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