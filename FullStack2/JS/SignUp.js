//SignUp
document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Get form values
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const birthday = document.getElementById("birthday").value;
        const gender = document.getElementById("gender").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const errorMessage = document.getElementById("errorMessage");

        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords don't match. Please try again.";
            errorMessage.style.display = "block";
        } else if (localStorage.getItem(username)) {
            errorMessage.textContent = "Username exists. Please try again.";
            errorMessage.style.display = "block";
        } else {
            // Hide error message
            errorMessage.style.display = "none";
            
            // Store user data in Local Storage
            const userData = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                birthday: birthday,
                gender: gender,
                password: password,
                attempts:0,
                score:0
            };
            localStorage.setItem(username, JSON.stringify(userData));

            // Redirect to login page
            window.location.href = "../HTML/Login.html";
        }
    });
});
