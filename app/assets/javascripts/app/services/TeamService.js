(function() {
  

    function TeamService($http) {


      this.getTeam = function(id) {
       return $http.get('http://localhost:3000/team/'+id)
      }
      this.createTeam = function() {
        return $http.post('http://localhost:3000/teams')
      }



    }

angular 
  .module('app')
  .service('TeamService', TeamService)




}())