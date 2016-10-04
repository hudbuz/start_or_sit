(function() {
  
function TeamController($scope, Auth) {

  var team = this


  Auth.currentUser()
    .then(function(user){
      console.log(user)
      team.user = user
     
    })

    debugger
  
  



}





angular
  .module('app')
  .controller('TeamController', TeamController)

}())