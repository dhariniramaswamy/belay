import Channel from './channel.js';
import MessagesColumn from './message_column.js';
import Reply from "./reply.js";
import Profile from "./profile.js";
import LogIn from "./login.js";
import SignUp from "./signup.js";
import RepliesColumn from './replies_column.js';

// import { useState } from 'react';
// import { createRoot } from 'react-dom/client';

// types in url directly
// function initAppState(pageSetter, channelSetter) {
//     const path = window.location.href;
//     const page = path;
//     pageSetter(page);
//   }
// // pop state event handler - keep track of /api/login page?
// // get the url, 
// addEventListener("popstate", (event) => {
//     const path = window.location.path
//     switch (true) {
//         case path == "/":
//             setShowMessages(false);
//             setShowSignUp(false);
//             setShowProfile(false);
//             setShowLogIn(false);
//           break;
//         case path == "/login":
//           setShowLogIn(true);
//           break;
//         case path == "/profile":
//           setShowProfile(true);
//           break;
//         case path == `/channels/${currentChannel}`:
//           showOnly(ROOM);
//           break;
//         default:
//           console.log("no match");
//       }
//     }
// );


export default function App () {
    function getChannels(channelSetter) {
        var sessionToken = window.localStorage.getItem("dramaswamy_session_token");
        fetch("/api/get_channels", {
            "headers": {"Content-Type": "application/json", "sessionToken": sessionToken}
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        channelSetter(data);
        });
    }

    const [channels, channelSetter] = React.useState([]);
    const [messages, setMessages] = React.useState([]);
    const [replies, setReplies] = React.useState([]);
    const [isLoggedIn, setLogIn] = React.useState(false);
    const [showLogIn, setShowLogIn] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(false);
    const [showSignUp, setShowSignUp] = React.useState(false);
    const [currentChannel, setCurrentChannel] = React.useState(null);
    const [currentMessage, setCurrentMessage] = React.useState(null);
    const [showMessages, setShowMessages] = React.useState(false);
    const [showReplies, setShowReplies] = React.useState(false);
    const [page, setPageSetter] = React.useState("/");


    React.useEffect(() => {
        if (isLoggedIn) {
          getChannels(channelSetter);
        }
      }, [isLoggedIn]);
    
    if (!isLoggedIn && !showLogIn && !showSignUp) {
        history.pushState("", "", "/")
        return(
            <div>
                <h2>Belay</h2>
                <button onClick={() => {setShowLogIn(true)}}>Log In</button>
                <button onClick={() => {setShowSignUp(true)} }>Sign Up</button>
            </div>
        );
    } else if (showLogIn){
        history.pushState("", "", "/login")
        return (<LogIn setLogIn={setLogIn} isLoggedIn={isLoggedIn} setShowLogIn = {setShowLogIn}/>);
    } else if (showSignUp){
        return <SignUp setLogIn={setLogIn} setShowSignUp={setShowSignUp}/>;
    } else if (showProfile){
        return <Profile setShowProfile={setShowProfile}/>;
    } else if (isLoggedIn) {
        console.log("successfully logged in");
        return (
            <div>
                <h2>Belay</h2>
                <button onClick={() => {
                    window.localStorage.removeItem("dramaswamy_session_token");
                    console.log("LOGGING OUT");
                    setLogIn(false);
                    }}>Log Out</button>
                <button onClick={() => {setShowProfile(true)} }>Profile</button>
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
                                        setShowMessages = {setShowMessages}
                                    />
                                </div>
                            );
                                })
                            }
                        <div className="add-channel">
                            <input id="channel"></input>
                            <button onClick= {() => {
                                const channelName = document.getElementById("channel").value;
                                const sessionToken = window.localStorage.getItem("dramaswamy_session_token");
                                if (channelName){
                                    fetch("/api/create_channel", {
                                        "method": "POST",
                                        "headers": {"Content-Type": "application/json",
                                                    "channelName": channelName,
                                                    "sessionToken": sessionToken}
                                    })
                                    .then((response) => response.json())
                                    .then((data) => console.log(data))
                                }   
                            }}>Add Channel</button>
                        </div>
                    </div>
                    <div>
                        {showMessages && <MessagesColumn 
                        messages={messages} 
                        setMessages={setMessages} 
                        setReplies={setReplies} 
                        currentChannel={currentChannel}
                        setShowReplies={setShowReplies}
                        replies = {replies}
                        setCurrentMessage = {setCurrentMessage}/>}
                    </div>
                    <div>
                        {showReplies && <RepliesColumn 
                        currentMessage = {currentMessage}
                        replies={replies}
                        setShowReplies={setShowReplies}/>}
                    </div>
                </div>
            </div>
            );        
    }
}

ReactDOM.render(
    React.createElement(App),
    document.getElementById('root')
);
