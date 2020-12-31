import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
const app = firebase.default.initializeApp(firebaseConfig);
const GoogleProvider = new firebase.default.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = (setLoading) => {
  setLoading(true);
  app
    .auth()
    .signInWithPopup(GoogleProvider)
    .then(() => {
      app
        .auth()
        .getRedirectResult()
        .then((result) => {
          if (result.credential) {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    })
    .catch((e) => setLoading(false));
};
export default app;
