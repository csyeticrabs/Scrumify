import React, { Component, useState, useEffect, Fragment } from 'react';
import MainContainer from './components/MainContainer.jsx';
import TaskModifier from './components/TaskModifier.jsx';
import MyNav from './components/MyNav.jsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Class/Constructor version
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      tasks: [],
      currentTask: { id: undefined, description: 'Select Task' },
      currentUser: {name: 'Select User', id: undefined},
      userReady: false,
      
    };
    this.getAllInfo = this.getAllInfo.bind(this);
    this.handleSetTask = this.handleSetTask.bind(this);
    this.handleSelectUser = this.handleSelectUser.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserTasks = this.getUserTasks.bind(this);
    this.handleSelectTask = this.handleSelectTask.bind(this);
    this.handleAssignTask = this.handleAssignTask.bind(this);
  }

  componentDidMount() {
    this.getAllInfo();
    this.getAllUsers();
  }

  getUserTasks() {
    const copyOfUsers = [...this.state.users]; 
    for(let i = 0; i < copyOfUsers.length; ++i) {
      const userTasks = [];
      for(let j = 0; j < this.state.tasks.length; ++j) {
        if(copyOfUsers[i]._id === Number(this.state.tasks[j].worker_id)) userTasks.push(this.state.tasks[j]);
        copyOfUsers[i].totalTasks = userTasks;
        }
      }
    this.setState(prevState => {
      return {
        ...prevState,
        users: copyOfUsers,
        userReady: true,
      }
    })
  }
  
  getAllUsers() {
    fetch('/users', )
    .then(res => res.json())
    .then((allUsers) => {
      this.setState(prevState => {
        return {
          ...prevState,
          users: allUsers,
      }})
    })
    .then(() => {
      this.getUserTasks();
    })
    .catch((err) => {
      console.log(`Error fetching user data! Error: ${err}`)
    })
  }

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
      })
      .catch((err) => {
        console.log(`Error fetching all task and user data! Error: ${err}`);
      });
  }


  handleSetTask(e) {
    return this.setState({
      ...this.state,
      currentTask: {description: e.target.value},
    });
  }

  handleSelectUser(e) {
    return this.setState({
      ...this.state,
      currentUser: JSON.parse(e),
    });
  }

  handleSelectTask(e){
    return this.setState({
      ...this.state,
      currentTask: JSON.parse(e),
    })
  }

  handleAssignTask() {
    fetch('/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify({ task_id: this.state.currentTask._id, worker_id: this.state.currentUser._id })
    })
    .then(() => {
      const updatedUsers = this.state.users.map(user => {
        return user._id === this.state.currentUser._id ? {...user, totalTasks: [...user.totalTasks, this.state.currentTask]} : {...user}
      })
      this.setState(prevState => {
        return {
        ...prevState,
        users: updatedUsers,
        currentTask:{ id: undefined, description: 'Select Task' },
        currentUser: {name: 'Select User', id: undefined},
        }
      })      
    })
    .catch((err) => {
      console.log('Failed to assign task to user')
    })
  }

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
        this.setState((prevState) => {
          return {
            ...prevState,
            tasks: prevState.tasks.map(task => task._id === id ? {...task, completed: true} : {...task}
            )
            // tasks: prevState.tasks.reduce((acc, curr) => {
            //   if (curr._id === id) curr.completed = true;
            //   acc.push(curr);
            //   return acc;
            // }, []),
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
      description: this.state.currentTask.description,
      completed: false, //hardcoded default status
      worker_id: this.state.currentUser._id || undefined,
    };
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(newTask),
    })
      .then(() => {
        this.setState((prevState) => {
          return {
            ...prevState,
            tasks: [newTask, ...prevState.tasks],
          };
        });
      })
      .catch((err) => {
        console.log(`Error adding a new task!: ${err}`);
      });
  }
  
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

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <MyNav/>
          <div className="container mt-5">
            <Routes>
           {this.state.userReady && (
              <Route
                path="/"
                element={
                  <MainContainer className='mt-5'
                    getAllInfo={this.getAllInfo}
                    handleSetTask={this.handleSetTask}
                    handleSelectUser={this.handleSelectUser}
                    handleSelectTask={this.handleSelectTask}
                    handleAssignTask={this.handleAssignTask}
                    data={this.state}
                    users={this.getAllUsers}
                  />
                }
              ></Route>
              )}
              {this.state.userReady && (
                <Route
                  path="/mytask"
                  element={
                    <TaskModifier
                      getAllInfo={this.getAllInfo}
                      addTask={this.addTask}
                      handleSetTask={this.handleSetTask}
                      deleteTask={this.deleteTask}
                      data={this.state}
                      updateTask={this.updateTask}
                      handleSelectUser={this.handleSelectUser}

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
