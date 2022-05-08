import React, { Component, useState, useEffect, Fragment } from 'react';
import MainContainer from './components/MainContainer.jsx';
import TaskModifier from './components/TaskModifier.jsx';
import MyNav from './components/MyNav.jsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
// Class/Constructor version

// const tasks = [{
//   _id: Math.random(), //autocreated by database?
//   description: "fork ma lyfe",
//   completed: false, //a boolean
//   worker_id: Math.random(), //foreign key
// }];

class App extends Component {
  constructor(props) {
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
    this.updateTask = this.updateTask.bind(this);
  }

  //wrap this in useEffect?
  //get all users/tasks info on initial render from db to update state
  componentDidMount() {
    this.getAllInfo();
  }
  //get all users/task info every time a component updates? idk if this makes sense
  componentDidUpdate() {
    // this.getAllInfo();
  }

  // Method to get all information from DB about our tasks and users
  getAllInfo() {
    fetch('/api', {
      method: 'GET',
    })
      .then((data) => data.json())
      .then((allTasks) => {
        this.setState({
          ...this.state,
          tasks: allTasks,
        });
        return;
      })
      .catch((err) => {
        console.log(`Error fetching all task and user data! Error: ${err}`);
      });
  }

  handleSetTask(e) {
    return this.setState({
      ...this.state,
      currentTaskDescription: e.target.value,
    });
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

  updateTask(id) {
    fetch('/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ _id: id }),
    })
      .then((data) => data.json())
      .then(() => {
        // this.setState((prevState) => {
        //   return {
        //     ...prevState,
        //     // tasks: (prevState.tasks.filter(
        //     //   (task) => task._id === id
        //     // ).completed = true),
        //   };
        // });
        this.setState((prevState) => {
          return {
            ...prevState,
            // tasks: prevState.tasks.map(task => {
            //   return task._id === id ? {...task, task.completed: true} : {...task}
            // })
            tasks: prevState.tasks.reduce((acc, curr) => {
              if (curr._id === id) curr.completed = true;
              acc.push(curr);
              return acc;
            }, []),
          };
        });
      })
      .catch((err) => {
        console.log(`Error fetching putting task! Error: ${err}`);
      });
  }

  // Method to add a task to our board.
  addTask(event) {
    event.preventDefault();

    const newTask = {
      _id: Math.floor(Math.random() * 200), //autocreated by database?
      description: this.state.currentTaskDescription,
      completed: false, //hardcoded default status
      worker_id: 2, //hardcoded default # "nice" - Tony
    };
    // sending the new task to the db
    // expecting to receive nothing back?
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(newTask),
    })
      .then(() => {
        // if you use a callback inside setState the parameter or whatever you name it will always be the previousState.
        this.setState((prevState) => {
          return {
            ...prevState,
            // ... Operator explanation:
            // users: [],
            // tasks: [],
            // currentTaskDescription: 'get this fucking app working',
            tasks: [newTask, ...prevState.tasks],
          };
        });
      })
      // .then(() => {
      //   this.setState({
      //     ...this.state,
      //     tasks: this.state.tasks.push(newTask),
      //   });
      // })

      .catch((err) => {
        console.log(`Error adding a new task!: ${err}`);
      });
    // window.location = '/mytask';
  }
  // Method to delete a task.
  //we pass in the task's primary (unique key)
  deleteTask(id) {
    fetch('/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ _id: id }),
    })
      .then(() => {
        this.setState((prevState) => {
          return {
            ...this.state,
            tasks: prevState.tasks.filter((task) => task._id !== id),
          };
        });
      })
      .catch((err) => {
        console.log(`Error fetching deleting task! Error: ${err}`);
      });
  }

  //put or patch request (update the current task status from not done to completed
  // this.state.currentTaskStatus = true;

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <MyNav />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <MainContainer
                    getAllInfo={this.getAllInfo}
                    // editTask = {this.editTask}
                    addTask={this.addTask}
                    handleSetTask={this.handleSetTask}
                    deleteTask={this.deleteTask}
                    data={this.state}
                  />
                }
              ></Route>

              {this.state.tasks.length > 0 && (
                <Route
                  path="/mytask"
                  element={
                    <TaskModifier
                      getAllInfo={this.getAllInfo}
                      //  editTask = {this.editTask}
                      addTask={this.addTask}
                      handleSetTask={this.handleSetTask}
                      deleteTask={this.deleteTask}
                      data={this.state}
                      updateTask={this.updateTask}
                    />
                  }
                ></Route>
              )}
            </Routes>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
