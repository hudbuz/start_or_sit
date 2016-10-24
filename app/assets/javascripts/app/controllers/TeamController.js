(function() {
  
function TeamController($scope, Auth, $state, $$state, players, $filter, TeamService, indexTable, $rootScope) {

  var team = this



  team.setUp = function() {
  TeamService.getTeam().then(function(data){
    if (data.status !== 200) {
      $state.go('login')

    }
    else {
      team.user = Auth.currentUser().$$state.value
      team.lineup = data.data.players
    }

  })
}
team.setUp()
  
  team.qb = {}
  team.rb = {}
  team.wr = {}
  team.te = {}
  team['newTeam'] = {}
  team['newTeam']['players'] = {}
  team.players = players.data
  team.statTable = indexTable.data
  team.error = false
 


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
    team['newTeam']['players'][position] = team[position]
    team[position]['img_url'] = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+searchedPlayer[0].esbid+'.png'
   
    
  }

  team.createTeam = function() {
    if ($('.ng-invalid').length !== 0){
    
      team.error = true
    }
    else {
    resp = TeamService.createTeam(team.user.id, team['newTeam'])



    $state.go('team', {}, {reload: true})
  }
  }
  $rootScope.$on('changeLineup', function (event, data) {
    team.lineup = data.data.players
      
        
    });

   

  


}





angular
  .module('app')
  .controller('TeamController', TeamController)

}())