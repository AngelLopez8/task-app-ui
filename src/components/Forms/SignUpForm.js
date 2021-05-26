import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const SignUpForm = ({ setLogin }) => {
    
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirm, setConfirm ] = useState("");
    const [ age, setAge ] = useState(undefined);
    const [ user, setUser ] = useState({});
    const [ auth, setAuth ] = useState("");
    const [ redirect, setRedirect ] = useState(false);

    const signUp = async () => {
        try {
            const { data } = await axios.post(process.env.URL+"users/", { name, email, password, age });
            setUser(data.user);
            setAuth(process.env.SECRET + " " + data.token);
            setLogin(true);
            setRedirect(!redirect);
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

    if (redirect) {
        return <Redirect to={{
            pathname: "/",
            state: { user, config: {'headers': { 'Authorization': auth }} }
        }} />;
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