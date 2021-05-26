import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import axios from 'axios';

import Task from './Task';

const Tasks = () => {

    const { state: { user, config }} = useLocation();

    const [ tasks, setTasks ] = useState([]);
    const [ create, setCreate ] = useState(false);
    const [ logout, setLogout ] = useState(false);

    useEffect( () => {
        const getTasks = async () => {
            try {
                const { data } = await axios.get(process.env.REACT_APP_API_URL+"tasks/", config);
                setTasks(data);
            } catch (err) {
                console.log(err);
            }
        };
        getTasks();
    }, [tasks]);

    if (create) {
        return <Redirect to={{
            pathname: '/create',
            state: { user, config }
        }} />;
    }

    if (logout) {
        return <Redirect to="/login" />;
    }


    return (
        <section>
            <button onClick={ () => setLogout(!logout)}
            >Logout</button>
            <section className="tasks">
                <h1>{user.name}</h1>
                <h1>Tasks</h1>
                <button onClick={() => setCreate(!create)}>Create Task</button>
                <table>
                    <tr>
                        <th>Complete</th>
                        <th>Task</th>
                    </tr>
                    {tasks.map( task => {
                        return <Task key={task._id}
                        description={task.description}
                        completed={task.completed}
                        _id={task._id}
                        config={config}
                        setTasks={setTasks}/>
                    })}
                </table>
            </section>
        </section>
    );
}

export default Tasks;