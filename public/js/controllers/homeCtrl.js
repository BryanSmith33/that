angular.module('blog-hopper').controller('homeCtrl',['$scope', function($scope, blogsService, blogs) {

	$scope.blogs = blogs;
	$scope.skip_blogs = 0;
	$scope.limit = 10;

	var load = function() {
		BlogsService.getBlogs($scope.skip_blogs).then(function(blogs) {
			$scope.blogs = blogs;
		});
	};

	$scope.nextPage = function() {
		$scope.skip_blogs += $scope.limit;
		load();
	};
	$scope.prevPage = function() {
		$scope.skip_blogs -= $scope.limit;
		load();
	};

	$scope.clickAdd = function() {
		BlogsService.addBlog($scope.newBlog).then(function(blog) {
			$scope.newBlog = {};
			$scope.blogs.push(blog);
		});
	};

}]);//end 