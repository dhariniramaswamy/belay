export default function LogIn({setPage}) {
    console.log("making it to login");
    function handleClick () {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        var fetchUrl = "/api/login";
        fetch(fetchUrl, {
            "method": "GET",
            "headers": {"Content-Type": "application/json", "username": username, "password": password}
        })
        .then((response) => { 
            if(response.status == 200){
                response.json().then((data) => {
                    console.log(data.session_token)
                    window.localStorage.setItem("dramaswamy_session_token", data.session_token);
                    history.pushState("", "", "/channels");
                    setPage("/channels");
                    // console.log(page);
                }
                )
            } else {
                alert("Username and password do not match what's on file.");
                console.log(response.status);
            }
        }).catch((response) => {
            console.log(response);
        } 
        );
    }

    return (
       <>
       <div>
            <h1 className="app-title">BELAY</h1>
            <div className="login-form">
                <h3 className="sign-in">Sign in</h3>
            <div className="input-group">
                <input type="text" placeholder="Enter Username" name="username" required></input>
            </div>
            <div className="input-group">   
                <input type="text" placeholder="Enter Password" name="password" required></input>
            </div>  
                <button className="form-button" onClick={handleClick}>
                Login
                </button>
            <div className="signup">New user? <button className="signup-button" onClick={() => {history.pushState("", "", "/signup");
            setPage("/signup")}}>Sign up</button></div>
            </div>
        </div>
        </>
    );
    }



