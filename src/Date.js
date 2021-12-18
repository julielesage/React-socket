import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

function Date() {
	const [serverDate, setServerDate] = useState();
	// generate a reference to keep the socket persistent :
	const client = useRef();

	useEffect(() => {
		const socket = io('http://localhost:5000');

		socket.on('connect', () =>
			console.log(`Client connected : ${socket.id}`));

		socket.on('disconnect', (reason) =>
			console.log(`Client disconnected : ${reason}`));

		socket.on('connect_error', (reason) =>
			console.log(`Client connect_error : ${reason}`));

		socket.on('responseDate', (msg) => setServerDate(msg));

		client.current = socket;
	}, []);

	return (
		<div className="Date">
			<h1>React Socket</h1>
			<button onClick={() => client.current.emit('requestDate', 'need date')}>Click to request date from server</button>
			<div>Serveur response : {serverDate}</div>
		</div>
	);
}

export default Date;

/**
 * SOCKET METHODS :
 * socket.once(eventName, listener), 
 * socket.off(eventName, listener), 
 * socket.removeAllListeners([eventName]), 
 * socket.onAny(listener), 
 * socket.prependAny(listener), 
 * socket.offAny([listener])
 */
