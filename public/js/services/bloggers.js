angular.module('blog-hopper').service('bloggersService', function($http, $q) {

	this.signup = function(email, password, firstName, lastName, blogUrl) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/bloggers',
			data:  {
				email: email,
				password: password,
				firstName: firstName,
				lastName: lastName,
				blogUrl: blogUrl
			}
		}).then(function(res) {
			deferred.resolve(res.data);
		}).catch(function(res) {
			deferred.reject(res.data);
		});
		return deferred.promise;
	};

	this.login = function(email, password) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/bloggers/auth',
			data:  {
				email: email,
				password: password
			}
		}).then(function(res) {
			deferred.resolve(res.data);
		}).catch(function(res) {
			deferred.reject(res.data);
		});
		return deferred.promise;
	};
});