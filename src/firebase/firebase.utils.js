import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB9E2M64aJguovLV9-nQNHtnv_AEy62n1U",
    authDomain: "clothing-sales-db.firebaseapp.com",
    databaseURL: "https://clothing-sales-db.firebaseio.com",
    projectId: "clothing-sales-db",
    storageBucket: "clothing-sales-db.appspot.com",
    messagingSenderId: "633066595410",
    appId: "1:633066595410:web:8abafe4493784cd3f52b8b",
    measurementId: "G-RQBN5Z8Z74"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    // Confirm we have a user auth object otherwise we return out.
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;