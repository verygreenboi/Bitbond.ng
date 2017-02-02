var express = require('express');
var router = express.Router();
var _ = require('underscore');
var txService = require('../services/transaction.service.js')


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

		txService.getTxByAddress(message.address).then((tx) =>{
			if (JSON.parse(tx).results.length == 0) {
				return res.status(404).send('fail');
			}
			var tx = JSON.parse(tx).results[0];

			return txService.updateSellTransaction(tx.objectId, message);

		}).then((tx) =>{
			io.sockets.emit(message.address, message);
			return res.status(201).send('ok');
		}).catch((err) =>{
			console.log(err);
			return res.status(400).send(err);
		});

	});

	return router;
}

module.exports = returnRouter;