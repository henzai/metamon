import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbuLhsi3cGFaWAKoeHVkjCd5QnEIC0iBY",
  authDomain: "learning-chinese-4d5f7.firebaseapp.com",
  databaseURL: "https://learning-chinese-4d5f7.firebaseio.com",
  projectId: "learning-chinese-4d5f7",
  storageBucket: "learning-chinese-4d5f7.appspot.com",
  messagingSenderId: "690696717878",
  appId: "1:690696717878:web:563d0969eea14aab"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
