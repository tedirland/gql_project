import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCToTM3ltmjfVN6z5uoALEUdlA6Nul-EK8',
  authDomain: 'graphqlreactnode-1ba7a.firebaseapp.com',
  projectId: 'graphqlreactnode-1ba7a',
  storageBucket: 'graphqlreactnode-1ba7a.appspot.com',
  // messagingSenderId: '605744907013',
  appId: '1:605744907013:web:be9ef9a8d0852289532d6c',
  measurementId: 'G-011W48FBTT',
};

firebase.initalizeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.googleAuthProvider();
