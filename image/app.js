
        
        
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";  
    import { getDatabase,ref ,set ,get ,child } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
    
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBMN0hVPPiJpSc27LAgKyUb92VvEESXo5k",
      authDomain: "registration-25bf1.firebaseapp.com",
      databaseURL: "https://registration-25bf1-default-rtdb.firebaseio.com",
      projectId: "registration-25bf1",
      storageBucket: "registration-25bf1.appspot.com",
      messagingSenderId: "214695886883",
      appId: "1:214695886883:web:575ca08cb2f7553319f196"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    
    const db = firebase.database();
      const usersRef = db.ref("users");
    
      const registrationForm = document.getElementById("registrationForm");
      registrationForm.addEventListener("submit", function (e) {
          e.preventDefault();
    
          const username = document.getElementById("username").value.trim();
          const password = document.getElementById("password").value;
          const email = document.getElementById("email").value;
          const phone = document.getElementById("phone").value;
    
          // Validate username (no spaces)
          if (/\s/.test(username)) {
              alert("Username cannot contain spaces.");
              return;
          }
    
          // Validate password (at least 8 characters with 1 number, 1 uppercase, and special characters)
          const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
          if (!passwordRegex.test(password)) {
              alert("Password must be at least 8 characters and contain at least 1 number, 1 uppercase letter, and special characters.");
              return;
          }
    
          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
              alert("Invalid email format.");
              return;
          }
    
          // Validate phone number (10 digits, starts with 07)
          const phoneRegex = /^07\d{8}$/;
          if (!phoneRegex.test(phone)) {
              alert("Invalid phone number format. It should start with '07' and have 10 digits.");
              return;
          }
    
          // Check if the user already exists in Firebase
          usersRef.child(username).once("value", (snapshot) => {
              if (snapshot.exists()) {
                  alert("User already exists.");
              } else {
                  // User does not exist, save the data to Firebase
                  usersRef.child(username).set({
                      username,
                      password,
                      email,
                      phone
                  });
                  alert("Registration successful!");
                  registrationForm.reset();
              }
          });
      });
    
     
     
    