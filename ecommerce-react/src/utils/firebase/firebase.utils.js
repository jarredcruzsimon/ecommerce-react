// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcZCDH4GihWWQCzuOAuS02fj8Jzq7_sHo",
  authDomain: "e-commerce-react-68a3c.firebaseapp.com",
  projectId: "e-commerce-react-68a3c",
  storageBucket: "e-commerce-react-68a3c.appspot.com",
  messagingSenderId: "158294578916",
  appId: "1:158294578916:web:09ac1155dc97d18d7efef1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const singInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
// allows us to use database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    // if no userAuth is present, return without running the rest of the function
    if (!userAuth) return

    // doc(database, collection, identifier)
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot.exists())

    // check if user data exists
    // if user data does not exist, create/ set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()){
        const { displayName, email } = userAuth
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }
        catch(error){
            console.log('error creating the user', error.message)
        }
    }
    
    // return userDocRef
    return userDocRef

}

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    // if no email or password is present, return without running function
    if(!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    // if no email or password is present, return without running function
    if(!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async() => await signOut(auth)

// onAuthStateChanged takes two params, auth and a callback function defined by you
export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback)
}