document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerLink = document.getElementById("registerLink");

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";

    if (isLoggedIn) {
        // If user is logged in, redirect to dashboard or any other page
        window.location.href ='../HTML/Main.html';
    }

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Get username and password from form
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        
        // Check if user exists in Local Storage
        const storedUser = localStorage.getItem(username);

        if (storedUser) {
            // If user exists, check password
            const storedPassword = JSON.parse(storedUser).password;

            if (password === storedPassword) {
                // If password is correct, set loggedIn flag in Local Storage
                localStorage.setItem("loggedIn", "true");

                // Redirect to dashboard or any other page
                window.location.href = "Main.html";
            } else {
                errorMessage.textContent = "Incorrect password. Please try again.";
                errorMessage.style.display = "block";            }
        } else {
            errorMessage.textContent="User does not exist. Please register.";
            errorMessage.style.display="block"
        }
    });

    registerLink.addEventListener("click", function(event) {
        event.preventDefault();
        // Redirect to registration page or implement registration logic here
        window.location.href = "../HTML/SignUp.html";
    });

    
  
});

