import React,{useState} from "react"
import axios from "axios"

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
    <div>
      <input type='text'
      placeholder = 'Update Task ....'
      value={task}
      onChange = {event => setTask(event.target.value)}
      />
      <button onClick={() => updateTask()}>Update</button>
    </div>
  )
}

export default Updatetask;