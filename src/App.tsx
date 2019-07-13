import React, { useEffect, useState } from "react";
import firebase from "./auth/firebase";
import "./App.css";

async function login() {
  const provider = new firebase.auth.GoogleAuthProvider();
  await firebase.auth().signInWithPopup(provider);
}

async function logout() {
  await firebase.auth().signOut();
}

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(
    firebase.auth().currentUser
  );

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  });

  return (
    <div className="App">
      <p className="App-intro">UID: {user && user.uid}</p>

      {user ? (
        <button onClick={e => logout()}>Google Logout</button>
      ) : (
        <button onClick={e => login()}>Google Login</button>
      )}
    </div>
  );
};

export default App;
