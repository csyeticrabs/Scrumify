import { Component } from 'react';
import React from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';

// New Page for Add and Delete Task

const TaskModifier = (props) => {
  console.log('All current users', props.data.users)
  
  return (
    <section className="mt-5">
      {/* <div class="input-group input-group-lg"> */}
        {/* <div class="input-group-prepend"> */}
        {/* </div>
            <input
              name="description"
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              onChange={props.handleSetTask}
              placeholder="Create a New Task"
            />
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => props.addTask(e)}
          >
            Add Me!
          </Button>
      </div> */}
      {/* Dropdown Section  */}
      <div class="input-group input-group-lg">
        <input 
          type="text" 
          class="form-control" 
          aria-label="Text input with dropdown button" 
          name="description"
          aria-describedby="inputGroup-sizing-lg"
          onChange={props.handleSetTask}
          placeholder="Create a New Task"
        />
        
        <Dropdown onSelect={props.handleSelect}>
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            {props.data.currentUser.name}
          </Dropdown.Toggle>

          <Dropdown.Menu >
            {props.data.users.map((user, index) => { 
               return <Dropdown.Item href={`#action/action-${index}`} eventKey={JSON.stringify(user)}>{user.name}</Dropdown.Item>
            })}
            {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown> 
        <Button
            variant="primary"
            type="submit"
            onClick={(e) => props.addTask(e)}
          >
            Add Me!
          </Button>
      </div>




      {/* <div>
        <form className="taskForm" onSubmit={(e) => props.addTask(e)}>
          <input
            name="description"
            // value={description}
            // Handler function where we grab the input field values -> updates the currentTask value in state
            onChange={props.handleSetTask}
            placeholder="Create a New Task"
          />
        </form>
      </div> */}
      <div className="allTasks">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {props.data.tasks.map((task) => 
              (
                <tr className="task">
                  <td>Description: {task.description}</td>
                  <td>
                    Status:
                    {task.completed === false ? ' In Progress' : ' Completed'}
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => props.updateTask(task._id)}
                    >
                      Mark as Complete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.deleteTask(task._id)}
                    >
                      Delete this Task
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

// Then on click that wills end that task value to the SQL DB through fetch request.
//delete task

{
  /* <input
        name='user'
        value={currentTaskWorkerId}
    > 
    </input> */
}

export default TaskModifier;
