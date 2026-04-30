// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, setPersistence, browserSessionPersistence  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNZspfE4Jf1vOAI9ql3-abWizJnzp65Wg",
  authDomain: "staging-fp-cameroon.firebaseapp.com",
  projectId: "staging-fp-cameroon",
  storageBucket: "staging-fp-cameroon.firebasestorage.app",
  messagingSenderId: "678312313898",
  appId: "1:678312313898:web:5ae78c949d7cea8db0af53",
  measurementId: "G-82RH8N473H"
};

const auth_backend = "https://auth-staging.fp-cameroon.com";
const frontend = "https://backdoor-staging.fp-cameroon.com"

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
await setPersistence(auth, browserSessionPersistence);
const db = getFirestore(app);
export { auth, db, auth_backend, frontend };