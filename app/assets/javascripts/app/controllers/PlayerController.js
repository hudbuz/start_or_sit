(function(){
  
function PlayerController(players, $filter, position, PlayerService, indexTable) {

   
   
    var player = this
    player.data = players.data
    player.current_week = 5

    player.left = ""
    player.left.stock = ""
    player.right = ""
    player.searchedList = []
    player.stats = []

    player.statTable = indexTable.data
  

    player.filteredList = $filter('filter')(player.data, position)


    player.searchFilter = function() {
     
      search = $filter('filter')(player.filteredList, player.left)
      PlayerService.getPlayer(search[0].player_id).then(function(resp){
       
        player.searchedList = resp.data.players[0]
        player.stock = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+player.searchedList.esbid+'.png'
        player.listStats()

      })
    
    }

    player.listStats = function() {
      var stats = {}
        for (i = 0; i < player.searchedList.weeks.length; i++ ) {
              for (k = 0; k < Object.keys(player.searchedList.weeks[i].stats).length; k ++) {
               

                var keys = Object.keys(player.searchedList.weeks[i].stats)
                if (stats[keys[k]] !== undefined) {
                  
                  stats[keys[k]] = parseInt(stats[keys[k]]) + parseInt(player.searchedList.weeks[i].stats[keys[k]])
                }
                else{
                  
                  stats[keys[k]] = parseInt(player.searchedList.weeks[i].stats[keys[k]])
                }

              }
         
        }
        var namedStats = {}
     
        var keys = Object.keys(stats)
        for (i = 0; i < keys.length; i ++) {
        
          namedStats[player.statTable[keys[i]-1].name] = stats[keys[i]]
        }
        
        player.stats = namedStats
     }
    


}

angular 
  .module('app')
  .controller('PlayerController', PlayerController)

}())