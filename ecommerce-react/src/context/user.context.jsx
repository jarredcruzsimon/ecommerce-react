import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.utils.js'

// as the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

// provider allows all child components access to the useState
export const UserProvider =({ children }) =>{
    const [currentUser, setCurrentUser] = useState(null)
    const value = { currentUser, setCurrentUser }
    
    useEffect(()=>{
        // calling onAuthChangedListener within useEffect
        // to hendle the call when mounting and unmounting
        const unsubscribe = onAuthStateChangedListener((user)=>{
            if (user){
                createUserDocumentFromAuth(user);
            }

            // user will be auth obj or null value
            setCurrentUser(user)
        })

        return unsubscribe
    },[])

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}

