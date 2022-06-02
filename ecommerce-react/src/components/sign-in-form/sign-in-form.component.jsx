import { useState } from 'react'
import { 
    createUserDocumentFromAuth,
    singInWithGooglePopup,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss'


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () =>{

    // set state with default value of defaultFormFields
    const [formFields, setFormFields] = useState(defaultFormFields);
    
    // destructuring of formFileds
    const { email, password } = formFields

    const resetFormFields =()=>{
        setFormFields(defaultFormFields)
    }

    const  signInWithGoogle = async () => {
        await singInWithGooglePopup()
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
       try{
            await signInAuthUserWithEmailAndPassword(email, password)
            resetFormFields()
        } catch(error){
            switch(error.code){
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect Password');
                    break;
                default:
                    console.log(error)
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
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

            {/*form tags create form within html*/}
            <form onSubmit={handleSubmit}>
                {/* name - will come through the event into the handleChange function for each onChange 
                    value - comes from destructured formfields. This is to see the value from state in the form filed as it updates
                */}
                <FormInput label="Email" type='email' required onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password}/>
                
                <div className='buttons-container'>
                    {/* Sign in with username and password */}
                    <Button type="submit">Sign In</Button>

                    {/* Sign in with Google 
                        by default, button is type submit
                        change type to button so the submit 
                        function does not run
                    */}
                    <Button buttonType='google' type='button' onClick={signInWithGoogle}>Google Sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm