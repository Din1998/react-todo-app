import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Card,Button} from 'react-bootstrap'
import  './Todolist.css';





function Todolist(props) {
  const todolist = props.todolist.map((task,index) => {
        const taskComplete = task => {
          axios.put(`http://localhost:4000/api/tasks/${task._id}`,{
            _id: task._id,
            todo: task.todo,
            isComplete: !task.isComplete
          }).then(res => props.Taskcomplete(res.data))
          .catch(err => console.log(err))
        }

        const removeTask = id => {
          axios.delete(`http://localhost:4000/api/tasks/${id}`)
          .then(res => props.removeTask(res.data))
          .catch(err => console.log(err))
        }

    return ( 
            <li key={index} className='list-ui'>
              <div>
              <Card style={{ width: '18rem' }}  className="text-center">
                <Card.Body>
                  <Card.Title>Todo List...</Card.Title>
                      <Card.Text
                      className={task.isComplete ? 'taskcomplete' : ''}
                      onClick = {() => {
                      taskComplete(task)}}
                      >
                      {task.todo}
                      </Card.Text>
                      <Card.Body>
                        <Button variant="primary"
                          onClick = {() => {
                            props.taskToUpdate(task)
                            props.showPopup()
                          }}
                        ><FontAwesomeIcon icon={faPenToSquare}className='edit-icon'/>Edit</Button>
                      
                        <Button variant="primary"
                          onClick={() => {
                            removeTask(task._id)
                          }}
                        ><FontAwesomeIcon icon={faTrashCan}className='delete-icon'/>Delete</Button>
                    </Card.Body>
                  </Card.Body>
              </Card>
              </div>
            </li>
      
    )
  })
  return (
    <div className='tasklist'>
      <ul>
        {todolist}
      </ul>
    </div>
  )
}

export default Todolist;