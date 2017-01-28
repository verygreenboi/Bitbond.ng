function AppRun(AppConstants, $rootScope, Coinbase, Token, User, $state) {
  'ngInject';


  // Helper method for setting the page's title
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = '';
    if (title) {
      $rootScope.pageTitle += title;
      $rootScope.pageTitle += ' \u2014 ';
    }
    $rootScope.pageTitle += AppConstants.appName;
  };
  $rootScope.$on('$stateChangeStart', function(e) {
      $rootScope.stateLoading = true;
      var isLogin     = toState.name === "app.login";
      var isRegister  = toState.name === "app.register";

      if (isLogin || isRegister) {
        return;
      }

      if (!Token.get() || !User.current) {
        e.preventDefault();
        $state.go('app.login');
      }
  });

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.setPageTitle(toState.title);
    $rootScope.stateLoading = false;
  });
}

export default AppRun;
