import React, {Component} from 'react';
import icon from "./icon.png";

class ImgView extends React.Component{

	constructor(props){
		super(props);
		this.img = null;
		//this.dispWidth = window.parent.screen.width;
		//this.dispHeight = window.parent.screen.height;
		this.dispWidth = window.innerWidth;
		this.dispHeight = window.innerHeight;
		let base = Math.floor(this.dispWidth*0.2);
		this.state = {
			style : {
				position: "absolute",
				top : 0,
				left : 0,
				width: base,
				height: base,
				border: "solid 2px"
			},
			finger	: [null, null],
			width		 : base,
			height	 : base
		};

		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.onTouchMove = this.onTouchMove.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);
	}

	onTouchStart(e){
		// èâÇﬂÇÃÉ^ÉbÉ`ÇÕèÓïÒÇÃèâä˙âª
		let state = this.state;
		state.finger = [null, null];
		this.setState(state);
	}

	onTouchMove(e){

		let state = this.state;
		if(e.targetTouches.length == 1){
			if(state.finger[0] == null){
				var touch = e.targetTouches[0];
				
				state.finger[0] = {x:touch.clientX, y:touch.clientY};
				state.width		 = e.target.clientWidth;
				state.height	 = e.target.clientHeight;
				this.setState(state);
			}
			this.objMove(e.targetTouches[0]);
		}
		else if(e.targetTouches.length == 2){
			if(state.finger[0] == null || state.finger[1] == null){
				let touch = e.targetTouches[0];
				let touch2 = e.targetTouches[1];
				state.finger[0] = {x:touch.clientX, y:touch.clientY};
				state.finger[1] = {x:touch2.clientX, y:touch2.clientY};
				state.width		 = e.target.clientWidth;
				state.height	 = e.target.clientHeight;
				this.setState(state);
			}
			let touches = e.targetTouches;
			let touch1 = {x:touches[0].clientX, y:touches[0].clientY};
			let touch2 = {x:touches[1].clientX, y:touches[1].clientY};
			this.objResize(touch1, touch2);
		}

		
		//console.log(this.state);
	}

	onTouchEnd(e){
		this.onTouchStart(e);
	}

	getFinalSize(x, y, width, height, MAX_WIDTH, MAX_HEIGHT){
		width = width < 0 ? 0 : width;
		height = height < 0 ? 0 : height;

		width = (width+x) > MAX_WIDTH ? MAX_WIDTH-x : width;
		height = (height+y) > MAX_HEIGHT ? MAX_HEIGHT-y : height;

		let min = width < height ? width: height;
		return {width: min, height: min};
	}

	getFinalPosition(x, y, width, height, MAX_WIDTH, MAX_HEIGHT){
		x = x < 0 ? 0 : x;
		y = y < 0 ? 0 : y;

		x = (width+x) > MAX_WIDTH ? MAX_WIDTH-width : x;
		y = (height+y) > MAX_HEIGHT ? MAX_HEIGHT-height : y;

		return {x:x, y:y};
	}

	objMove(e){
		var touch = e;
		let state = this.state;
		const diffX = touch.clientX - state.finger[0].x;
		const diffY = touch.clientY - state.finger[0].y;

		let tmpX = 	state.style.left + diffX;
		let tmpY = 	state.style.top + diffY;

		let pos = this.getFinalPosition(tmpX, tmpY, state.style.width, state.style.height, this.dispWidth, this.dispHeight);

		state.style.top = pos.y;
		state.style.left = pos.x;

		state.finger[0].x = touch.clientX;
		state.finger[0].y = touch.clientY;

		this.setState(state);
	}

	distance(pos1, pos2){
		let d = Math.pow((pos1.x-pos2.x) ,2) + Math.pow((pos1.y-pos2.y) ,2);
		return Math.floor(Math.sqrt(d));
	}

	objResize(touch1, touch2){
		let state = this.state;
	
		const diff = this.distance(touch1, touch2) - this.distance(state.finger[0], state.finger[1]);

		let tmpWidth = state.width + diff;
		let tmpHeight = state.height + diff;
		state.finger[0] = touch1;
		state.finger[1] = touch2;

		let size = this.getFinalSize(state.style.left, state.style.top, tmpWidth, tmpHeight, this.dispWidth, this.dispHeight);
		state.style.width = state.width = size.width;
		state.style.height = state.height = size.height;
		this.setState(state);


	}

	onDrag(e){
		console.log(e);
	}

	componentDidMount(){
	}

/* className="swiper-no-swiping" */
	render(){
		const divStyle = {
			width: "20%",
			height: "20%",
		};
		return (
			<div className="swiper-no-swiping" onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd} style={this.state.style}> 
				<img id="img" width="100%" height="100%" src={icon} ></img>
			</div>
		);
	}
}

export default ImgView;