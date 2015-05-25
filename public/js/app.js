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
	.otherwise({
        redirectTo: '/'
    });
});//end
