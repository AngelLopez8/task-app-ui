import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginForm from './components/Forms/LoginForm';
import SignUpForm from './components/Forms/SignUpForm';
import Tasks from './components/Tasks';

const App = () => {

    return(
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Tasks/>} />
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/signup" element={<SignUpForm/> }/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;