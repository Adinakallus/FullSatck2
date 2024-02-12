  // Clear loggedIn flag when page is refreshed
  window.addEventListener("beforeunload", function() {
    localStorage.removeItem("loggedIn");
    window.location.href = "../HTML/Login.html";

});
document.addEventListener("DOMContentLoaded", function() {
  // Fetch and display user information
  displayUserInfo();

  // Function to fetch and display user information
  function displayUserInfo() {
      // Fetch user information from Local Storage or server
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      if (userData) {
          // Display user information
          const userInfoContainer = document.getElementById("user-info");
          userInfoContainer.innerHTML = `
              <h3>Welcome, ${userData.username}!</h3>
              <p>Email: ${userData.email}</p>
              <p>Birthday: ${userData.birthday}</p>
              <!-- Add more user information here -->
          `;
      }
  }
});
//hi