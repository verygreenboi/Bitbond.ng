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
  $rootScope.$on('$stateChangeStart', function(e, toState  , toParams
                                                   , fromState, fromParams) {
      $rootScope.stateLoading = true;
      var isLogin     = toState.name === "app.login";
      var isRegister  = toState.name === "app.register";
      var isHome      = toState.name === "app.home";

      if (isLogin || isRegister || isHome) {
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
