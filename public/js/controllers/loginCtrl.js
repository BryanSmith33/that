angular.module('blog-hopper').controller('loginCtrl',['$scope', function($scope) {

        $scope.custom2 = true;
        $scope.toggle1 = function() {
            $scope.custom2 = !$scope.custom2;
        };
        $scope.custom1 = true;
        $scope.toggle2 = function() {
            $scope.custom1 = !$scope.custom1;
        };


}]);//end 