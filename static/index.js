// // import React, { useState, useEffect } from 'react';
// // import ReactDOM from 'react-dom';
// import Channels from "./channels.js";
// import MessagesColumn from "./message_column.js";
// import Reply from "./reply.js";
// import Profile from "./profile.js";
// import LogIn from "./login.js";
// import SignUp from "./signup.js";
// import RepliesColumn from "./replies_column.js";

// export default function App() {
//   const [channels, channelSetter] = React.useState([]);
//   const [currentChannel, setCurrentChannel] = React.useState("");
//   const [currentMessage, setCurrentMessage] = React.useState("");
//   const [messages, setMessages] = React.useState([]);
//   const [replies, setReplies] = React.useState([]);
//   const [page, setPage] = React.useState("/");


//   function getChannels() {
//     var sessionToken = window.localStorage.getItem("dramaswamy_session_token");
//     fetch("/api/get_channels", {
//         "headers": {"Content-Type": "application/json", "sessionToken": sessionToken}
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//         channelSetter(data);
//     });
//     }


//     const path = window.location.pathname;
//     setPage(path);
    
//     addEventListener("popstate", (event) => {
//       setPage(event);
//     });


//   switch (page) {
//     case "/":
//       console.log("made it to landing");
//       return <LogIn page={page} setPage={setPage} />;
//     case "/signup":
//       return <SignUp page={page} setPage={setPage} />;
//     case "/profile":
//       return <Profile page={page} setPage={setPage} />;
//     case `/channels/${currentChannel}/messages`:
//       console.log(currentChannel);
//       return (
//         <div className="container">
//           <Channels
//             setCurrentChannel={setCurrentChannel}
//             setMessages={setMessages}
//             setPage={setPage}
//             channels={channels}
//           />
//           <MessagesColumn
//             messages={messages}
//             page={setPage}
//             setReplies={setReplies}
//             currentChannel={currentChannel}
//             setCurrentMessage={setCurrentMessage}
//             setMessages={setMessages}
//           />
//         </div>
//       );
//     case `/channels/${currentChannel}/messages/${currentMessage}/replies`:
//       return (
//         <div className="container">
//           <Channels
//             setCurrentChannel={setCurrentChannel}
//             setMessages={setMessages}
//             setPage={setPage}
//             channels={channels}
//           />
//           <MessagesColumn
//             messages={messages}
//             page={setPage}
//             setReplies={setReplies}
//             currentChannel={currentChannel}
//             setCurrentMessage={setCurrentMessage}
//             setMessages={setMessages}
//           />
//           <RepliesColumn
//             currentMessage={currentMessage}
//             replies={replies}
//             setPage={setPage}
//             currentChannel={currentChannel}
//           />
//         </div>
//       );
//     case "/channels":
//       console.log(page);
//       getChannels(channelSetter);
//       return (
//         <div className="container">
//           <Channels
//             setCurrentChannel={setCurrentChannel}
//             setMessages={setMessages}
//             setPage={setPage}
//             channels={channels}
//           />
//         </div>
//       );
//     default:
//       console.log("no match");
//       return null;
//   }
// }

// ReactDOM.render(
//     React.createElement(App),
//     document.getElementById('root')
// );

import Channels from "./channels.js";
import MessagesColumn from "./message_column.js";
import Reply from "./reply.js";
import Profile from "./profile.js";
import LogIn from "./login.js";
import SignUp from "./signup.js";
import RepliesColumn from "./replies_column.js";

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



export default function App () {
    console.log("ACCESSING APP");

    function getChannels(channelSetter) {
        var sessionToken = window.localStorage.getItem("dramaswamy_session_token");
        fetch("/api/get_channels", {
            "headers": {"Content-Type": "application/json", "sessionToken": sessionToken}
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // return data
        channelSetter(data);
        });
    }

    const [channels, channelSetter] = React.useState([]);
    const [currentChannel, setCurrentChannel] = React.useState("");
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const [replies, setReplies] = React.useState([]);
    const [page, setPage] = React.useState("");

    // const router = () => {
    //     const path = window.location.pathname;
    //     console.log(`routing to "${path}"...`);
    // }

        // Listen for changes in the URL and update the route state
        // const handleRouteChange = () => {
    const path = window.location.pathname;
    // const path = window.location.pathname;
    // if (page !== path) {
    //     history.pushState(null, "", page)
    // }
    // console.log(path);
    // console.log(page);
        window.addEventListener("popstate", (event) => {
            setPage(path);
        }
        );
    switch (true) {
        case path == "/":
            console.log("made it to landing");
            return (
            <LogIn setPage={setPage}/>
            );
        case path == "/signup":
            return (<SignUp setPage={setPage}/>);
        case path == "/profile":
            return (<Profile setPage={setPage}/>);
        case path == `/channels/${currentChannel}/messages`:
            console.log(currentChannel);
            return (
                    <div class="container">
                        <Channels
                        channelSetter={channelSetter}
                        setCurrentChannel={setCurrentChannel}
                        setMessages={setMessages}
                        setPage={setPage}
                        channels={channels}/>
                        <MessagesColumn 
                        messages={messages} 
                        page={setPage}
                        setReplies={setReplies} 
                        currentChannel={currentChannel}
                        setCurrentMessage = {setCurrentMessage}
                        setMessages = {setMessages}/>
                    </div>
                
                )
        case path == `/channels/${currentChannel}/messages/${currentMessage}/replies`:
            return (
                <div class="container">
                    <Channels
                    channelSetter={channelSetter}
                    setCurrentChannel={setCurrentChannel}
                    setMessages={setMessages}
                    setPage={setPage}
                    channels={channels}/>
                    <MessagesColumn 
                    messages={messages} 
                    page={setPage}
                    setReplies={setReplies} 
                    currentChannel={currentChannel}
                    setCurrentMessage = {setCurrentMessage}
                    setMessages = {setMessages}/>
                    <RepliesColumn
                    currentMessage={currentMessage}
                    replies={replies}
                    setPage={setPage}
                    currentChannel={currentChannel}/>
                </div>
            )
        case path == "/channels":
            console.log(page);
            getChannels(channelSetter);
            return (
                <div class="container">
                    <Channels
                    channelSetter={channelSetter}
                    setCurrentChannel={setCurrentChannel}
                    setMessages={setMessages}
                    setPage={setPage}
                    channels={channels}/>
                </div>
            )
            default:
              console.log("no match");
              return null;
        }

}

ReactDOM.render(
    React.createElement(App),
    document.getElementById('root')
);