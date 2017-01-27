import angular from 'angular';

// Create the module where our functionality can attach to
let transactionModule = angular.module('app.transaction', []);

// Include our UI-Router config settings
import TransactionConfig from './transaction.config';
transactionModule.config(TransactionConfig);

// Controllers
import TransactionController from './transaction.controller';
transactionModule.controller('TransactionController', TransactionController);

import SellController from './sell.controller';
transactionModule.controller('SellController', SellController);

export default transactionModule;