import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCg4UBblEWSPz_Io8B0NeTD7-6on3rsGh8",
    authDomain: "pandoteka-711cd.firebaseapp.com",
    projectId: "pandoteka-711cd",
    storageBucket: "pandoteka-711cd.appspot.com",
    messagingSenderId: "269061830707",
    appId: "1:269061830707:web:89ec9834aef899c02b0b46"
  };


  export const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const auth = getAuth(app);

