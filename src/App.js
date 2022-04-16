import React, {useState,useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Todolist from './components/Todolist';
import Addtask from './components/Addtask';
import Updatetask from './components/Updatetask';
import './App.css';


function App() {

  const [todolist,setTodolist] = useState([])
  const [taskToUpdate, setTaskToUpdate] = useState ({})
  const [showPopup,setShowPopup] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:4000/api/tasks')
    .then(res => {
      setTodolist(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  const addTask = newTask => {
    setTodolist([...todolist,newTask])
  }

  const Taskcomplete = task => {
    const newList = [...todolist]
    newList.forEach(item => {
      if(item._id === task._id){
        item.isComplete = task.isComplete
      }
    })
    setTodolist(newList)
  }

  const removeTask = task => {
    const newList = todolist.filter(item => !(item._id === task._id))
    setTodolist(newList)
  }

  const updateTask = task => {
    const newList = [...todolist]
    newList.forEach(item => {
      if(item._id === task._id){
        item.todo = task.todo
      }
    })
    setTodolist(newList)
  }

  return (
    <div className="App">
      <Addtask addTask = {addTask} />
      <Todolist
      todolist = {todolist}
      updateTodolist = {Taskcomplete}
      removeTask = {removeTask}
      taskToUpdate = {task => setTaskToUpdate(task)}
      showPopup = {() => setShowPopup(!showPopup)}
       />
       {showPopup && <Updatetask
        task ={taskToUpdate}
        updateTask = {updateTask}
        removePopup = {() => setShowPopup(!showPopup)}
        />}
        
    </div>
  );
}

export default App;
