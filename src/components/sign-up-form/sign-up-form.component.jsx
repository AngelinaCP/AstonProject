import {useState} from 'react'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import './sign-up-form.styles.scss'

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
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display name</label>
                <input type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <label>Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email}/>

                <label>Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password}/>

                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <button type="submit"></button>
            </form>
        </div>
    )
}

export default SignUpForm;
