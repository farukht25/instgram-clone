import  firebase from "firebase";






const firebaseApp = firebase.initializeApp( {
  apiKey: "AIzaSyA0DiLs6B_dL-2rSYx9PwJJ0dDiC4CSjm8",
  authDomain: "instagram-clone-b66d2.firebaseapp.com",
  databaseURL: "https://instagram-clone-b66d2-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-b66d2",
  storageBucket: "instagram-clone-b66d2.appspot.com",
  messagingSenderId: "744628290519",
  appId: "1:744628290519:web:ad7b73ada3005cbea30192"
});

 const db = firebaseApp.firestore()
const auth=firebase.auth()
const storage=firebase.storage()

export {db};