var express = require('express');
var router = express.Router();
var _ = require('underscore');


function returnRouter(io) {
	/* GET users listing. */
	router.get('/', function(req, res, next) {
	  res.send('respond with a resource');
	});

	router.post('/transaction', (req, res) =>{
		var data = req.body;

		var message = {};

		message.address 	= data.data.address;
		message.amount 		= data.additional_data.amount.amount;
		message.currency 	= data.additional_data.amount.currency;
		message.transactionId = data.additional_data.transaction.id;

		io.sockets.emit(message.address, message);

		res.send('ok');
	});

	return router;
}

module.exports = returnRouter;