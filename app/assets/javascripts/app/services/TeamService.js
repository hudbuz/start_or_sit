app
  .service('TeamService',function($http, Auth) {


      this.getTeam = function() {

        console.log('f')
       if (Auth.currentUser().$$state.status === 1){
       return $http.get('http://start-or-sit.herokuapp.com/teams/'+Auth.currentUser().$$state.value.id+'.json')
      }

    }
      this.createTeam = function(id, data) {

        return $http.patch('http://start-or-sit.herokuapp.com/teams/'+id, data)
      }

      this.switchPlayer = function(id, player) {
        return $http.patch('http://start-or-sit.herokuapp.com/teams/'+id, player)
      }



    })
