import { Component } from "react";
import React from 'react';

// New Page for Add and Delete Task

const TaskModifier = props => {

return (
    <section>
        <div>
            <form className="taskForm" onSubmit={() => {addTask}}>
                <input 
                    name="description"
                    // value={description}
                    // Handler function where we grabv the input field values -> updates the currentTask value in state 
                    onChange={props.handleSetTask} 
                    placeholder='Create a New Task'
                /> 
            </form>
        </div>
        <div className="allTasks">
            {props.data.tasks.map((task) => {
                <div className="task">
                    <p>User: {task.workerId}</p>
                    <p>Description: {task.description}</p>
                    <p>Status: {task.status}</p>
                    <button className="deleteTaskButton" onClick={() => props.deleteTask(task.id)}>Delete this Task</button>
                </div>
            })}
        </div>
    </section>
    )
}

 // Then on click that wills end that task value to the SQL DB through fetch request. 
    //delete task

    {/* <input
        name='user'
        value={currentTaskWorkerId}
    > 
    </input> */}
    
export default TaskModifier;

