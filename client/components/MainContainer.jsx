import React, { useState, useEffect, Fragment } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import GroupTaskBox from './GroupTaskBox.jsx'
import UserTaskBox from './UserTaskBox.jsx';
import DropDown from './DropDown.jsx'
import { Link } from 'react-router-dom';


const MainContainer = props => {
    // Make sure you to do conditional rendering to make sure
  const [progress, setProgress] = useState(0);

  const percentage = ((props.data.tasks.filter(task => task.completed === true).length / props.data.tasks.length)*100).toFixed(2);
  useEffect(() => {
    setProgress(percentage);
  })

    return (
      <Fragment>
          <div class="jumbotron">
            <h1 class="display-4">Yeti Crabs Scrumify</h1>
            <p class="lead">Welcome to your team's custom SCRUM page!</p>
            <hr class="my-4"/>
            <p>This page displays all tasks currently in progress and their assigned users.</p>
            <p>Navigate to 'My Tasks' to mark tasks as complete or delete.</p>
            <p class="lead">
            <Link to="/mytask" className="btn btn-primary"> My Tasks </Link>
            </p>
            
          </div>

          <ProgressBar animated now={progress} striped variant="success" label={`${progress}% Completed`} className='mb-5 mt-5'/>
          
          <div className='d-flex mb-5'>
          <DropDown 
            data = {props.data} 
            handleSelectUser={props.handleSelectUser}
            handleSelectTask={props.handleSelectTask}
            handleAssignTask={props.handleAssignTask}
          />
          </div>
          <h2>Current Tasks in Progress</h2>
          <GroupTaskBox className='mb-4'
            data = {props.data}
          />
          <div className='row mt-5 mb-5 justify-content-center' >
          {props.data.users.map(user => {
            return <UserTaskBox
            name = {user.name}
            totalTasks = {user.totalTasks}
            />
          })}
        </div>
          
      </Fragment>
    );
  };

export default MainContainer;
