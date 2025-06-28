// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";



import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Auth, getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";


const firebaseConfig = {
  apiKey: "AIzaSyDZL0bdoqmPkDV2ZXdP6JWw__skx1TH5_I",
  authDomain: "servicesprovider-ae440.firebaseapp.com",
  projectId: "servicesprovider-ae440",
  storageBucket: "servicesprovider-ae440.firebasestorage.app",
  messagingSenderId: "333608178491",
  appId: "1:333608178491:web:f3e4669be38ce37b411d1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o auth com persistência condicional
let auth: Auth;

if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export const db = getFirestore(app);
export { auth };
