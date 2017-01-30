export default class Coinbase {
	constructor(Token, AppConstants, $http, $q, $cacheFactory){
		'ngInject';

    this._Token = Token;
    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;

    this.currentBalance = null;
    this.exchanges = null;
    this.transactions = null;
    this.lru = $cacheFactory('lruCache', { capacity: 10 }); 
	}

	refreshBalance(){
		return this._$http({
			method: 'POST',
			url: this._AppConstants.api +"/functions/getBalance",
			headers:{
        'X-Parse-Application-Id': this._AppConstants.appId
      },
      cache: this.lru
		}).then((bal) =>{
			this.currentBalance = bal.data.result;
			return bal;
		}).catch((err) =>{
			this.currentBalance = null;
		});
	}

	getAddress(){
		return this._$http({
			method:'POST', 
			url: this._AppConstants.api +"/functions/getAddress",
			headers:{
        'X-Parse-Application-Id': this._AppConstants.appId
      },
      cache: this.lru
		}).then((addr) => {
			return addr.data.result.address;
		}).catch((err) =>{
			return err;
		});
	}

	refreshExchange(){
		return this._$http({
			method: 'POST',
			url: this._AppConstants.api +"/functions/getxe",
			headers:{
        'X-Parse-Application-Id': this._AppConstants.appId
      }
		}).then((xe) =>{
			this.exchanges = xe.data.result;
			return xe.data.result;
		}).catch((err) =>{
			this.exchanges = null;
		});
	}

	getTransactions(){
		return this._$http({
			method:'GET',
			url: this._AppConstants.api +"/classes/Transaction",
			headers: {
				'X-Parse-Application-Id': this._AppConstants.appId
			}
		}).then((tx) =>{
			this.transactions = tx.data.result;
			return tx.data.result;
		}).catch((err) =>{
			console.log(err);
			return this.transactions;
		});
	}

}