import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class App extends Component {

	constructor(props){
		super(props);
		this.state = {date: new Date()};
		this.tick	= this.tick.bind(this);
	}

	componentDidMount(){
		this.timerID = setInterval(
			() => this.tick(),
			1000
		);
	}

	componentWillUnmount(){
		clearInterval(this.timerID);
	}

	tick(){
		this.setState({
			date: new Date()
		});
	}

	render(){
		return (
					<div>
						<h1>time : {this.state.date.toLocaleTimeString()}.</h1>
					</div>
		);
	}
}

export default App;
