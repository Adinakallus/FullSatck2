//main
document.addEventListener("DOMContentLoaded", function() {
  // localStorage.removeItem("sessionToken");

  // Fetch and display user information
  displayUserInfo();
//   displayAdditionalInfo();

  // Function to fetch and display user information
  function displayUserInfo() {
    const username = JSON.parse(localStorage.getItem("currentUser")).username; // Get the username from localStorage
 // Get the username from localStorage

    console.log(JSON.parse(localStorage.getItem(username)))
      // Fetch user information from Local Storage or server
      const userData = JSON.parse(localStorage.getItem(username));

      console.log(userData)

      if (userData) {
          // Display user information
          const userInfoContainer = document.getElementById("user-info");
          userInfoContainer.innerHTML = `
              <h3>Welcome, ${userData.firstName}!</h3>
              <p>Email: ${userData.email}</p>
             

          `;
      }
  }

});
