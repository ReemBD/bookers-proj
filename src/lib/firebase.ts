// Import the functions you need from the SDKs you need
import { FirebaseOptions } from 'firebase/app';
import { Auth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyCjHa0M_YMnwxryqzSVGNLbAjoAJlFSPLA',
  authDomain: 'bookers-78115.firebaseapp.com',
  projectId: 'bookers-78115',
  storageBucket: 'bookers-78115.appspot.com',
  messagingSenderId: '669219133075',
  appId: '1:669219133075:web:961431b107ced46c8c1f66',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth: any = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Initialize Firebase
// const app: FirebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
