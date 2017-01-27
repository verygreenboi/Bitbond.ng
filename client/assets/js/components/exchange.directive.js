function ShowExchange(Coinbase) {
	'ngInject';

	return {
	 	restrict: 'E',
	 	template:'<p><b>&#8358;520 - $1 </b>(<i class="fa fa-bitcoin"></i>{{exchange | number :5}})</p>',
	 	replace:true,
	 	link: function (scope, element, attrs){
	 		scope.Coinbase = Coinbase;
	 		scope.exchange = 0.0000;
 			Coinbase.refreshExchange().then((bal) =>{
 				scope.exchange = bal;
 			}).catch((err) =>{
 				scope.exchange = 0.0000;
 				console.log(err);
 			});
	 	}
 	}
}

export default ShowExchange;