class BuyController {
	constructor($scope, $rootScope, exchange, $state, Coinbase, User){
		'ngInject';

		this._$scope = $scope;
		this.exchange = exchange;
		this.$state = $state;
		this.transaction = {};
		this.error = {};
		this.rs = $rootScope;
		this.cb = Coinbase;
		this.user = User;
	}

	sendTrans(){
		if (this.transaction.amount) {
			this.rs.stateLoading = true;
			this.transaction.native_amount = angular.copy(this.transaction.amount); 
			this.transaction.amount = this.transaction.amount / 520;
			this.transaction.amount = this.transaction.amount * this.exchange;
			this.transaction.status = 'pending';
			this.transaction.type		= 'buy';
			this.transaction.user = this.user.current;
			if (!this.transaction.address) {
				this.transaction.address = this.user.current.btc_address;
			}
			this.cb.buy(this.transaction).then((res) =>{
				this.rs.stateLoading = false;
				this.$state.go('app.transaction.list');
			}).catch((error) =>{
				this.rs.stateLoading = false;
				this.error = error;
			});
		}
	}

}

export default BuyController;