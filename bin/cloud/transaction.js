var client = require(__dirname + '/modules/coinbase.js');
var _ = require('underscore');

// client.getAccount(process.env.COINBASE_PRIMARY_ACC_ID).then((acc) =>{
// 	return client.createAddress(acc);
// }).then((addr) =>{
// 	console.log(addr);
// }).catch((err) =>{
// 	console.log(err);
// });

Parse.Cloud.define('getBalance', (req, res) =>{
	return client.getAccount(process.env.COINBASE_PRIMARY_ACC_ID).then((acc) =>{
		var bal = _.omit(acc, ["client", "id", "name", "primary", "type", "created_at", "updated_at", "updated_at", "resource", "resource_path"]);
		console.log(JSON.stringify(bal));
		return res.success(bal);
	});
});

Parse.Cloud.define('getxe', (req, res) =>{
	return client.getXE("USD").then((rates) =>{
		console.log(JSON.stringify(rates.data.amount));
		var xe = 1 / parseInt(rates.data.amount);
		return res.success(xe);
	}).catch((err) =>{
		return res.error(err);
	});
});

Parse.Cloud.define('getAddress', (req, res) =>{
	var user = req.user;
	if(!user) {
		return res.error('No valid user');
	}
	var Transaction = Parse.Object.extend("Transaction");
	var transaction = new Transaction();
	return client.getAccount(process.env.COINBASE_PRIMARY_ACC_ID).then((acc) =>{
		return client.createAddress(acc);
	}).then((addr) =>{
		transaction.set("user", user);
		transaction.set("address", addr);
		transaction.set("type", "sell");
		return transaction.save(null, {sessionToken : user.getSessionToken()});
	}).then((transaction) =>{
		return res.success(transaction);
	}).catch((err) =>{
		return res.error(err);
	});

})

Parse.Cloud.beforeSave('Transaction', (req, res) =>{
	var buy 	= req.object;
	var acl 	= new Parse.ACL();

	acl.setReadAccess(req.user.id, true);
	acl.setRoleReadAccess("admin", true);
	acl.setRoleWriteAccess("admin", true);

	buy.setACL(acl);

	res.success();
});

