import React, { useState, useEffect, Fragment } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'

const MainContainer = props => {
  const percentage = ((props.data.tasks.filter(task => task.completed === true).length / props.data.tasks.length)*100).toFixed(2);

    // Make sure you to do conditional rendering to make sure
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // console.log('running ')
    setProgress(percentage);
  })


    return (
      <Fragment>
        <div>
          <h1>Progress</h1>
          <ProgressBar animated now={progress} striped variant="success" label={`${progress}% Completed`}/>

          {/* <div class="progress">
            <div 
            class="progress-bar progress-bar-striped progress-bar-animated" 
            role="progressbar" 
            aria-valuenow={percentage}
            aria-valuemin="0" 
            aria-valuemax="100" 
            style={{'color': 'green', 'width': percentage + '%'}}
            label={`${percentage}% completed`}
            >
            </div>
          </div> */}  

          {/* <img
            src="https://images.squarespace-cdn.com/content/v1/5facd33fceb5ae05dfff29d3/1609897682677-MFPDUNUXL1D5EWEC3JUQ/IMG_0972.JPG"
            class="img-fluid"
            alt="..."
          /> */}
        </div>
      </Fragment>
    );
  };

export default MainContainer;
