(function(){
  
function PlayerController($scope, $filter, position, PlayerService) {

 
   
    var player = this
    player.data = $scope.$parent.team.players
    player.current_week = 6

    player.left = ""
    player.stock = ""
 
   
    for (i = 0; i < $scope.$parent.team.lineup.length; i ++) {
         if ($scope.$parent.team.lineup[i].position === position){
            player.left = $scope.$parent.team.lineup[i]
             player.stock = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+player.left.esbid+'.png'
         }
     }
     debugger
    
  
    player.right = ""
    player.rstock = ""
    
    
    player.checked = false

    player.statTable = $scope.$parent.team.statTable
  

    player.filteredList = $filter('filter')(player.data, position)


    player.searchFilter = function($event) {
     
      var search = $filter('filter')(player.filteredList, player.right)[0]
     
      player.right = search

      player.rstock = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+player.right.esbid+'.png'
      // PlayerService.getPlayer(search[0].player_id).then(function(resp){
       
      //  
      //   player.listStats()

      // })
    
    }

    player.listStats = function(side) {
        
      var stats = {}
        debugger
      PlayerService.getPlayer(player[side].player_id).then(function(resp){
        fullStats = resp.data.players[0]
        for (i = 0; i < fullStats.weeks.length; i++ ) {
              for (k = 0; k < Object.keys(fullStats.weeks[i].stats).length; k ++) {
        

                var keys = Object.keys(fullStats.weeks[i].stats)
                
                if (stats[keys[k]] !== undefined) {
                  
                  stats[keys[k]] = parseInt(stats[keys[k]]) + parseInt(fullStats.weeks[i].stats[keys[k]])
                }
                else{
                  
                  stats[keys[k]] = parseInt(fullStats.weeks[i].stats[keys[k]])
                }

              }
         
        }
     
        var namedStats = {}
     
        var keys = Object.keys(stats)
        for (i = 0; i < keys.length; i ++) {
        
          namedStats[player.statTable[keys[i]-1].name] = stats[keys[i]]
        }

        player[side]['stats'] = namedStats
        
        player.checked = true

        debugger
    })
     }


     player.start_or_sit = function() {

        var left = player.left
        var right = player.right
        debugger
        if (left.stats === undefined) {
            player.listStats('left')
        }
        if (right.stats === undefined) {
            player.listStats('right')
        }

        if (left.week_projected_points > right.week_projected_points) {
            $('#left').css({
        'background-color': 'green'
      
    });
        }

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