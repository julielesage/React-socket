import { useEffect, useState } from 'react';
import './App.css';
import Date from './Date';
import { io } from 'socket.io-client';

const App = () => {
	const [globalMessages, setGlobalMessages] = useState([]);
	const [redMessages, setRedMessages] = useState([]);
	const [blueMessages, setBlueMessages] = useState([]);

	useEffect(() => {

		// a socket without spacename listen to all events
		const globalSocket = io(`http://localhost:5000`);
		globalSocket.onAny((eventName) =>
			setGlobalMessages((previousMessages) => [...previousMessages, eventName])
		);
		globalSocket.on('disconnect', () => globalSocket.offAny());

		const redSocket = io(`http://localhost:5000/red`);
		redSocket.onAny((eventName) =>
			setRedMessages((previousMessages) => [...previousMessages, eventName])
		);
		redSocket.on('disconnect', () => redSocket.offAny());

		const blueSocket = io(`http://localhost:5000/blue`);
		blueSocket.onAny((eventName) =>
			setBlueMessages((previousMessages) => [...previousMessages, eventName])
		);
		blueSocket.on('disconnect', () => blueSocket.offAny());

	}, []);

	return (
		<>
			<Date />
			<br />
			<br />
			<br />
			<div>Global Messages : {globalMessages.join(', ')}</div>
			<div>Red Messages : {redMessages.join(', ')}</div>
			<div>Blue Messages : {blueMessages.join(', ')}</div>
		</>
	)

}

export default App;