class SellController {
	constructor($scope, address, $state, SocketIO) {
		'ngInject';

		this._$scope = $scope;
		this.address = address;
		this.socket  = SocketIO;

		this.socket.on(this.address, (data) =>{
			$state.go('app.transaction.list');
		});

		// this.socket.on('1J8tXtwS8bEKEbhgiAFqqnx2hSzHPsK46C', (data) =>{
		// 	console.log(data);
		// });

    // this._$scope.$on('socket:tx-pending', (e, d) =>{
    //   if (d.address && d.address === this.address) {
    //   	$state.go('app.transaction.list');
    //   }
    // });
	}
}

export default SellController;