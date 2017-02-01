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
		resolve: {
			transactions: (Coinbase) =>{
				if (!Coinbase.transactions) {
					return Coinbase.getTransactions();
				} else {
					return Coinbase.transactions;
				}
			}
		},
		controller: 'TransactionController as $ctrl',
		templateUrl: 'transaction/list.html',
		title: 'Transactions'
	}).state('app.transaction.buy', {
		resolve: {
			exchange: (Coinbase) =>{
				if (Coinbase.exchanges) {
					return Coinbase.exchanges;
				} else {
					return Coinbase.refreshExchange();
				}
			}
		},
		controller: 'BuyController as $ctrl',
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
	})
	.state('app.transaction.detail', {
		url:'/tx/:id',
		templateUrl: 'transaction/details.html',
	});
}

export default TransactionConfig;