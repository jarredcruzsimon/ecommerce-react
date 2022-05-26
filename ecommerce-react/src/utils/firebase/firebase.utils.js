// Import the functions you need from the SDKs you need
import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
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


const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const singInWithGooglePopup = () => signInWithPopup(auth, provider);

// allows us to use database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
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
                createdAt
            })
        }
        catch(error){
            console.log('error creating the user', error.message)
        }
    }
    
    // return userDocRef
    return userDocRef

}