import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CreateTaskForm = ({ setUpdate, user }) => {

    const [ task, setTask ]  = useState("");

    const createTask = async () => {
        try {
            await axios.post(process.env.REACT_APP_API_URL+"tasks", task, {
                headers: {
                    Authorization: user.Authorization
                }
            });
            setTask("");
            setUpdate(true);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        e.target.reset();
        createTask();
    }

    return (
        <Container className='d-flex align-items-center justify-content-center'>
            <Container className='bg-light text-dark'>
                <h1 className='text-center'>Create Task</h1>
                <Form className='text-center' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Control type="text" placeholder="Enter Description" onChange={ e => setTask({...task, description: e.target.value}) }/>
                    </Form.Group>
                    <Button variant="outline-primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </Container>
    
    );
}

export default CreateTaskForm;