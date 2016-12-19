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
      team.organizePlayers(data.data.players)




    }

  })

}
team.organizePlayers = function(playerArray){
  team.lineup = ['','','','','','']
  for (i = 0; i < playerArray.length; i ++){
    if (playerArray[i]['position'] === 'QB'){
      team.lineup[0] = playerArray[i]
    }
    else if (playerArray[i]['position'] === 'RB'){
      team.lineup[1] = playerArray[i]
    }
    else if (playerArray[i]['position'] === 'WR'){
      team.lineup[2] = playerArray[i]
    }
    else if (playerArray[i]['position'] === 'TE'){
      team.lineup[3] = playerArray[i]
    }
    else if (playerArray[i]['position'] === 'K'){
      team.lineup[4] = playerArray[i]
    }
    else if (playerArray[i]['position'] === 'DEF'){
      team.lineup[5] = playerArray[i]
    }
  }
}


team.setUp()


  team.qb = {}
  team.rb = {}
  team.wr = {}
  team.te = {}
  team.k = {}
  team.def = {}
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

    team.organizePlayers(data.data.players)


    });






}





angular
  .module('app')
  .controller('TeamController', TeamController)

}())
