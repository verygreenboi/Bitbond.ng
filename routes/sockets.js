var express = require('express');
var router = express.Router();


function returnRouter(io) {
	/* GET users listing. */
	router.get('/', function(req, res, next) {
	  res.send('respond with a resource');
	});

	var user = {
	  		username: 'username',
	  		name: 'thompson'
	  	};

	io.sockets.on('connection', (s) =>{
		socket.on('disconnect', function () {
	    console.log("A user has disconnected");
	    io.emit('connect', null);
	  });
	  io.emit('connect', {user: user});
	})

	return router;
}

module.exports = returnRouter;