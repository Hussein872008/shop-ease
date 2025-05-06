import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBn9TueGrFY2xRz9Wtq07W_FtW7Vdr-5k8",
  authDomain: "e-commerce-7d4cf.firebaseapp.com",
  projectId: "e-commerce-7d4cf",
  storageBucket: "e-commerce-7d4cf.firebasestorage.app",
  messagingSenderId: "410749294317",
  appId: "1:410749294317:web:7da3c59f9c259c61ca9ee4",
  measurementId: "G-33XYJSN7NG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
