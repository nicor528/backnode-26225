import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || process.env.apiKey,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || process.env.authDomain,
  projectId: process.env.FIREBASE_PROJECT_ID || "back-node-c56b7",
  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET || process.env.storageBucket,
  messagingSenderId:
    process.env.FIREBASE_MESSAGING_SENDER_ID || "795466829073",
  appId: process.env.FIREBASE_APP_ID || process.env.appId,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicio de Autenticación de Firebase
const auth = getAuth(app);

export { auth };
