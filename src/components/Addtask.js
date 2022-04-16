import React, {useState} from "react";
import axios from "axios";
import {Container,Row,Col,Form,Button} from 'react-bootstrap';

function Addtask (props) {
  const [task,Settask] = useState("")
    const addtask = () => {
        if(task.trim() === ''){
            return 
        } else {
            axios.post('http://localhost:4000/api/tasks' , {
                todo : task,
                isComplete : false
            }).then(res => {
                Settask("")
                props.addTask(res.data)
            }).catch(err => console.log(err))
        }
    }
    return (
        <div className = 'addtask'>
            <Container fluid>
            <Row className="justify-content-md-center">
            <Col md="auto">
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Write Your Todo</Form.Label>
            <Form.Control type="text" placeholder="Add Your Todo..." value = {task} onChange = {event => Settask(event.target.value)} />
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick = {() => addtask()}>
                Submit
            </Button>
            </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Addtask;