import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import LoginForm from './components/Forms/LoginForm';
import SignUpForm from './components/Forms/SignUpForm';
import CreateTaskForm from './components/Forms/CreateTaskForm';
import Tasks from './components/Tasks';

import './components/styles.css';

const App = () => {

    const [ loggedIn, setLogin ] = useState(false);

    return(
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        {!loggedIn ? 
                            <Redirect to="/login"/>
                            :
                            <Tasks/>
                        }
                    </Route>
                    <Route path="/login">
                        <LoginForm setLogin={setLogin}/>
                    </Route>
                    <Route path="/signup">
                        <SignUpForm setLogin={setLogin}/>
                    </Route>
                    <Route path="/create">
                        <CreateTaskForm />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;