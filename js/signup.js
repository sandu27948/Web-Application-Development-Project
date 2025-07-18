// signup.js

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
  // Get references to the form elements
  const signupForm = document.getElementById('signupForm');
  const signupButton = document.getElementById('signupButton');
  const inputUsername = document.getElementById('inputUsername');
  const inputEmail = document.getElementById('inputEmail');
  const inputPassword = document.getElementById('inputPassword');
  const inputConfirmPassword = document.getElementById('inputConfirmPassword');
  const termsCheck = document.getElementById('termsCheck');

  // Check if all necessary elements exist before adding event listeners
  if (signupForm && signupButton && inputUsername && inputEmail && inputPassword && inputConfirmPassword && termsCheck) {
    // Add a click event listener to the sign-up button
    signupButton.addEventListener('click', function(event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Basic client-side validation
      if (inputUsername.value.trim() === '' ||
          inputEmail.value.trim() === '' ||
          inputPassword.value.trim() === '' ||
          inputConfirmPassword.value.trim() === '') {
        console.log("Please fill in all required fields.");
        // In a real app, you'd show a user-friendly error message on the page
        return;
      }

      if (inputPassword.value !== inputConfirmPassword.value) {
        console.log("Passwords do not match.");
        // Show an error message for password mismatch
        return;
      }

      if (!termsCheck.checked) {
        console.log("You must agree to the terms and conditions.");
        // Show an error message for terms not checked
        return;
      }

      // Simulate a successful sign-up
      // In a real application, you would send this data to a server
      // for user registration. If the server responds with success, then redirect.
      console.log("Sign up successful! Redirecting to login page...");
      window.location.href = 'Login Page.html'; // Redirect to the login page
    });
  } else {
    console.error("One or more required elements for sign-up script not found.");
  }
});
