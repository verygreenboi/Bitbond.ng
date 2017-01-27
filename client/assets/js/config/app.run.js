function AppRun(AppConstants, $rootScope, Coinbase) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.setPageTitle(toState.title);
  });

  // Helper method for setting the page's title
  $rootScope.setPageTitle = (title) => {
    $rootScope.pageTitle = '';
    if (title) {
      $rootScope.pageTitle += title;
      $rootScope.pageTitle += ' \u2014 ';
    }
    $rootScope.pageTitle += AppConstants.appName;

    $rootScope.$on('$stateChangeStart', function() {
        $rootScope.stateLoading = true;
    });
    
    $rootScope.$on('$stateChangeSuccess', function() {
      $rootScope.stateLoading = false;
    });
  };

}

export default AppRun;
