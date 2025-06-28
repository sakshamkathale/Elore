import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase,ref,set,get,child } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSLWu9tdEA7Y99IBQRJoSQeYQzVAW4wKA",
  authDomain: "elore-22484.firebaseapp.com",
  projectId: "elore-22484",
  storageBucket: "elore-22484.appspot.com",
  messagingSenderId: "548506269035",
  appId: "1:548506269035:web:5123e6664881ea4143882e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
document.getElementById("submit").addEventListener("click", function(e) {
    
set(ref(db, 'users/' + document.getElementById("username").value), {
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  });
});
