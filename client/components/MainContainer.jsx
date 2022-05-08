import React, { Component } from 'react';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //tasks are an array of objects
      tasks: [
        {
          id: 321,
          desc: '',
          user: '',
          completed: true,
        },
      ],
    };
  }
  //get all pictures
  componentDidMount() {
    // fetch//(Api?)
  }

  render() {
    // Make sure you to do conditional rendering to make sure
    return (
      <div>
        <h1>Hi, this is the main container</h1>
        <img
          src="https://images.squarespace-cdn.com/content/v1/5facd33fceb5ae05dfff29d3/1609897682677-MFPDUNUXL1D5EWEC3JUQ/IMG_0972.JPG"
          class="img-fluid"
          alt="..."
        />
      </div>
    );
  }
}

export default MainContainer;
