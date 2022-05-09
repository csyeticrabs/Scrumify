import React, { Fragment } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

const DropDown = (props) => {
  const unassignedTasks = props.data.tasks.filter(task => task.worker_id === null)
  return (
    <Fragment >
        <Dropdown onSelect={props.handleSelectTask} className='me-3'>
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            {props.data.currentTask.description}
          </Dropdown.Toggle>

          <Dropdown.Menu >
            {unassignedTasks.map((task, index) => { 
               return <Dropdown.Item href={`#action/action-${index}`} eventKey={JSON.stringify(task)}>{task.description}</Dropdown.Item>
            })}
          </Dropdown.Menu>
        </Dropdown> 

        <Dropdown onSelect={props.handleSelectUser} className='me-3'>
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            {props.data.currentUser.name}
          </Dropdown.Toggle>

          <Dropdown.Menu >
            {props.data.users.map((user, index) => { 
               return <Dropdown.Item href={`#action/action-${index}`} eventKey={JSON.stringify(user)}>{user.name}</Dropdown.Item>
            })}
          </Dropdown.Menu>
        </Dropdown> 
        <button className='btn btn-primary' onClick={() => props.handleAssignTask()}>Assign</button>
    </Fragment>
  )
}

export default DropDown;