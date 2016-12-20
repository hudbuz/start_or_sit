app.controller('authCtrl',function($scope, $state, Auth){


    $scope.login = function() {
        Auth.login($scope.user).then(function(){
            $state.go('team');
        });
    };

    $scope.register = function() {
        Auth.register($scope.user).then(function(){

            $state.go('team');
        });
    }

})
