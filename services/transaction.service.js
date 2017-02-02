var r = require('../modules/service-response.js');
var config = require('../config.json');

var service = {};

var mountPath = process.env.PARSE_MOUNT || '/1';

module.exports = service;

service.updateSellTransaction = UpdateSellTransaction;
service.getTxByAddress = GetTxByAddress;

var server_url;

if (process.env.PARSE_SERVER_URI) {
    server_url = process.env.PARSE_SERVER_URI + mountPath;
}

function UpdateSellTransaction(id, data) {
	var s;
  if (server_url) {
    s = server_url + '/classes/Transaction/'+id;
  }
  console.log(data);
	var options = {
		url: s  || config.apiUrl + '/classes/Transaction/'+id,
		headers: {
      'X-Parse-Application-Id': process.env.APP_ID || '9o87s1WOIyPgoTEGv0PSp9GXT1En9cwC',
      'X-Parse-Master-Key': process.env.MASTER_KEY || '2h7bu8iPlLZ43Vt80rB97X2CDFmY087P',
      'Content-Type': 'application/json'
    }, 
    json: {
    	"amount": data.amount * 1,
    	"txId": data.transactionId,
    	"status": "pending"
    }
	};
	return r.put(options);
}

function GetTxByAddress(address) {
	var s;
  if (server_url) {
    s = server_url + '/classes/Transaction';
  }

  var options = {
		url: s  || config.apiUrl + '/classes/Transaction',
		headers: {
      'X-Parse-Application-Id': process.env.APP_ID || '9o87s1WOIyPgoTEGv0PSp9GXT1En9cwC',
      'X-Parse-Master-Key': process.env.MASTER_KEY || '2h7bu8iPlLZ43Vt80rB97X2CDFmY087P',
      'Content-Type': 'application/json'
    },
    qs:{
    	'where':{
    		'type':'sell',
    		'address': address
    	}
    }
	};
	return r.get(options);
}