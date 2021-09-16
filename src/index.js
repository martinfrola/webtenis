import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./sass/app.scss";
import firebase from "firebase/app";
import { init } from "emailjs-com";

init("user_xN5AIG38cdM4rXW1fE7zN");

var firebaseConfig = {
  apiKey: "AIzaSyDyFmXt82a0ZZYkg3G27zaRoJNtLig3EPM",
  authDomain: "masterstenisbb.firebaseapp.com",
  projectId: "masterstenisbb",
  storageBucket: "masterstenisbb.appspot.com",
  messagingSenderId: "1006645974596",
  appId: "1:1006645974596:web:f4c4ba4a9d5ce6758b8e11",
  measurementId: "G-XE0JVD50P9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
