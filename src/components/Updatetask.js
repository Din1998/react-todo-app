import React,{useState} from "react";
import axios from "axios";
import {Container,Button,Form} from 'react-bootstrap';

import './Updatetask.css'

function Updatetask(props) {
  const [task,setTask] = useState(props.task.todo)
  const updateTask = () => {
    if(task.trim() === '' || props.task.todo === task) {
      return
    } else {
      axios.put(`http://localhost:4000/api/tasks/${props.task._id}`,{
        _id: props.task._id,
        todo: task,
        isComlete: props.task.isComlete
      })
      .then(res => {
        props.removePopup()
        props.updateTask(res.data)
      }).catch(err => console.log(err))
    }
  }

  return (
    <div className="popup">
      <div className="popup-content">
      <Container>
        <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Update You Todo</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Add Your Todo..." 
              value={task}
              onChange = {event => setTask(event.target.value)}
              />
              </Form.Group>
        <Button variant="primary" type="submit" onClick={() => updateTask()}>Update</Button>
      </Container>
      </div>
    </div>
  )
}

export default Updatetask;