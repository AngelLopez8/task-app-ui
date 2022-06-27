import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/Forms/LoginForm';
import SignUpForm from './components/Forms/SignUpForm';
// import CreateTaskForm from './components/Forms/CreateTaskForm';
import Tasks from './components/Tasks';

import './components/styles.css';

const App = () => {

    return(
        <div>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Tasks/>} />
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/signup" element={<SignUpForm/> }/>
                    {/* <Route path="/create">
                        <CreateTaskForm />
                    </Route> */}
                </Routes>
            </Router>
        </div>
    );
};

export default App;