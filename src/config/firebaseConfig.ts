// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth";
import * as firebaseAuth from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGWfwuT1G3KyGdL9rnWDi2K49B7YtN3as",
  authDomain: "authentication-f1a54.firebaseapp.com",
  projectId: "authentication-f1a54",
  storageBucket: "authentication-f1a54.appspot.com",
  messagingSenderId: "883627017220",
  appId: "1:883627017220:web:a945dbbc6d21243bdb2151",
  measurementId: "G-9M8P9PMJ7P",
};

// Biến để lưu trữ ứng dụng Firebase
let app;

// Kiểm tra xem Firebase đã được khởi tạo hay chưa
if (!app) {
  app = initializeApp(firebaseConfig);
}

// Khởi tạo Firestore
const db = getFirestore(app);

// Khởi tạo auth với persistence
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
export const auth = initializeAuth(app, {
  persistence: reactNativePersistence(AsyncStorage),
});

// Xuất db
export { db };
