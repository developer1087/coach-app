// lib/firebase-client.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // <- זה חשוב
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBZy4mJSCPGFlWxCeo8lBgDBEbLaLbKy5g",
  authDomain: "nextcoach87.firebaseapp.com",
  projectId: "nextcoach87",
  storageBucket: "nextcoach87.appspot.com", // תיקנתי פה, היה חסר "google" בדומיין
  messagingSenderId: "301879525083",
  appId: "1:301879525083:web:b149b94b2b955a7afc16fe",
  measurementId: "G-87C4VXC4PB",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // <- זה החלק שאתה מייצא
//const analytics = getAnalytics(app);

export { auth }; // <- זה מאפשר לקובצים אחרים להשתמש ב-auth
