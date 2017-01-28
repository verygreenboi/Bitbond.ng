function ShowBalance(Coinbase) {
	'ngInject';

	return {
	 	restrict: 'E',
	 	template:'<span><i class="fa fa-bitcoin"></i>{{balance | number :6}}</span>',
	 	replace:true,
	 	link: function (scope, element, attrs){
	 		scope.Coinbase = Coinbase;
	 		scope.balance = 0.0000;
	 		if (!Coinbase.currentBalace) {
	 			Coinbase.refreshBalance().then((bal) =>{
	 				scope.balance = bal.data.result.balance.amount;
	 			}).catch((err) =>{
	 				scope.balance = 0.0000;
	 				console.log(err);
	 			});
	 		} else {
	 			scope.balance = Coinbase.currentBalace.balance.amount;
	 		}
	 	}
 	}
}

export default ShowBalance;