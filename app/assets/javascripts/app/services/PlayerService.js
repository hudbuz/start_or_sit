app
  .service('PlayerService', function($http) {


    this.getPlayers = function() {

    return $http.get('http://localhost:3000/players')


    }

    this.getStock = function(id) {

      return 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+id+'.png'
    }

    this.getPlayer = function(id) {

      return $http.get('http://api.fantasy.nfl.com/v1/players/details?playerId='+id+'&statType=seasonStatsformat=json')

    }

    this.getRank = function(id) {

      return $http.get('http://localhost:3000/players/'+id)
    }





  })
