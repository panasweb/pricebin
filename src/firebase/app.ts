// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaqfSLXvjKdrx5zlp0KlnyTdBiovUg0Qo",
  authDomain: "pricerice-app.firebaseapp.com",
  projectId: "pricerice-app",
  storageBucket: "pricerice-app.appspot.com",
  messagingSenderId: "149697253000",
  appId: "1:149697253000:web:051b2c0f962bfda255d93d"
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase
export default app;