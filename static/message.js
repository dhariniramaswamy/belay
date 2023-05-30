

export default function Message({messageId, userName, msgBody, setReplies, replyCount, setCurrentMessage, setShowReplies, replies}) {

    function handleClick() {
        // pageSetter(messageId);
        // need to pass in channel id as a prop to push the state
        // history.pushState("", "", `/channels/messages/${messageId}`);
        if (!replies) {
            setCurrentMessage(messageId);
            setShowReplies(true);
        } else {
        var fetchURL = "/api/get_replies";
        var sessionToken = window.localStorage.getItem("dramaswamy_session_token");
        fetch(fetchURL, {
            "headers": {"messageId": messageId, "sessionToken": sessionToken},
            "Content-Type": "application/json"
        })
        .then((response) => response.json())
        .then((replies) => {
            console.log(replies);
            setReplies(replies);
            setCurrentMessage(messageId);
            setShowReplies(true);
        }
        );
    }
    }
    
    
    if (replyCount > 0) {
    return(
        <div>
            <p>{userName}</p>
            <p>{msgBody}</p>
            <p>{replyCount} replies</p>
            <button onClick={handleClick}>
            Reply
            </button>
        </div>
        
    );
    } else {
    return (
        <div>
            <p>{userName}</p>
            <p>{msgBody}</p>
            <button onClick={handleClick}>
            Reply
            </button>
        </div>
    );
    }
}



