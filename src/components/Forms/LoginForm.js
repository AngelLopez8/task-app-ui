import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ setLogin }) => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ redirect , setRedirect ] = useState(false);
    const [ user, setUser ] = useState({});
    const [ auth, setAuth ] = useState("");

    const login = async () => {
        try {
            console.log(process.env.REACT_APP_API_URL)
            const { data } = await axios.post(process.env.REACT_APP_API_URL+"users/login", { email, password });
            setUser(data.user);
            setAuth(process.env.REACT_APP_API_SECRET + " " + data.token)
            setLogin(true);
            setRedirect(true);
        } catch (err) {
            console.log(err);
        }
    }

    if (redirect) {
        return <Redirect to={{
            pathname: '/',
            state: { user, config: {'headers':{ 'Authorization': auth }} }
        }}/>;
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