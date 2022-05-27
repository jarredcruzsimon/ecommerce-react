// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';

import {
    singInWithGooglePopup,
    createUserDocumentFromAuth,
    // auth,
    // signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const SignIn =()=>{
    
    // useEffect not in use. Use wilth signInWithGoogleRedirect from firebase.utils
    // useEffect( ()=> {
    //    const getRedirect = async () =>{
    //         // after the redirect happens, this will get the results from the redirect
    //         const response = await getRedirectResult(auth)
    //         if (response) {
    //             // if response is true, create user document/collection in firebase db
    //             const userDocRef = await createUserDocumentFromAuth(response.user)
    //         }
    //     }
    //     getRedirect()
    // }, [])

    const logGoogleUser = async () => {
        const {user} = await singInWithGooglePopup()
        const userDocRef = await createUserDocumentFromAuth(user);
    }

 return(
     <div>
        <h1>Sign in page</h1>
        <button onClick={logGoogleUser}>
            Sign in With Google Popup
        </button>

        <SignUpForm />
     </div>
 )   
}

export default SignIn