(function(){
  
function PlayerController(players, $filter, position, PlayerService) {

   
   
    var player = this
    player.data = players.data
    

    player.left = ""
    player.left.stock = ""
    player.right = ""
    player.searchedList = []


    player.filteredList = $filter('filter')(player.data, position)


    player.searchFilter = function() {
     
      search = $filter('filter')(player.filteredList, player.left)
      PlayerService.getPlayer(search[0].player_id).then(function(resp){
       
        player.searchedList = resp.data.players[0]
        player.stock = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+player.searchedList.esbid+'.png'
     

      })
    
    }
    


}

angular 
  .module('app')
  .controller('PlayerController', PlayerController)

}())