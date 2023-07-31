export default function Profile({page, setPage}) {
    const sessionToken = window.localStorage.getItem("dramaswamy_session_token");
    console.log("making it to profile page");
    function handleClickUsername () {
        const username = document.getElementById("username").value;
        var fetchUrl = "/api/update_username";
        fetch(fetchUrl, {
            "method": "POST",
            "headers": {"Content-Type": "application/json", "username": username,
            "sessionToken": sessionToken}
        })
        .then((response) => { 
            if(response.status == 200){
                response.json().then((data) => {
                    console.log(data);
                    setPage("/home")
                    history.pushState(page, "", page)
                }
                )
            } else {
                alert("Could not update username");
                console.log(response.status);
            }
        }).catch((response) => {
            console.log(response);
        } 
        );
    }

    function handleClickPassword () {
        const password = document.getElementById("password").value;
        var fetchUrl = "/api/update_password";
        fetch(fetchUrl, {
            "method": "POST",
            "headers": {"Content-Type": "application/json", "password": password,
            "sessionToken": sessionToken}
        })
        .then((response) => { 
            if(response.status == 200){
                response.json().then((data) => {
                    console.log(data);
                    setPage("/home")
                    history.pushState(page, "", page)
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
            <h2>Profile</h2>
            <div className="profile_form">
                <label htmlFor="username">Username</label>
                <input id="username"></input>
                <button className="form_button" onClick={handleClickUsername}>
                Change Username
                </button>
                <label htmlFor="password">Password</label>
                <input id="password" type="password"></input>
                <button className="form_button" onClick={handleClickPassword}>
                Change Password
                </button>
            </div>
        </div>
    );
    }



