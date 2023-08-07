
export default function Channel({channelId, channelName, setMessages, setCurrentChannel}) {
    
    function handleClick () {
        var fetchURL = "/api/get_messages";
        var sessionToken = window.localStorage.getItem("dramaswamy_session_token");
        fetch(fetchURL, {
            "headers": {"channelId": channelId, "sessionToken": sessionToken},
            "Content-Type": "application/json"
        })
        .then((response) => response.json())
        .then((msgs) => {
            setMessages(msgs);
            history.pushState("", "", `/channels/${channelId}/messages`);
            setCurrentChannel(channelId);
        }
        );
        }

    return (
        <button className="channel-button"onClick={handleClick}>
        {channelName}
        </button>
    );
    
}





