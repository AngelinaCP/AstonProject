import {useState} from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import './sign-up-form.styles.scss'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

const defaultFormFields = {
    displayName: '', 
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        //password matches
        if (password !== confirmPassword) {
            alert('passwords do not match!');
            return ;
        }
        try {
            //if we authenticated the user with email and password
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            //create user's doc
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch(err) {
            if (err.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use')
            }
            console.error(err);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Display name"
                    type="text" required 
                    onChange={handleChange} 
                    name="displayName" 
                    value={displayName} />

                <FormInput 
                    label="Email"
                    type="email" required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}/>

                <FormInput 
                    label="Password"
                    type="password" required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}/>

                <FormInput
                    label="Confirm password"
                    value="Confirm Password"
                    type="password" required 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    value={confirmPassword}/>

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
