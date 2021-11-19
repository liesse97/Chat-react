import firebase from 'firebase/compat/app';
// import "firebase/auth";
import 'firebase/compat/auth'; //v9


export const auth= firebase.initializeApp ({
  apiKey: "AIzaSyAXUuQc3GyPWbh8ivCHA88vTzppl2GF2fE",
  authDomain: "chat-react-c32a4.firebaseapp.com",
  projectId: "chat-react-c32a4",
  storageBucket: "chat-react-c32a4.appspot.com",
  messagingSenderId: "919701959484",
  appId: "1:919701959484:web:447abef78049cb76dae439"
}).auth();
