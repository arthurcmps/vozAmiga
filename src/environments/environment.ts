import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyBMHKgKgvapxItq_tj7AF055e0BmTO-45w",
  authDomain: "vozamiga-3531f.firebaseapp.com",
  projectId: "vozamiga-3531f",
  storageBucket: "vozamiga-3531f.firebasestorage.app",
  messagingSenderId: "1044756771410",
  appId: "1:1044756771410:web:15272ffec7d9b0398d258b",
  measurementId: "G-TLPDKDP6VX"
};

export const environment = {
  production: false,
  firebaseConfig: firebaseConfig
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
