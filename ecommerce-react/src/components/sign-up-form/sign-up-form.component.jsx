import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () =>{

    // set state with default value of defaultFormFields
    const [formFields, setFormFields] = useState(defaultFormFields);
    
    // destructuring of formFileds
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormFields =()=>{
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        // of passwords do not match, exit
       if(password !== confirmPassword){
           alert('passwords do not match')
           return;
       }

       try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            // passing object of displayName
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields()
        }
        catch(error){
           if(error.code === 'auth/email-already-in-use'){
               alert('Cannot create user, email already in use')
           } else {
                console.log('user creation encountered an error', error)
           }
        }
    }

    const handleChange = (event) => {
        // destructuring of event
        const {name, value} = event.target
        // {...formFields} - this is a spread operator
        // {...formFields, [name]: value} - this allows the update of a single item within the object while 
        // keeping the other values the same
        setFormFields({...formFields, [name]: value})
    }

    return(
        <div>
            <h1>Sign up with your email and password</h1>

            {/*form tags create form within html*/}
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                {/* name - will come through the event into the handleChange function for each onChange 
                    value - comes from destructured formfields. This is to see the value from state in the form filed as it updates
                */}
                <input type='text' required onChange={handleChange} name="displayName" value={displayName}/>

                <label>Email</label>
                <input type='email' required onChange={handleChange} name="email" value={email}/>

                <label>Password</label>
                <input type='password' required onChange={handleChange} name="password" value={password}/>

                <label>Confirm Password</label>
                <input type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm