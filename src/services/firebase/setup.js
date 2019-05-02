import * as firebase from 'firebase'
import firebaseui from 'firebaseui'


var firebaseConfig = {
    apiKey: "AIzaSyCZ-85o7L2GWyXmE9FbX0rPjocm6sW78bI",
    authDomain: "speedy-coder-218223.firebaseapp.com",
    databaseURL: "https://speedy-coder-218223.firebaseio.com",
    projectId: "speedy-coder-218223",
    storageBucket: "speedy-coder-218223.appspot.com",
    messagingSenderId: "135133276741"
  };
  const uiConfig = {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl:"/App"
};

const firebaseApp =  firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth();
export const db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true,
});

export const startUi = (elementId) => {
    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start(elementId, uiConfig);
};

export default firebaseApp