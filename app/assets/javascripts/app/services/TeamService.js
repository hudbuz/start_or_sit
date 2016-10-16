(function() {
  

    function TeamService($http, Auth) {


      this.getTeam = function() {
       if (Auth.currentUser().$$state.status === 1){
       return $http.get('http://localhost:3000/teams/'+Auth.currentUser().$$state.value.id+'.json')
      }
      
    }
      this.createTeam = function(id, data) {
        
        return $http.patch('http://localhost:3000/teams/'+id, data)
      }

      this.switchPlayer = function(id, player) {
        return $http.patch('http://localhost:3000/teams/'+id, player)
      }



    }

angular 
  .module('app')
  .service('TeamService', TeamService)




}())