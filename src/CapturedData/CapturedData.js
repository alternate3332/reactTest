import React, { Component } from 'react';
import './CapturedData.css';

class Data extends Component{
	render(){
		var d = this.props.data;
		return(
			<tr>
				<td>{d.id}</td>
				<td>{d.strength}</td>
				<td>{d.result}</td>
			</tr>
		);
	}
}

class CapturedData extends Component{
	render(){

		var rows = [];
		this.props.Datas.forEach(function(e){
			rows.push(<Data data={e} key={e.id} />);
			console.log(e);
		});
/*
		this.props.datas.sort(function(a, b){
			if(a.id < b.id){
				return -1;
			}
			else if(b.id < a.id){
				return 1;
			}
			return 0; 
		}).forEach(function(data){
			rows.push(<Data data={data} key={data.id}/>);
		});
*/

		return(
			<table>
				<thead>
					<tr>
						<th>No</th>
						<th>Strength</th>
						<th>Result</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}

export default CapturedData;