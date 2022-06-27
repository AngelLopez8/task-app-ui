import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    
    const navigate = useNavigate();

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect( () => {
        const loggedInUser = window.localStorage.getItem('user');
        if (loggedInUser) navigate('/');   
    }, []);

    const login = async () => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL+"users/login", { email, password });
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

    return (
        <form 
            className="form"
            onSubmit={ e => {
                e.preventDefault();
                login();
            }}>
                <h1 className="form-header">Login</h1>
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
                <input type="submit" value="Login"/>
                <p><b>Don't have an account? </b><a href="/signup">Create an account</a></p>
        </form>
    );
};

export default LoginForm;