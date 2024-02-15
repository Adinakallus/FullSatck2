//Login
//localStorage.removeItem("sessionToken");

document.addEventListener("DOMContentLoaded", function() {
        // Check if the user is already logged in (e.g., session token cookie exists)
    const sessionToken = getCookie("sessionToken");
    if (sessionToken) {
        // Verify session token on the server-side
        // If the session is valid, redirect the user to the main page/dashboard
        window.location.href = "../HTML/Main.html"
    }
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");
    const registerLink = document.getElementById("registerLink");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        const storedUser = localStorage.getItem(username);
        console.log(storedUser)
        // console.log(JSON.parse("currentUser").password)
        if (storedUser) {
            const storedPassword = JSON.parse(storedUser).password;

            if (password === storedPassword) {
                // Set session token as a cookie
                const sessionToken = generateSessionToken();
                setCookie("sessionToken", sessionToken, 24); // Cookie expires in 10 min

                // Store user information in localStorage
                // localStorage.setItem(username, JSON.stringify({storedUser}));
                 localStorage.setItem("currentUser", JSON.stringify({username:username}));

                
                // Redirect to dashboard or any other page
                window.location.href = "Main.html";
            } else {
                errorMessage.textContent = "Incorrect password. Please try again.";
                errorMessage.style.display = "block";
                errorMessage.style.color="red";

            }
        } else {
            errorMessage.textContent="User does not exist. Please register.";
            errorMessage.style.display="block";
            errorMessage.style.color="red";

        }
    });

    registerLink.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "../HTML/SignUp.html";
    });

    // Function to set a cookie
    function setCookie(name, value, hours) {
        const date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    // Function to get a cookie value by name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

    // Function to generate a session token
    function generateSessionToken() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const tokenLength = 32; 
        let token = '';
    
        for (let i = 0; i < tokenLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters[randomIndex];
        }
    
        return token;
    }
    
});
