/* CONFIG */
var PORT = process.env.PORT || 8080;
var privateKeyPath = "./cert/key.pem"; //Default "./cert/key.pem"
var certificatePath = "./cert/cert.pem"; //Default "./cert/cert.pem"

/* END CONFIG */

var fs = require('fs');
var express = require('express');
var https = require('https');
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

var io = require("socket.io")(server, { log: false });

//Handel connections
io.on('connection', function (socket) {
	let roomID = "MAIN";

	socket.join(roomID);
	io.to(roomID).emit('clients', io.to(roomID).engine.clientsCount);
	socket.on('room:change', name => {
		socket.leave(roomID);
		roomID = name.toUpperCase();
		socket.join(roomID);
		io.to(roomID).emit('clients', io.to(roomID).engine.clientsCount);
	});
	socket.on('d', data => {
		socket.to(roomID).emit('d', data);
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
