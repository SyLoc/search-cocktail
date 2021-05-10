import firebase from "firebase/app"
import "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcbCIbe3wfLgRNmVPzdlYPVQfX0fOUUbA",
  authDomain: "search-cocktails.firebaseapp.com",
  projectId: "search-cocktails",
  storageBucket: "search-cocktails.appspot.com",
  messagingSenderId: "801039167350",
  appId: "1:801039167350:web:94e9c370943063e1b0d457"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;


