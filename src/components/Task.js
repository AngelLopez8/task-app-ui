import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Task = ({ description, completed, _id, user, setTasks }) => {

    const [ check, setCheck ] = useState(!completed);
    const [ desc, setDesc ] = useState(description);

    useEffect( () => {
        handleCheckBox();
    }, []);

    const updateTask = async () => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}tasks/${_id}`, 
                { completed: check, description: desc},  {
                headers: {
                    Authorization: user.Authorization
                }
            });
            setTasks([]);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteTask = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}tasks/${_id}`, {
                headers: {
                    Authorization: user.Authorization
                }
            });
            setTasks([]);
        } catch (err) {
            console.log(err);
        }
    }

    const handleCheckBox = () => {
        document.getElementById(`${description}Box`).checked  = !check;
        setCheck(!check);
    }

    return (
        <tr>
            <td><input type="checkbox" id={`${description}Box`} onClick={handleCheckBox} /></td>
            <td><input type="text" value={desc} onChange={e => setDesc(e.target.value)} /></td>
            <td><button onClick={updateTask}>Update</button></td>
            <td><button onClick={deleteTask}>Delete</button></td>
        </tr>
    );
}

export default Task;