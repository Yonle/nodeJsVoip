/* CONFIG */
var PORT = process.env.PORT || 8080;
var privateKeyPath = "./cert/key.pem"; //Default "./cert/key.pem"
var certificatePath = "./cert/cert.pem"; //Default "./cert/cert.pem"

/* END CONFIG */

var fs = require('fs');
var express = require('express');
var https = require('https');
var roomSize = new Map();
var app = express();

app.use(express.static(__dirname + '/webcontent'));

var privateKey = fs.readFileSync( privateKeyPath );
var certificate = fs.readFileSync( certificatePath );

var server = https.createServer({
    key: privateKey,
    cert: certificate
}, app)

const listener = server.listen(PORT, "0.0.0.0", () => {
	console.log(`[i] VoIP server is now running on port ${listener.address().port}`);
	console.log(`[i] Now visit https://${listener.address().address}:${listener.address().port} in your browser and ignore SSL Warning.`)
});

var io = require("socket.io")(server, { log: false, transport: ["websocket"] });

//Handel connections
io.on('connection', function (socket) {
	let roomID = "MAIN";

	socket.join(roomID);
	roomSize.set(roomID, (roomSize.get(roomID)||0)+1);
	io.to(roomID).emit('clients', roomSize.get(roomID));
	socket.on('room:change', name => {
		socket.leave(roomID);
		roomSize.set(roomID, (roomSize.get(roomID)||0)-1);
		io.to(roomID).emit('clients', roomSize.get(roomID));
		if (!roomSize.get(roomID)) roomSize.delete(roomID);
		roomID = name.toUpperCase();
		socket.join(roomID);
		roomSize.set(roomID, (roomSize.get(roomID)||0)+1);
		io.to(roomID).emit('clients', roomSize.get(roomID));
	});
	socket.on('disconnect', () => {
		roomSize.set(roomID, (roomSize.get(roomID)||0)-1);
		io.to(roomID).emit('clients', roomSize.get(roomID));
		if (!roomSize.get(roomID)) roomSize.delete(roomID);
	});
	socket.on('d', data => {
		socket.to(roomID).volatile.emit('d', data);
	});

});

// Clean Exit

let exitevent = [ "SIGINT", "SIGTRAP" ];

exitevent.forEach(event => {
	process.on(event, exit);
});

function exit() {
	console.warn("[w] Server is now going down! Closing server...");
	server.close();
	console.log("[i] Server closed. Exitting...");
	process.exit(0);
}
