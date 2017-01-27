function TransactionConfig($stateProvider) {
	'ngInject';

	$stateProvider
	.state('app.transaction', {
		abstract: true,
		url: '/transactions',
		templateUrl: 'transaction/index.html'
	})
	.state('app.transaction.list', {
		url : '',
		controller: 'TransactionController as $ctrl',
		templateUrl: 'transaction/list.html',
		title: 'Transactions'
	}).state('app.transaction.buy', {
		url: '/buy',
		templateUrl: 'transaction/buy.html',
		title: 'Buy'
	}).state('app.transaction.sell', {
		resolve:{
			address: (Coinbase) => {
				return Coinbase.getAddress();
			}
		},
		url: '/sell',
		controller: 'SellController as $ctrl',
		templateUrl: 'transaction/sell.html',
		title: 'Sell'
	});
}

export default TransactionConfig;