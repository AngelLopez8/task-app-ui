import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {

    const navigate = useNavigate();
    
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirm, setConfirm ] = useState("");
    const [ age, setAge ] = useState(undefined);

    const signUp = async () => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL+"users/", { name, email, password, age });
            window.localStorage.removeItem('user');
            window.localStorage.setItem(
                'user', 
                JSON.stringify({
                    Authorization: data.token,
                    user: data.user
                })
            );
            navigate('/'); 
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (password === confirm) {
            signUp();
        }
    }

    return (
        <form
            className="form"
            onSubmit = {handleSubmit}
        >
            <h1 className="form-header">Sign Up</h1>
                <input 
                    type="text" 
                    id="name" 
                    name="name"
                    placeholder="Full Name"
                    onChange={ e => setName(e.target.value) }
                />
                <input 
                    type="text" 
                    id="age" 
                    name="age"
                    placeholder="Age"
                    onChange={ e => setAge(e.target.value) }
                />
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="Email"
                    onChange={ e => setEmail(e.target.value) }
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={ e => setPassword(e.target.value) }
                />
                <input
                    type="text"
                    id="confirm"
                    name="confirm"
                    placeholder="Confirm Password"
                    onChange={ e => setConfirm(e.target.value) }
                />
                <input type="submit" value="Submit" />
                <p><b>Already have an account? </b><a href="/login">Sign In</a></p>
            </form>
    );
}

export default SignUpForm;