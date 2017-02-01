/* @ngInject */
function bbTxHelper() {
  'ngInject';

  var directive = {
    bindToController: true,
    controller: Controller,
    controllerAs: 'vm',
    link: link,
    restrict: 'A',
    scope: {
    	item:'=',
    	index:'='
    },
		templateUrl: 'components/tx-helpers/table-row.html'
  };
  return directive;

  function link(scope, element, attrs) {

  }

  function Controller() {
  	// body...
  }
}

export default bbTxHelper;