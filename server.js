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

var io = require('socket.io')(server, { log: false });

//Handel connections
io.sockets.on('connection', function (socket) {
	console.log("[i] New user connected:", socket.id);
	io.emit('clients', io.engine.clientsCount);

	socket.on('disconnect', function () {
		console.log("[i] User disconnected:", socket.id);
		socket.broadcast.emit('clients', io.engine.clientsCount);
	});

	socket.on('d', function (data) {
		data["sid"] = socket.id;
		//console.log(data["a"]);
		socket.broadcast.emit('d', data); //Send to all but the sender
		//io.emit("d", data); //Send to all clients (4 debugging)
	});
});

// Clean Exit

let exitevent = [ "SIGINT", "SIGTRAP" ];

exitevent.forEach(event => {
	process.on(event, exit);
});

function exit() {
	console.warn("[w] Server is now going down! Closing server...");
	server.close(() => {
		console.log("[i] Server closed. Exitting...");
		process.exit(0);
	});
}
