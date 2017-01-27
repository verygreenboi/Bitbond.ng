class TransactionController {
	constructor (User, Coinbase) {
		'ngInject';
		this.user = User.current;
		this.tx = Coinbase.getTransactions();
	}
}

export default TransactionController;