import Channel from "./channel.js";

export default function Channels ({setMessages, setCurrentChannel, setPage, 
    channels, channelSetter}) {
    return (
        <div>
            <h2>Home</h2>
            <button onClick={() => {
                window.localStorage.removeItem("dramaswamy_session_token");
                console.log("LOGGING OUT");
                history.pushState("", "", "/")
                setPage("/");
                }}>Log Out</button>
            <button onClick={() => {history.pushState("", "", "/profile");
            setPage("/profile")} }>Profile</button>
            <div className="container">
                <div className="channels-column">
                    <h2> Channels </h2>
                        {
                        Object.keys(channels).map((key) => {
                            return (
                            <div key = {key}>
                                <Channel
                                    channelId = {channels[key].id}
                                    channelName = {channels[key].name}
                                    setMessages = {setMessages}
                                    setCurrentChannel = {setCurrentChannel}
                                    setPage= {setPage}
                                />
                            </div>
                        );
                            })
                        }
                    <div className="add-channel">
                        <input id="channel"></input>
                        <button onClick= {() => {
                            const channelInput = document.getElementById("channel");
                            const channel = channelInput.value;
                            const sessionToken = window.localStorage.getItem("dramaswamy_session_token");
                            if (channel){
                                fetch("/api/create_channel", {
                                    "method": "POST",
                                    "headers": {"Content-Type": "application/json",
                                                "channelName": channelName,
                                                "sessionToken": sessionToken}
                                })
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log(data);
                                    const updatedChannels = [...channels, data];
                                    channelSetter(updatedChannels);
                                    history.pushState("", "", `/channels/`);
                                    // setPage(`/channels/${currentChannel}/messages`);
                                    channelInput.value = "";
                                    console.log(channels);
                                })
                            }   
                        }}>Add Channel</button>
                    </div>
                </div>
            </div> 
        </div>
        ); 
}