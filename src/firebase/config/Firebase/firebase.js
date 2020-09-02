import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebaseConfig";
import Item from "./data/item";
import Favorite from "./data/favorite";
import History from "./data/history";
import User from "./data/users";
import UserPublic from "./data/user_public";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Firebase = {
  // auth
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  },
  signOut: () => {
    return firebase.auth().signOut();
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user);
  },
  passwordReset: email => {
    return firebase.auth().sendPasswordResetEmail(email);
  },
  // firestore
  createNewUser: userData => {
    return firebase
      .firestore()
      .collection("users")
      .doc(`${userData.uid}`)
      .set(userData);
  },
  ...Item, 
  ...Favorite,
  ...History,
  ...User,
  ...UserPublic

};

export default Firebase;