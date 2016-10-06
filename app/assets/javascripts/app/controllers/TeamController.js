(function() {
  
function TeamController($scope, Auth, userTeam, $state, $$state, players, $filter, TeamService) {

  var team = this
  team.user = {}
  team.lineup = userTeam.data
  team.qb = {}
  team.rb = {}
  team.wr = {}
  team.te = {}
  team.players = players.data
 


  team.authorize = function() {
    
  if (Auth.currentUser().$$state.status === 1) {
    
    team.user = Auth.currentUser().$$state.value

  }
  else {
 
    $state.go('login')
  }
}

  team.searchFilter = function(position) {
   var filtered =  $filter('filter')(team.players, position.toUpperCase())
    var searchedPlayer = $filter('filter')(filtered, team[position])
    team[position] = searchedPlayer[0]
    team[position]['img_url'] = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+searchedPlayer[0].esbid+'.png'
   
    
  }

  team.createTeam = function() {

    debugger
    resp = TeamService.createTeam(team.lineup.id, team)
  }

   

  

  team.authorize()

}





angular
  .module('app')
  .controller('TeamController', TeamController)

}())