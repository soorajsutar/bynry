// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5vkTQUYPrcd3rG3lDQ76JR8uJ45rQOQI",
  authDomain: "bynry-5b6ba.firebaseapp.com",
  databaseURL: "https://bynry-5b6ba-default-rtdb.firebaseio.com",
  projectId: "bynry-5b6ba",
  storageBucket: "bynry-5b6ba.firebasestorage.app",
  messagingSenderId: "95344839680",
  appId: "1:95344839680:web:65153f402d0afed216dce5",
  measurementId: "G-5ME30QL33R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export {storage}