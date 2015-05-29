angular.module('blog-hopper').service('blogsService', function($http, $q) {

	this.getBlogs = function(skip) {
		var deferred = $q.defer();

		var url = '/api/blogs';

		if (!skip) {
			skip = 0;
		}
		url += '?skip='+skip;

		$http({
			method: 'GET',
			url: url
		}).then(function(response) {
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};

	this.addBlog = function(blog) {
		var deferred = $q.defer();
		$http({
			method: 'POST',
			url: '/api/blogs',
			data: blog
		}).then(function(response) {
			deferred.resolve(response.data);
		});
		return deferred.promise;
	};

});