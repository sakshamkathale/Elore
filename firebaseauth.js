// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { GoogleAuthProvider, signInWithPopup, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore, setDoc , doc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfXqWQSZCecvL-zFV3Nmuox0hRKPnCyk0",
  authDomain: "elor-59d13.firebaseapp.com",
  projectId: "elor-59d13",
  storageBucket: "elor-59d13.appspot.com",
  messagingSenderId: "408887076103",
  appId: "1:408887076103:web:eaf9087f34076166ab51a2",
  measurementId: "G-KML3GLZZ0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}

// Email/Password Sign Up
const signUp = document.getElementById('submitSignUp');
if (signUp) {
  signUp.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth();
    const db = getFirestore();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = {
        email: email,
        firstName: firstName,
        lastName: lastName
      };
      showMessage('Account Created Successfully', 'signUpMessage');
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, userData);
      window.location.href = 'index.html';
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!!', 'signUpMessage');
      } else {
        showMessage('unable to create User', 'signUpMessage');
      }
    }
  });
}

// Email/Password Sign In
const signIn = document.getElementById('submitSignIn');
if (signIn) {
  signIn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      showMessage('login is successful', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = 'homepage.html';
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-credential') {
        showMessage('Incorrect Email or Password', 'signInMessage');
      } else {
        showMessage('Account does not Exist', 'signInMessage');
      }
    }
  });
}

// Google Sign Up
const googleSignUpBtn = document.getElementById('googleSignUp');
if (googleSignUpBtn) {
  googleSignUpBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('loggedInUserId', user.uid);
      showMessage('Google Sign Up Successful', 'signUpMessage');
      window.location.href = 'homepage.html';
    } catch (error) {
      showMessage('Google Sign-Up Failed', 'signUpMessage');
    }
  });
}

// Google Sign In
const googleSignInBtn = document.getElementById('googleSignIn');
if (googleSignInBtn) {
  googleSignInBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem('loggedInUserId', user.uid);
      showMessage('Google Sign In Successful', 'signInMessage');
      window.location.href = 'homepage.html';
    } catch (error) {
      showMessage('Google Sign-In Failed', 'signInMessage');
    }
  });
}