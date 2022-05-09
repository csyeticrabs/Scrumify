import React, { useState, useEffect, Fragment } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import GroupTaskBox from './GroupTaskBox.jsx'
import UserTaskBox from './UserTaskBox.jsx';

const MainContainer = props => {
    // Make sure you to do conditional rendering to make sure
  const [progress, setProgress] = useState(0);
  const [userTaskArray, setUserTaskArray] = useState([...props.data.users])
  const [userReady, setUserReady] = useState(false);

  const percentage = ((props.data.tasks.filter(task => task.completed === true).length / props.data.tasks.length)*100).toFixed(2);
  useEffect(() => {
    setProgress(percentage);
  })

  const copyOfUsers = [...props.data.users];
  useEffect(() => {
    console.log('USERS FROM PARENT COMPONENT', props.data.users)
    const copyOfUsers = [...userTaskArray];
    for(let i = 0; i < copyOfUsers.length; ++i) {
      const userTasks = []
      for(let j = 0; j < props.data.tasks.length; ++j) {
        if(copyOfUsers[i]._id === Number(props.data.tasks[j].worker_id)) userTasks.push(props.data.tasks[j]);
        copyOfUsers[i].totalTasks = userTasks;
        }
      }
    setUserTaskArray(copyOfUsers);
    setUserReady(true);
    console.log('STATE TOTAL TASKS IS',userTaskArray)
  }, [])

// useEffect(() => {
//     setUserReady(true);
//     console.log('NEW TASKS ARRAY FOR USER IS ', userTaskArray);
// }, [userTaskArray])



    return (
      <Fragment>
        <div>
          <h1>Progress</h1>
          <ProgressBar animated now={progress} striped variant="success" label={`${progress}% Completed`}/>
          <GroupTaskBox 
            data = {props.data}
          />
          
          {userReady && userTaskArray.map(user => {
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
