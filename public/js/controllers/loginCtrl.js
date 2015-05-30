angular.module('blog-hopper').controller('loginCtrl', function($scope, $location, usersService) {

        $scope.custom2 = true;
        $scope.toggle1 = function() {
            $scope.custom2 = !$scope.custom2;
        };
        $scope.custom1 = true;
        $scope.toggle2 = function() {
            $scope.custom1 = !$scope.custom1;
        };

        $scope.name = 'Blog-Hopper';

        /*Log In*/
		$scope.clickLogin = function() {
			usersService.login($scope.email, $scope.password).then(function() {
				$location.path('/home');
			}).catch(function(err) {
				$scope.error = err;
			});
		};


		/*Sign Up*/
		$scope.userSignup = function() {
			if ($scope.password !== $scope.password2) {
				$scope.error = "Passwords don't match.";
				return;
			}
			usersService.signup($scope.email, $scope.password, $scope.firstName, $scope.lastName, $scope.blogUrl).then(function(new_user) {
				$location.path('/home');
				console.log("success!", new_user);
			}).catch(function(err) {
				$scope.error = err.message;
			});
		};

});//end 