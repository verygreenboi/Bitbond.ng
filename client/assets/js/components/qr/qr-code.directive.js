
function ShowQRCode() {
	'ngInject';
	return {
		restrict: 'E',
		scope:true,
		link: function(scope, element, attr){
			scope.address = attr.address;
			element.qrcode({
				render: 'canvas',
				minVersion: 1,
    		maxVersion: 40,
    		ecLevel: 'L',
    		size: 400,
    		fill: '#000',
    		text: scope.address
			})
		},
		templateUrl: 'components/qr/qr.html'
	}
}

export default ShowQRCode;