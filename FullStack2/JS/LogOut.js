// logout.js

// Function to clear the session cookie
function clearSessionCookie() {
    document.cookie = "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Function to logout and redirect to the login page
function logout() {
    clearSessionCookie();
    window.location.href = "Login.html"; // Redirect to the login page
}

// Call the logout function when the logout button is clicked
document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});
