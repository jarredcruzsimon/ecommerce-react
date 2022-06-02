// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';

// import {
    // auth,
    // signInWithGoogleRedirect
// } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss'

const Authentication =()=>{
    
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

 return(
     <div className='authentication-container'>
        <SignInForm />
        <SignUpForm />
     </div>
 )   
}

export default Authentication