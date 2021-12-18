import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/******
 * BEGINNNING
 * 
 * npx create-react-app react-socket
 * cd react-socket
 * server : npm i socket.io
 * (The Create React App has a builtin Express server)
 * client : npm i socket.io-client
 * 
 * GOAL : LESSON WITH SOCKET.IO
 * It is because WebSocket API is the bare minimum standard, 
 * and Socket.IO provides enterprise-grade WebSocket.
 * 
 * A Socket.IO client automatically connects to the server upon creation. When the connection is lost or in error, it reconnects to the server by a pre-configured number of attempts. The default setting is to retry unlimited times.
 * 
 * Socket.IO connection can be SSL, and an authentication token can be set.
 * 
 * Socket.IO supports namespaces and rooms to segment communication.
 * 
 * Socket.IO provides logging and debugging support.
 * 
 * Socket.IO supports ES modules, in addition to CJS.
 * 
 * Socket.IO is a library that has community support, while WebSocket is simply a protocol.
 * 
 * 
 * By default, requests to a different origin (domain, scheme, or port) are forbidden. 
 * To simplify the setup, we run the client in a production mode, hosted by the same Express server.
 * run npm build
 * Run node server, and the user interface can be accessed at http://localhost:5000.
 * 
 * 
 * 
 * DEBUG
 * 
 * DEBUG=* node server
 * give too much infos
 * 
 * DEBUG=socket.io:client* node server
 * will just give client connection info
 * 
 * DEBUG=engine,socket.io:client* node server
 * shows actions and connections
 */
