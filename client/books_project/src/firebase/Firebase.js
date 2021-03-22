import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyAbfknw24zIHEFp57c1P9agbBajhNgaTjw",
  authDomain: "booksproject-866a1.firebaseapp.com",
  projectId: "booksproject-866a1",
  storageBucket: "booksproject-866a1.appspot.com",
  messagingSenderId: "1015855103525",
  appId: "1:1015855103525:web:b1c33f9fb0a7e5c1e789cc",
  measurementId: "G-K5NLNMYHNC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;