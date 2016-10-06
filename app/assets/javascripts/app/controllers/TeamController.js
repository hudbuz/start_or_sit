(function() {
  
function TeamController($scope, Auth, userTeam, $state, $$state) {

  var team = this
  team.user = {}
  team.user.lineup = userTeam

  team.authorize = function() {

  if (Auth.currentUser().$$state.status > 0) {
    
    team.user = Auth.currentUser().$$state.value

  }
  else {
 
    $state.go('login')
  }
}



   
  
  

  team.authorize()

}





angular
  .module('app')
  .controller('TeamController', TeamController)

}())