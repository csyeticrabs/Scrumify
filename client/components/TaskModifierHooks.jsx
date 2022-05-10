import React, { Component } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { TaskContext } from '../App.jsx'

// New Page for Add and Delete Task

const TaskModifierHooks = ({ users, tasks, currentUser, currentTaskDescription }) => {
  const {
    // getAllUsers,
    getAllInfo,
    handleSetTask,
    handleSelect,
    updateTask,
    addTask,
    deleteTask,
  } = useContext(TaskContext);
  
  return (
    <section className="mt-5">
      {/* Dropdown Section  */}
      <div class="input-group input-group-lg">
        <input 
          type="text" 
          class="form-control" 
          aria-label="Text input with dropdown button" 
          name="description"
          aria-describedby="inputGroup-sizing-lg"
          onChange={handleSetTask}
          placeholder="Create a New Task"
        />
        
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="warning" id="dropdown-basic">
            {currentUser.name}
          </Dropdown.Toggle>

          <Dropdown.Menu >
            {users.map((user, index) => { 
               return <Dropdown.Item href={`#action/action-${index}`} eventKey={JSON.stringify(user)}>{user.name}</Dropdown.Item>
            })}
          </Dropdown.Menu>
        </Dropdown> 
        <Button
            variant="primary"
            type="submit"
            onClick={(e) => addTask(e)}
          >
            Add Me!
          </Button>
      </div>


      <div className="allTasks">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => 
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
                      onClick={() => updateTask(task._id)}
                    >
                      Mark as Complete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteTask(task._id)}
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

export default TaskModifierHooks;
