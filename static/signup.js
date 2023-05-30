export default function SignUp({setLogIn, setShowSignUp}){
    function handleClick() {
        history.pushState("", "", "/signup")
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        var fetchUrl = "/api/signup";
        fetch(fetchUrl, {
            "method": "POST",
            "headers": {"Content-Type": "application/json", "username": username, "password": password}
        })
        .then((response) => {
            if(response.status == 200){
                response.json().then((data) => {
                    console.log(data.session_token)
                    window.localStorage.setItem("dramaswamy_session_token", data.session_token);
                    setLogIn(true);
                    setShowSignUp(false);
                }
                )
            } 
    });
    }

    return(
        <div className="sign-up">
            <h2>Sign Up</h2>
            <div className="signup_form">
                <label htmlFor="username">Username</label>
                <input id="username"></input>
                <label htmlFor="password">Password</label>
                <input id="password" type="password"></input>
                <button className="signup_button" onClick={handleClick}>
                Submit
                </button>
            </div>
        </div>
    );
}