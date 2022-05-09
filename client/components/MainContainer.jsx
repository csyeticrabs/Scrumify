import React, { useState, useEffect, Fragment } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import GroupTaskBox from './GroupTaskBox.jsx'
import UserTaskBox from './UserTaskBox.jsx';
import DropDown from './DropDown.jsx'

const MainContainer = props => {
    // Make sure you to do conditional rendering to make sure
  const [progress, setProgress] = useState(0);
  // const [userTaskArray, setUserTaskArray] = useState([...props.data.users])
  // const [userReady, setUserReady] = useState(false);

  const percentage = ((props.data.tasks.filter(task => task.completed === true).length / props.data.tasks.length)*100).toFixed(2);
  useEffect(() => {
    setProgress(percentage);
  })

    return (
      <Fragment>

          <h1>Tasks in Progress</h1>
          <ProgressBar animated now={progress} striped variant="success" label={`${progress}% Completed`}/>
          <DropDown
            data = {props.data}
            handleSelectUser={props.handleSelectUser}
            handleSelectTask={props.handleSelectTask}
            handleAssignTask={props.handleAssignTask}
          />
          <GroupTaskBox
            data = {props.data}
          />
          <div className='row'>
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
