var q = require('q');
var Client = require('coinbase').Client;
var client = new Client({'apiKey': process.env.COINBASE_API_KEY, 'apiSecret': process.env.COINBASE_API_SECRET});

var service = {};

service.getAccount = GetAccount;
service.createAddress = CreateAddress;
service.getXE = GetXE;

function GetAccount(id) {
	var defer = q.defer();
	client.getAccount(id, function(err, account) {
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(account);
		}
	});
  return defer.promise;
}

function CreateAddress(account) {
	var defer = q.defer();
	account.createAddress(null, (err, addr) =>{
		if (err) {
			defer.reject(err);
		} else {
			defer.resolve(addr.address);
		}
	});
	return defer.promise;
}

function GetXE(cur) {
	var defer = q.defer();
	var c;
	if (!cur) {
		c = "USD";
	}

	client.getBuyPrice({'currencyPair': 'BTC-USD'}, function(err, rates) {
	  if (err) {
			defer.reject(err);
		} else {
			defer.resolve(rates);
		}
	});
	return defer.promise;
}

module.exports = service;