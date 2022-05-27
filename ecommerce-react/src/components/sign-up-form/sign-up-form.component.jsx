import { useState } from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss'

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
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>

            {/*form tags create form within html*/}
            <form onSubmit={handleSubmit}>
                {/* name - will come through the event into the handleChange function for each onChange 
                    value - comes from destructured formfields. This is to see the value from state in the form filed as it updates
                */}
                <FormInput label="Display Name" type='text' required onChange={handleChange} name="displayName" value={displayName}/>
                <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password}/>
                <FormInput label="Confirm Password" type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm