export default function LogIn({setLogIn, isLoggedIn, setShowLogIn}) {
    console.log("making it to login");
    function handleClick () {
        history.pushState("", "", "/channels");
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
                    setLogIn(true);
                    console.log(isLoggedIn);
                    setShowLogIn(false);
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

    return(
        <div>
            <h2>Login</h2>
            <div className="login_form">
                <label htmlFor="username">Username</label>
                <input id="username"></input>
                <label htmlFor="password">Password</label>
                <input id="password" type="password"></input>
                <button className="form_button" onClick={handleClick}>
                Submit
                </button>
            </div>
        </div>
    );
    }



