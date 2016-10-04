

function authCtrl($scope, $state, Auth){

    $scope.login = function() {
        Auth.login($scope.user).then(function(){
            $state.go('home.team');
        });
    };

    $scope.register = function() {
        Auth.register($scope.user).then(function(){
            $state.go('home.team');
        });
    }

}

    angular
        .module('app')
        .controller('authCtrl', authCtrl)

