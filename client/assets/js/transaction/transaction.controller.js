class TransactionController {
	constructor (User, Coinbase, transactions) {
		'ngInject';
		this.user = User.current;
		this.tx = transactions;

		console.log(transactions);
	}
}

export default TransactionController;