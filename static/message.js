

export default function Message({messageId, userName, msgBody, setReplies, 
    replyCount, setCurrentMessage, setPage, currentChannel}) {

    function handleClick() {
        // pageSetter(messageId);
        // need to pass in channel id as a prop to push the state
        // history.pushState("", "", `/channels/messages/${messageId}`);
        // if (!replies) {
        //     setCurrentMessage(messageId);
        //     setShowReplies(true);
        // } else {
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
            history.pushState("","",`/channels/${currentChannel}/messages/${messageId}/replies`);
            // setPage(`/channels/${currentChannel}/messages/${messageId}/replies`);
        }
        );
    }
    
    if (replyCount > 0) {
    return(
        <div className="message-container">
            <div className="message-header">
                <span class="username">{userName}</span>
                <button className="reply-button" onClick={handleClick}>Reply</button>
            </div>
            <div className="message-body">
                {msgBody}
            </div>
            <button className="num-replies-button" onClick={handleClick}>{replyCount} replies</button>
        </div>
        
    );
    } else {
    return (
        <div className="message-container">
            <div className="message-header">
                <span class="username">{userName}</span>
                <button className="reply-button" onClick={handleClick}>Reply</button>
            </div>
            <div className="message-body">
                {msgBody}
            </div>
        </div>
    );
    }
}
