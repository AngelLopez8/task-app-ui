import React, { useEffect, useState, useRef } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Task = ({ description, completed, _id, user, setUpdate }) => {

    const inputRef = useRef(null);

    const [ complete, setComplete ] = useState(false);
    const [ desc, setDesc ] = useState("");

    useEffect( () => {
        setComplete(completed);
        setDesc(description);
    }, []);

    const updateTask = async (comp) => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}tasks/${_id}`, 
                { 
                    completed: comp, 
                    description: desc
                },  {
                    headers: {
                        Authorization: user.Authorization
                    }
            });
            setUpdate(true);
            inputRef.current.value = ''; // Clear Form.Control
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
            setUpdate(true);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Container>
            <Row>
                {!completed ?
                    <>
                        <Col lg={4}>
                            <Form.Control ref={inputRef} type="text" placeholder={desc} onChange={e => setDesc(e.target.value)}/>
                        </Col>
                        <Col>
                            <Button variant="outline-success" onClick={ () => { updateTask(!complete); }}>Complete</Button>
                            {" "}
                            <Button variant="outline-primary" onClick={() => { updateTask(complete) }}>Update</Button>
                            {" "}
                            <Button variant="outline-danger" onClick={deleteTask}>Delete</Button>
                        </Col>
                    </>
                    :
                    <>
                        <Col lg={4}>
                            <Form.Control type="text" placeholder={desc} disabled/>
                        </Col>
                        <Col>
                            <Button variant="outline-warning" onClick={ () => { updateTask(!complete); }}>Uncomplete</Button>
                            {" "}
                            <Button variant="outline-danger" onClick={deleteTask}>Delete</Button>    
                        </Col>
                    </>
                }
            </Row>
            <br/>
        </Container>
    );
}

export default Task;