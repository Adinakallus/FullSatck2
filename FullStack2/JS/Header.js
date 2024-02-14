const template = document.createElement('template');
template.innerHTML = `
<header>
        <div class="header-container">
            <h1>Game Time</h1>
            <div class="auth-buttons">
            <button id="logoutButton">Logout</button> <!-- Logout button -->
                <button onclick="location.href='Signup.html'">Sign Up</button>
            </div>
        </div>
    </header>
    `
document.body.appendChild(template.content);