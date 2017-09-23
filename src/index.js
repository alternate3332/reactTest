import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CapturedData from './CapturedData/CapturedData';
import ImgView from './ImgView/ImgView';
import registerServiceWorker from './registerServiceWorker';


var datas = [
	{id: 1, strength: 40, result: "OK"},
	{id: 2, strength: 20, result: "NG"},
	{id: 3, strength: 60, result: "OK"},
	{id: 4, strength: 100, result: "OK"},
	{id: 5, strength: 0, result: "NG"}
];


ReactDOM.render(<App />, document.getElementById('main'));
ReactDOM.render(<CapturedData Datas={datas}/>, document.getElementById('sub1'))
ReactDOM.render(<ImgView imgPath="ImgView/icon.png" />, document.getElementById('sub2'));
registerServiceWorker();
