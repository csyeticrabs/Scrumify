import React, { useState } from "react";

const UserTaskBox = (props) => {
  // console.log(props)
  const tasksArray = props.totalTasks.map(task => {return <li>{task.description}</li>})
  return (
    <div class="card mb-5" style={{"width": "18rem"}} >
      <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/70023235-8b0d-4c88-8ce2-7f3f8a9dd023/d2u5p67-3c6e1a37-957e-4061-8576-8b788d062799.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcwMDIzMjM1LThiMGQtNGM4OC04Y2UyLTdmM2Y4YTlkZDAyM1wvZDJ1NXA2Ny0zYzZlMWEzNy05NTdlLTQwNjEtODU3Ni04Yjc4OGQwNjI3OTkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Bro9yBOwbLht0mtr59SaHZSqRgItc-cnBqY5FSOU1OU" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">{props.name}</h5>
        <ul className='card-text'>
          {tasksArray}
        </ul>

      </div>
    </div>
  )
};

export default UserTaskBox;
