(function(){
  
function PlayerController($scope, $filter, position, PlayerService) {

 
   
    var player = this
    player.data = $scope.$parent.team.players
    player.current_week = 6

    player.left = ""
    player.stock = ""
    // for (i = 0; i < $scope.$parent.team.lineup) {
    //     if ($scope.$parent.team.lineup[i].position === position){
    //         player.left = $scope.$parent.team.lineup[i]
    //         player.stock = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+$scope.$parent.lineup[i].esbid+'.png'
    //     }
    // }
  
    player.right = ""
    player.rstock = ""
    player.searchedList = []
    player.stats = []

    player.statTable = $scope.$parent.team.statTable
  

    player.filteredList = $filter('filter')(player.data, position)


    player.searchFilter = function() {
     
      search = $filter('filter')(player.filteredList, player.right)
      PlayerService.getPlayer(search[0].player_id).then(function(resp){
       
        player.searchedList = resp.data.players[0]
        player.rstock = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+player.searchedList.esbid+'.png'
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
    
     // player.setDefault = function() {
      
     //  if ($scope.$parent.team.lineup.players.length > 0) {
     //        debugger
     //    for (i = 0; i < $scope.$parent.team.lineup.players.length; i ++ ){
     //      if ($scope.$parent.team.lineup.players[i].position === position){
     //        debugger
     //        player.left = $scope.$parent.team.lineup.players[i]
     //        player.searchFilter()
     //        player.lstock = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+$scope.$parent.team.players.length[i].esbid+'.png'
     //      }
     //    }
     //  }
     // }

     // player.setDefault()

}

angular 
  .module('app')
  .controller('PlayerController', PlayerController)

}())