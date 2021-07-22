import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCToTM3ltmjfVN6z5uoALEUdlA6Nul-EK8',
  authDomain: 'graphqlreactnode-1ba7a.firebaseapp.com',
  projectId: 'graphqlreactnode-1ba7a',
  storageBucket: 'graphqlreactnode-1ba7a.appspot.com',
  // messagingSenderId: "605744907013",
  appId: '1:605744907013:web:1cd52217a164d943532d6c',
  measurementId: 'G-15R91MBPBV',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.default.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
