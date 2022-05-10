import React, { Component, useState, useEffect, useContext, Fragment } from 'react';
import MainContainer from './components/MainContainer.jsx';
import TaskModifier from './components/TaskModifier.jsx';
import MyNav from './components/MyNav.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const TaskContext = React.createContext();

const AppHooks = () => {

  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [currentTaskDescription, setCurrentTaskDescription] = useState('');
  const [currentUser, setCurrentUser] = useState({ name: 'Select User', id: 0 });

  useEffect(() => {
    getAllInfo();
    getAllUsers();
  }, []);

  useEffect(() => {
    getAllInfo();
    getAllUsers();
  }, [users, tasks]);

  const taskContextValue = {
    getAllUsers,
    getAllInfo,
    handleSetTask,
    handleSelect,
    updateTask,
    addTask,
    deleteTask,         
  };

  function getAllUsers() {
    fetch('/users', )
    .then(res => res.json())
    .then((allUsers) => {
      setUsers(allUsers)
    })
    .catch((err) => {
      console.log(`Error fetching user data! Error: ${err}`)
    })
  };

  // Get all tasks info from database
  function getAllInfo() {
    fetch('/api', {
      method: 'GET',
    })
    .then((data) => data.json())
    .then((allTasks) => {
      setTasks(allTasks);
    })
    .catch((err) => {
      console.log(`Error fetching all task and user data! Error: ${err}`);
    });
  };


  function handleSetTask(e) {
    const { value } = e.target;
    setCurrentTaskDescription(value);
  };

  function handleSelect(e) {
    // returns a user object {_id: 1, name: "Skywalker"}
    console.log('Current user is ', JSON.parse(e));
    const { selectedUser } = JSON.parse(e);
    setCurrentUser(selectedUser); //do we have to {...selectedUser} ?
  };

  function updateTask(id) {
    fetch('/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ _id: id }),
    })
    .then((data) => data.json())
    .then(() => {
      setTasks(
        tasks.map(task => task._id === id ? {...task, completed: true} : {...task}
        // tasks.reduce((acc, curr) => {
        //   if (curr._id === id) curr.completed = true;
        //   acc.push(curr);
        //   return acc;
        // }, []),
      ));
    })
    .catch((err) => {
      console.log(`Error fetching putting task! Error: ${err}`);
    });
  };

  // Method to add a task to our board.
  function addTask(event) {
    event.preventDefault();

    const newTask = {
      description: currentTaskDescription,
      completed: false, //hardcoded default status
      worker_id: currentUser.id, //hardcoded default # "nice" - Tony
    };
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(newTask),
      })
      .then(() => {
        setTasks([newTask, ...tasks]);
      })
      .catch((err) => {
        console.log(`Error adding a new task!: ${err}`);
      });
    };
  
  //Delete task with the same ID as parameter
  function deleteTask(id) {
    fetch('/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ _id: id }),
      })
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== id));
      })
      .catch((err) => {
        console.log(`Error fetching deleting task! Error: ${err}`);
      });
    };

  return (
    <TaskContext.Provider value={taskContextValue}>
      <BrowserRouter>
        <Fragment>
          <MyNav />
          <div className="container">
            <Routes>
           
              <Route
                path="/"
                element={
                  <MainContainer users={users} tasks={tasks} currentUser={currentUser} currentTaskDescription={currentTaskDescription}/>
                }
              ></Route>

              {tasks.length > 0 && users.length > 0  && (
                <Route
                  path="/mytask"
                  element={
                    <TaskModifier users={users} tasks={tasks} currentUser={currentUser} currentTaskDescription={currentTaskDescription}/>
                  }
                ></Route>
              )}

            </Routes>
          </div>
        </Fragment>
      </BrowserRouter>
    </TaskContext.Provider>
      
  )
}
export default AppHooks;


