var app = angular.module('blog-hopper');


app.controller('loginCtrl', function($scope) {

    $scope.userInput = true;
    $scope.toggle1 = function() {
        $scope.userInput = !$scope.userInput;
    }
    $scope.bloggerInput = true;
    $scope.toggle2 = function() {
        $scope.bloggerInput = !$scope.bloggerInput;
    }

});//end

 