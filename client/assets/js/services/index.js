import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import UserService from './user.service';
servicesModule.service('User', UserService);

import TokenService from './token.service'
servicesModule.service('Token', TokenService);

import CoinbaseService from './coinbase.service';
servicesModule.service('Coinbase', CoinbaseService);

import SocketFactory from './socket-io.service';
servicesModule.service('SocketIO', SocketFactory);

// import ProfileService from './profile.service';
// servicesModule.service('Profile', ProfileService);

// import ArticlesService from './articles.service';
// servicesModule.service('Articles', ArticlesService);

// import CommentsService from './comments.service';
// servicesModule.service('Comments', CommentsService);

// import TagsService from './tags.service';
// servicesModule.service('Tags', TagsService);


export default servicesModule;