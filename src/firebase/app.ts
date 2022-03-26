// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMffnbHwxaR_9imPkZRPPKZzaU-17Qwp0",
  authDomain: "pricebin-app.firebaseapp.com",
  projectId: "pricebin-app",
  storageBucket: "pricebin-app.appspot.com",
  messagingSenderId: "477369254750",
  appId: "1:477369254750:web:37c25089fae6152b5645cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;