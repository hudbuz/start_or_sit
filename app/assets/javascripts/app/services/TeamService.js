(function() {
  

    function TeamService($http, Auth) {


      this.getTeam = function() {
       if (Auth.currentUser().$$state.status === 1){
       return $http.get('http://localhost:3000/teams/'+Auth.currentUser().$$state.value.id+'.json')
      }
      
    }
      this.createTeam = function() {
        return $http.post('http://localhost:3000/teams')
      }



    }

angular 
  .module('app')
  .service('TeamService', TeamService)




}())