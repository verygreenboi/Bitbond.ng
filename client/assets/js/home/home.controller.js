class HomeCtrl {
  constructor(User, AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;

    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };

    // this._socket.connect();
    // this._socket('connect', (data) =>{
    //   console.log(data);
    // });

    // this._$scope.$on('$locationChangeStart', (e) =>{
    //   this._socket.disconnect();
    // })

  }

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }


}

export default HomeCtrl;
