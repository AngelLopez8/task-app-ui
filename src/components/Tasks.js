import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Task from './Task';

const Tasks = () => {

    const navigate = useNavigate();

    const [ user, setUser] = useState({});
    const [ tasks, setTasks ] = useState([]);
    const [ logout, setLogout ] = useState(false);

    useEffect( () => {
        const loggedInUser = window.localStorage.getItem('user');
        if (loggedInUser) {
            const data = JSON.parse(loggedInUser);
            setUser(data);
        } else {
            navigate('/login');
        }
    }, []);

    const getTasks = async () => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL+"tasks", {
                headers: {
                    Authorization: user.Authorization
                }
            });
            setTasks(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handle_create = async () => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL+"tasks", { description: "TESTING "}, {
                headers: {
                    Authorization: user.Authorization
                }
            });
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handle_logout = async () => {
        try {
            await axios.post(process.env.REACT_APP_API_URL+"users/logout", {}, {
                headers: {
                    Authorization: user.Authorization
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    if (user.Authorization) {
        getTasks();
    }

    if (logout) {
        window.localStorage.removeItem('user');
        handle_logout();
        navigate('/login');
    }

    return (
        <section>
            <button onClick={ e => { 
                e.preventDefault();
                setLogout(!logout);
            }}
            >Logout</button>
            <section className="tasks">
                <h1>{
                    user.user ? user.user.name : ""
                }</h1>
                <h1>Tasks</h1>
                <button onClick={() => handle_create()}>Create Task</button>
                <table>
                    <tbody>
                        <tr>
                            <th>Complete</th>
                            <th>Task</th>
                        </tr>
                        {tasks.map( task => {
                            return <Task key={task._id}
                            description={task.description}
                            completed={task.completed}
                            _id={task._id}
                            user={user}
                            setTasks={setTasks}
                            />
                        })}
                    </tbody>
                </table>
            </section>
        </section>
    );
}

export default Tasks;