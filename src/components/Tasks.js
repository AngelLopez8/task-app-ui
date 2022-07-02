import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import Task from './Task';
import CreateTaskForm from './Forms/CreateTaskForm';

import DEFAULT from './Images/DEFAULT.jpg';

const Tasks = () => {

    const navigate = useNavigate();

    const [ user, setUser] = useState({});
    const [ avatar, setAvatar ] = useState("");
    const [ tasks, setTasks ] = useState([]);
    const [ update, setUpdate ] = useState(false);
    const [ completeTasks, setCompleteTasks] = useState([]);
    const [ incompleteTasks, setIncompleteTasks] = useState([]);
    const [ logout, setLogout ] = useState(false);
    const [ deleteUser, setDeleteUser ] = useState(false);

    useEffect( () => {
        const loggedInUser = window.localStorage.getItem('user');
        if (loggedInUser) {
            const data = JSON.parse(loggedInUser);
            setUser(data);
            setUpdate(true);
        } else {
            navigate('/login', { replace: true});
        }
    }, []);

    useEffect( () => {
        if (logout) {
            window.localStorage.removeItem('user');
            handle_logout();
            navigate('/login', { replace: true});
        }
    }, [logout]);

    useEffect( () => {
        if (deleteUser) {
            window.localStorage.removeItem('user');
            handle_delete_user();
            navigate('/login', { replace: true});
        }
    }, [deleteUser]);

    const getTasks = async () => {
        try {
            const { data } = await axios.get(process.env.REACT_APP_API_URL+"tasks", {
                headers: {
                    Authorization: user.Authorization
                }
            });
            setTasks(data);
            setUpdate(false);
            let tempComplete = [];
            let tempIncomplete = [];
            tasks.forEach( task => {
                task.completed === true ?
                    tempComplete = [...tempComplete, task]
                :
                tempIncomplete = [...tempIncomplete, task]
            });

            setCompleteTasks(tempComplete);
            setIncompleteTasks(tempIncomplete);
            
        } catch (err) {
            console.log(err);
        }
    };

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

    const handleAvatar = async () => {
        try {
            await axios.get(process.env.REACT_APP_API_URL+`users/me/avatar/${user.user._id}`);
            setAvatar(process.env.REACT_APP_API_URL+`users/me/avatar/${user.user._id}`);
        } catch (err) {
            setAvatar(DEFAULT);
        }
    }

    const handle_delete_user = async () => {
        try {
            await axios.delete(process.env.REACT_APP_API_URL+'users/me', {
                headers: {
                    Authorization: user.Authorization
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    if (user.Authorization) {
        if (update) getTasks();
        if (avatar === "") handleAvatar();
    }

    return (
        <Container style={{ height: '100vh' }} className='d-flex align-items-center justify-content-center'>
            <Row style={{ width: '100vh' }} className='shadow-lg d-flex align-items-center justify-content-center'>
                <Col>
                    <br/>
                    <Row className='d-flex align-items-center justify-content-center'>
                        <Col lg={5}>
                            <Card className="text-center bg-light text-dark">
                                <Card.Img variant="top" src={avatar} />
                                <Card.Body>
                                    <Card.Title>{ user.user ? user.user.name : "Full Name" }</Card.Title>
                                    <Button 
                                        variant="outline-warning"
                                        onClick={ e => {
                                            e.preventDefault();
                                            setLogout(!logout);
                                        }}
                                    >Logout</Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={ e => {
                                            e.preventDefault();
                                            setDeleteUser(!deleteUser);
                                        }}
                                    >Delete User</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <br/>
                    <Row className='d-flex align-items-center justify-content-center'>
                        <Col lg={8}>
                            <CreateTaskForm setUpdate={setUpdate} user={user}/>
                        </Col>
                    </Row>
                    <br/>
                </Col>

                <Col>
                    <Row>
                        <Col><h2>Incomplete Tasks</h2></Col>
                    </Row>

                    <Row>
                        <Col className="text-center">
                            { incompleteTasks.length === 0 ?
                                <h5>No current Incomplete Tasks</h5>
                                :
                                <>
                                    {incompleteTasks.map( (task, index) => {
                                        if (!task.completed)
                                            return <Task key={task._id}
                                            description={task.description}
                                            completed={task.completed}
                                            _id={task._id}
                                            user={user}
                                            setUpdate={setUpdate}
                                            />
                                        return <div key={index}>{""}</div>
                                    })}
                                </>
                            }
                        </Col>
                    </Row>
                        
                    <Row>
                        <Col><h2>Complete Tasks</h2></Col>
                    </Row>

                    <Row>
                        <Col className="text-center">
                            { completeTasks.length === 0 ?
                                <h5>No current Completed Tasks</h5>
                                :
                                <>
                                {completeTasks.map( (task, index) => {
                                    if (task.completed)
                                        return <Task key={task._id}
                                        description={task.description}
                                        completed={task.completed}
                                        _id={task._id}
                                        user={user}
                                        setUpdate={setUpdate}
                                        />
                                    return <div key={index}>{""}</div>
                                })}
                                </>
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Tasks;