var app = angular.module('blog-hopper', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/templates/login.html',
		controller: 'loginCtrl'
	})
	.otherwise({
        redirectTo: '/'
    });
});//end
