
export default function Channel({channelId, channelName, setMessages}) {
    
    function handleClick () {
        // if logged in, do all this.
        // else, don't show messages (you'll need to use showMessages)
        // pageSetter(channelId);
        var fetchURL = "/api/get_messages";
        var sessionToken = window.localStorage.getItem("dramaswamy_session_token");
        fetch(fetchURL, {
            "headers": {"channelId": channelId, "sessionToken": sessionToken},
            "Content-Type": "application/json"
        })
        .then((response) => response.json())
        .then((msgs) => {
            setMessages(msgs);
            location.href = `/channels/${channelId}/messages`
            history.pushState("", "", `/channels/${channelId}/messages`);
        }
        );
        }

    return (
        <button className="channel-button"onClick={handleClick}>
        {channelName}
        </button>
    );
    
}





