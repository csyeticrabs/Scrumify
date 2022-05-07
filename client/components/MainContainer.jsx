import React, { Component } from 'react';


class MainContainer extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            //tasks are an array of objects
            tasks: [
                {
                id: 321,
                desc: '',
                user: '',
                completed: true,
            }
        ]
        }
    }
    //get all pictures
    componentDidMount() {
        fetch//(Api?)
    }

    render() {
    // Make sure you to do conditional rendering to make sure 
        return
    }
}


export default MainContainer;