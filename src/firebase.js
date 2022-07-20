import firebase from "firebase";

const {
  REACT_APP_APIKEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSENGING_SENDER_ID,
  REACT_APP_APP_ID
} = process.env;

const firebaseApp = firebase.initializeApp( {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSENGING_SENDER_ID,
  appId: REACT_APP_APP_ID
});


const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {
  db,
  auth,
  storage
};