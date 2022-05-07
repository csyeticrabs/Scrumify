import React, {Component, useState, useEffect} from 'react';
import MainContainer from "./components/MainContainer.jsx";
import TaskModifier from "./components/TaskModifier.jsx"
import { v4 as uuidv4 } from 'uuid';

// Class/Constructor version

// const tasks = [{
//   _id: Math.random(), //autocreated by database?
//   description: "fork ma lyfe",
//   completed: false, //a boolean
//   worker_id: Math.random(), //foreign key
// }];

const users = [{
  _id: Math.random(), //primary key
  name: 'harveysmith',
}]

class App extends Component {
  constructor(props){
    super(props);
    //should get data from all current users and tasks (as arrays of objects)
    this.state = {
        users: [],
        tasks: [],
        // currentTaskId: 0,
        currentTaskDescription: 'get this fucking app working',
        // currentTaskWorkerId: 0,
        // currentTaskStatus: false //put/patch update request status from 
    };
  this.getAllInfo = this.getAllInfo.bind(this);
  this.handleSetTask = this.handleSetTask.bind(this);
  // this.editTask = this.editTask.bind(this); 
  this.addTask = this.addTask.bind(this); 
  this.deleteTask = this.deleteTask.bind(this); 
  }

  //wrap this in useEffect?
  //get all users/tasks info on initial render from db to update state
  componentDidMount(){
    this.getAllInfo();
  }
  //get all users/task info every time a component updates? idk if this makes sense
  componentDidUpdate(){
    // this.getAllInfo();
  }

  // Method to get all information from DB about our tasks and users
  getAllInfo() {
    fetch('/api', {
      method: 'GET'
    })
    .then(data => data.json())
    .then(allTasks => {
      this.setState(
        {
          ...this.state,
          tasks: allTasks,

        })
        return;
    })
    .catch(err => {
      console.log(`Error fetching all task and user data! Error: ${err}`);
    })
  }

  handleSetTask(e) {
    return this.setState({
      ...this.state,
      currentTaskDescription: (e.target.value)
    })
  }

  // Method to edit a task inside our app.
  // editTask(id, updatedTask) { //pass in the updatedTask as an arg or create new input field like in newTask below
  //   const updatedTaskList = [...this.state.tasks];
  //   const index = taskList.findIndex(task => task._id === id)
  //   updatedTaskList[index] = updatedTask;
  //   fetch(`/api/tasks/${id}`, {
  //     method: 'PUT', 
  //     headers: {
  //       'Content-Type': 'Application/JSON'
  //     },
  //     body: JSON.stringify(updatedTaskList)
  //   })
  //   .then(data => data.json())
  //   .then(() => {
  //     this.setState(prevState => {
  //       return {
  //         ...this.state,
  //         tasks: updatedTaskList,
  //       }
  //     })
  //   })
  //   .catch(err => {
  //     console.log(`Error editing a task!: ${err}`)
  //   });
  // }

  // Method to add a task to our board. 
  addTask(event) {
    event.preventDefault();

    const newTask = {
      _id: 1232, //autocreated by database?
      description: this.state.currentTaskDescription,
      completed: false, //hardcoded default status
      worker_id: 2 //hardcoded default # "nice" - Tony
    };
    // sending the new task to the db
    // expecting to receive nothing back?
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(newTask),
    })
    .then(data => data.json())
    .then(() => {
      this.setState(prevState => {
        return {
            ...this.state, 
            tasks: prevState.tasks.push(newTask),
          }
      })
      // setTasks([...tasks, newTask])
    })
    .catch(err => {
      console.log(`Error adding a new task!: ${err}`)
    })
  }
  // Method to delete a task. 
  //we pass in the task's primary (unique key)
  deleteTask(id) {
    fetch('/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({_id: id}),
    })
    .then(data => data.json())
    .then(() => {
      this.setState(prevState => {
        return {
          ...this.state,
          tasks: prevState.tasks.filter(task => task._id !== id)
        }
      })
    })
    .catch(err => {
      console.log(`Error fetching deleting task! Error: ${err}`);
    });
  }

  //put or patch request (update the current task status from not done to completed
  // this.state.currentTaskStatus = true;

  render () {
    
    return (
      (this.state.tasks.length > 0 && <div>
      <MainContainer
        getAllInfo = {this.getAllInfo}
        // editTask = {this.editTask}
        addTask = {this.addTask}
        handleSetTask = {this.handleSetTask}
        deleteTask = {this.deleteTask}
        data = {this.state}
      />
      
      <TaskModifier
         getAllInfo = {this.getAllInfo}
        //  editTask = {this.editTask}
         addTask = {this.addTask}
         handleSetTask = {this.handleSetTask}
         deleteTask = {this.deleteTask}
         data = {this.state}
      />
      </div>)
    )
  }
}

export default App;