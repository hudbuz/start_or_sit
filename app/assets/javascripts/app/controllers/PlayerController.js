(function(){
  
function PlayerController($scope, $filter, position, PlayerService, $timeout, TeamService, Auth, $rootScope) {

 
   
    var player = this
    player.data = $scope.$parent.team.players
    player.current_week = 6
    player.left = ""
    player.stock = ""

    player.right = ""
    player.rstock = ""
    player.left['clicked'] = false
    player.right['clicked'] = false
    player.statTable = $scope.$parent.team.statTable
    player.filteredList = $filter('filter')(player.data, position)
    player.comapred = false
    player.substitute = false


    player.searchFilter = function($event) {
  
      var search = $filter('filter')(player.filteredList, player.right)[0]
     
      player.right = search

      player.rstock = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+player.right.esbid+'.png'
      player.listStats('right')
      // PlayerService.getPlayer(search[0].player_id).then(function(resp){
       
      //  
      //   player.listStats()

      // })
    
    }

    player.listStats = function(side) {
          
    var stats = {}
        
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
        player[side]['opponent'] = {}
        player[side]['opponent']['name'] = fullStats['weeks'][player.current_week-1].opponent
        PlayerService.getRank(player[side]['opponent']['name']).then(function(resp) {
            player[side]['opponent']['rank'] = resp.data

        })
        
        
        
               
    })
     }
     for (i = 0; i < $scope.$parent.team.lineup.length; i ++) {
         if ($scope.$parent.team.lineup[i].position === position){
            player.left = $scope.$parent.team.lineup[i]
             player.stock = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+player.left.esbid+'.png'
             player.listStats('left')
         }
     }


     player.start_or_sit = function() {
  
        
        var lscore = (player.left.opponent.rank/16 * (player.left.season_points/player.left.stats['Games Played']) + player.left.season_projected_points/16 + player.left.week_projected_points)/3
        var rscore = (player.right.opponent.rank/16 * (player.right.season_points/player.right.stats['Games Played']) + player.right.season_projected_points/16 + player.right.week_projected_points)/3
        player.left['sosScore'] = lscore
        player.right['sosScore'] = rscore
        if (lscore > rscore) {
            $('#left').css({
        'background-color': '#90EE90'
      
               });
        }
            else{
                $('#right').css({
        'background-color': '#90EE90'
       
    })
              
            }
            player.substitute = true
        player.compared = true
        debugger

     }

     player.switchPlayer = function(position) {
        
        TeamService.switchPlayer(Auth.currentUser().$$state.value.id, player[position]).then(function(resp){
            
            $rootScope.$emit('changeLineup', resp);
            
        })


     }
    
  
}

angular 
  .module('app')
  .controller('PlayerController', PlayerController)

}())