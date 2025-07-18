// login.js

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
  // Get references to the form and the login button
  const loginForm = document.getElementById('loginForm');
  const loginButton = document.getElementById('loginButton');
  const inputUsername = document.getElementById('inputUsername');
  const inputPassword = document.getElementById('inputPassword');

  // Check if all necessary elements exist before adding event listeners
  if (loginForm && loginButton && inputUsername && inputPassword) {
    // Add a click event listener to the login button
    loginButton.addEventListener('click', function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Simple client-side validation
      if (inputUsername.value.trim() === '' || inputPassword.value.trim() === '') {
        // In a real application, you'd show a more user-friendly error message
        // For now, we'll just log to the console.
        console.log("Please enter both username and password.");
        // You could also add a visual alert here, e.g., by adding a class to input fields
        // or displaying a small message below the form.
        return; // Stop the function if validation fails
      }

      // Simulate a successful login
      // In a real application, you would send these credentials to a server
      // for authentication. If the server responds with success, then redirect.
      console.log("Login successful! Redirecting to home page...");
      window.location.href = 'index.html'; // Redirect to your home page
    });
  } else {
    console.error("One or more required elements (form, button, inputs) not found for login script.");
  }
});
