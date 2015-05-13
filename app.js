var app = angular.module('blog-hopper', ["ngRoute"]);



app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'login/login.html',
		controller: 'loginCtrl'
	})
	.otherwise({
        redirectTo: '/'
    });
});//end


