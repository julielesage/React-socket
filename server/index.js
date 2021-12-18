const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5000;
// if using ESM as index.mjs:
//import {Server} from 'socket.io';


/**
 * We configure Socket.IO server in server/index.js, 
 * along with the Express server. 
 * An HTTP wrapper is also needed 
 * since the pure Express server creates a new HTTP server 
 * when app.listen is invoked.
 */
// wraps the server with http
const http = require('http').Server(app);
// initialize io with http wrapper
// cors allow to be also access at localhost:3000(npm start) AND localhost:5000(npm run build, node server)
const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST']
	}
});
/**********************
 * if using ESM index.mjs: (might be better)
/**
 * const httpd = http.Server(app);
 * const io = new Server(httpd, {
	cors: {
	  origin: 'http://localhost:3000',
	  methods: ['GET', 'POST'],
	},
 * });
 * const __dirname = dirname(fileURLToPath(import.meta.url));
 * httpd.listen(port, () => .......
 *********************/

// serve the production web pages
app.use(express.static(path.join(__dirname, '../build')));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '../build', 'index.html')));

//app.listen(port, () => console.log(`Èxpress server running at http://localhost:${port}`));
let global = 0;
io.on('connection', (socket) => {
	console.log(`Server connected : ${socket.id}`);
	socket.on('requestDate', (msg) => {

		const date = new Date();
		console.log(JSON.stringify(date));

		// response only to request : 
		// socket.emit('responseDate', date);

		// response broadcast the event to all connected clients except sender (chat):
		//socket.broadcast.emit('responseDate', date);

		// response is send too all connected clients :
		io.emit('responseDate', date);

		/**
		 * We can use a Redis Adapter or another compatible adapter 
		 * to set up multiple Socket.IO servers. 
		 * In this case, io.emit will broadcast to all servers, 
		 * and then to all of their clients. 
		 * The following code can limit the broadcast only to those clients connected to the current server. 
		 * */
		// io.local.emit('responseDate', date);


		console.log(`Client message from ${socket.id} is "${msg}", and server response is "${date}"`);
		console.log(`Date's JSON string is ${JSON.stringify(date)}`);
	});

	/**
	 * Segment communication 
	 * with namespaces and rooms :
	 */
	const room = `room${global}`;
	socket.join(room);
	io.to(room).emit(`1_GlobalRoom${global}`);
	io.to(room).emit(`2_GlobalRoom${global}`);
	io.to(room).emit(`3_GlobalRoom${global}`);
	global++;





	//socket.on('disconnect', () => console.log(`Server disconnect : ${socket.id}`));

});

let red = 0;
const redNameSpace = io.of('/red');
redNameSpace.on('connection', (socket) => {
	const room = `room${red}`;
	socket.join(room);
	redNameSpace.to(room).emit(`À_RedRoom${red}`);
	redNameSpace.to(room).emit(`B_RedRoom${red}`);
	redNameSpace.to(room).emit(`C_RedRoom${red}`);
	red++;
});

let blue = 0;
const blueNameSpace = io.of('/blue');
blueNameSpace.on('connection', (socket) => {
	const room = `room${blue}`;
	socket.join(room);
	blueNameSpace.to(room).emit(`a_BlueRoom${blue}`);
	blueNameSpace.to(room).emit(`b_BlueRoom${blue}`);
	blueNameSpace.to(room).emit(`c_BlueRoom${blue}`);
	blue++;
});

http.listen(port, () => console.log(`Socket.IO server running at http://localhost:${port}`));

/**
 * Each room as a number when connect:
 * 
 * on localhost:5000:
 * Global messages : 1_GlobalRoom0`, 2_GlobalRoom0, 3_GlobalRoom0
 * Red Messages : A_RedRoom0`, B_RedRoom0, C_RedRoom0
 * Blue Messages: a_BlueRoom0`, b_BlueRoom0, c_BlueRoom0
 * 
 * then on localhost:3000:
 * Global messages : 1_GlobalRoom1`, 2_GlobalRoom1, 3_GlobalRoom1
 * Red Messages : A_RedRoom1`, B_RedRoom1, C_RedRoom1
 * Blue Messages: a_BlueRoom1`, b_BlueRoom1, c_BlueRoom1
 * 
 * refreshing clients increase room index
 */