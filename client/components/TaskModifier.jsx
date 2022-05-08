import { Component } from 'react';
import React from 'react';
import { Form, Button } from 'react-bootstrap';

// New Page for Add and Delete Task

const TaskModifier = (props) => {
  return (
    <section className="mt-5">
      <div class="input-group input-group-lg">
        <div class="input-group-prepend">
          {/* <span class="input-group-text" id="inputGroup-sizing-lg">
            Create New Task
          </span> */}
        </div>
        <Form>
          <Form.Group className="mb-3">
            <input
              name="description"
              type="text"
              class="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              onChange={props.handleSetTask}
              placeholder="Create a New Task"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => props.addTask(e)}
          >
            Add Me!
          </Button>
        </Form>
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
            {props.data.tasks.map((task) => {
              return (
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
              );
            })}
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
