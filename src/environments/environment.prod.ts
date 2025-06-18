import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyCd22zm_QslFWvh34i9bn2nnWwn9uKu8Hc",
  authDomain: "vozamiga-4f62c.firebaseapp.com",
  projectId: "vozamiga-4f62c",
  storageBucket: "vozamiga-4f62c.firebasestorage.app",
  messagingSenderId: "868814127084",
  appId: "1:868814127084:web:7de201588f19f0c88ccac9",
  measurementId: "G-HZ3ENE2VKY"
};

export const environment = {
  production: true,
  firebaseConfig: firebaseConfig,
  bloquearAutoLogin: false,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
