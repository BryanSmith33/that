var app = angular.module('blog-hopper', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/templates/login.html',
		controller: 'loginCtrl'
	})
	.when('/forgotPassword', {
		templateUrl: '/templates/fp.html',
		controller: 'fpCtrl'
	})
	.when('/home', {
		templateUrl: '/templates/home.html',
		controller: 'homeCtrl'
	})
	.when('/profile', {
		templateUrl: '/templates/profile.html',
		controller: 'profileCtrl'
	})
	.when('/login', {
		templateUrl: '/templates/login.html',
		controller: 'loginCtrl'
	})
	.otherwise({
        redirectTo: '/'
    });
});//end