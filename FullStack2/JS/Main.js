
document.addEventListener("DOMContentLoaded", function() {
  // Fetch and display user information
  displayUserInfo();
//   displayAdditionalInfo();

  // Function to fetch and display user information
  function displayUserInfo() {
    console.log(JSON.parse(localStorage.getItem("currentUser")))
      // Fetch user information from Local Storage or server
      const userData = JSON.parse(localStorage.getItem("currentUser"));
      console.log(userData)

      if (userData) {
          // Display user information
          const userInfoContainer = document.getElementById("user-info");
          userInfoContainer.innerHTML = `
              <h3>Welcome, ${userData.username}!</h3>
              <p>Email: ${userData.email}</p>
              <p>Top Memory game score: ${userData.attempts}</p>
              <p>Top Tic Tac Toe score: ${userData.score}</p>

              <!-- Add more user information here -->
          `;
      }
  }

//   // Function to display additional user information
//   function displayAdditionalInfo() {
//       // Fetch additional user information (e.g., attempts, games won)
//       // Replace the following sample data with actual user data
//       const additionalInfo = {
//           firstName: "John",
//           username: "john_doe",
//           attempts: 10,
//           gamesWon: 5
//       };

      // Display additional user information
//       const additionalInfoContainer = document.getElementById("additional-info");
//       additionalInfoContainer.innerHTML = `
//           <h3>Additional Information</h3>
//           <p>First Name: ${additionalInfo.firstName}</p>
//           <p>Username: ${additionalInfo.username}</p>
//           <p>Attempts: ${additionalInfo.attempts}</p>
//           <p>Games Won: ${additionalInfo.gamesWon}</p>
//       `;
//   }
});
