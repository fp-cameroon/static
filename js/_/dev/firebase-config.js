// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, setPersistence, browserSessionPersistence  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq_iEOmthuDx2kRUCxxwiFrA4z4Cw66Vc",
  authDomain: "dev-fp-cameroon.firebaseapp.com",
  projectId: "dev-fp-cameroon",
  storageBucket: "dev-fp-cameroon.firebasestorage.app",
  messagingSenderId: "255966225885",
  appId: "1:255966225885:web:7a6a85409e64f8cdb60234"
};

const auth_backend = "https://auth-dev.fp-cameroon.com";
const frontend = "http://localhost:8001"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
await setPersistence(auth, browserSessionPersistence);
const db = getFirestore(app);
export { auth, db, auth_backend, frontend };