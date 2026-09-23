import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyDgRA0grZlej1O9tWVG4buxPHdxisWGLKI",
  authDomain: "voz-amiga-353e7.firebaseapp.com",
  projectId: "voz-amiga-353e7",
  storageBucket: "voz-amiga-353e7.firebasestorage.app",
  messagingSenderId: "338111365218",
  appId: "1:338111365218:web:37a785233b61da2b51513b",
  measurementId: "G-EL1X3JS2PX"
};

export const environment = {
  production: true,
  firebaseConfig: firebaseConfig,
  bloquearAutoLogin: false,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
