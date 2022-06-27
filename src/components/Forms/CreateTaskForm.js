import React, { useState } from 'react';
import axios from 'axios';

const CreateTaskForm = () => {

    const [ task, setTask ]  = useState({});

    const createTask = async () => {
        try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL+"tasks/", task, config);
            setTask(data);
            setRedirect(true);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        createTask();
    }

    return (
        <form
        className="form"
        onSubmit = {handleSubmit}
    >
        <h1 className="form-header">Create Task</h1>
            <input 
                type="text" 
                id="description" 
                name="description"
                placeholder="Description"
                onChange={ e => setTask({...task, description: e.target.value}) }
            />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default CreateTaskForm;