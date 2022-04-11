import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck,faPenToSquare,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';




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

    return <li key={index}>
            <div>
            <FontAwesomeIcon icon={faCheck} className={task.isComplete ? 'iscomplete' : 'checkicon'} />
            <p className={task.isComplete ? 'taskcomplete' : ''}
             onClick = {() => {
              taskComplete(task)}}
            >{task.todo}</p>
            </div>
            <div>
            <FontAwesomeIcon icon={faPenToSquare}
              onClick = {() => {
                props.taskToUpdate(task)
                props.showPopup()
              }}
             />
            <FontAwesomeIcon icon={faTrashCan}
            onClick={() => {
              removeTask(task._id)
            }}
             />
            </div>
    </li>
  })
  return (
    <div>
      <ul>
        {todolist}
      </ul>
    </div>
  )
}

export default Todolist;