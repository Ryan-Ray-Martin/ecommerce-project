import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyClsYYIXiPHn-hQHfMsdMTZAEnBBORtyHI",
    authDomain: "crwn-db-76934.firebaseapp.com",
    databaseURL: "https://crwn-db-76934.firebaseio.com",
    projectId: "crwn-db-76934",
    storageBucket: "crwn-db-76934.appspot.com",
    messagingSenderId: "84267189708",
    appId: "1:84267189708:web:ab92843f4d6855a04fc969",
    measurementId: "G-20Y6TK7YD3"

};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error catching user', error.message());

        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;