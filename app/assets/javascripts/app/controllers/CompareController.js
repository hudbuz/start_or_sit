

  function CompareController($scope, PlayerService, players, indexTable, $filter){


        var player = this

        var position = null
        player.data = players.data


        player.current_week = 15
        player.left = ""
        player.leftstock = ""

        player.right = ""
        player.rightstock = ""
        player.left['clicked'] = false
        player.right['clicked'] = false
        player.statTable = indexTable.data


        player.filteredList = $filter('filter')(player.data, position)

        player.comapred = false
        player.substitute = false


        player.searchFilter = function(side) {
          var stock = side + 'stock'
          debugger
          if (position === null){
            player.filteredList = player.data
          }
          if (player[side].name === ''){
            player[side] = ""
            player[stock] = ""
            return null
          }
          if (player[side].player_id) {
            var name = player[side].name
            player[side] = {}
            player[stock] = ''
            player[side]['name'] = name

          }

          var search = $filter('filter')(player.filteredList, player[side])[0]

          player[side] = search


          player[stock] = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+player[side].esbid+'.png'
          player.listStats(side)
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
      //    player.setLeft = function() {
       //
      //     var promise = TeamService.getTeam()
      //       promise.then(function(resp){
       //
      //    for (i = 0; i < resp.data.players.length; i ++) {
      //        if (resp.data.players[i].position === position){
      //           player.left = resp.data.players[i]
      //            player.stock = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+player.left.esbid+'.png'
      //            player.listStats('left')
      //        }
      //    }
      //  })}
      //  player.setLeft()


         player.start_or_sit = function() {


            var lscore = (player.left.opponent.rank/16 * (player.left.season_points/player.left.stats['Games Played']) + player.left.season_projected_points/16 + player.left.week_projected_points)/3
            var rscore = (player.right.opponent.rank/16 * (player.right.season_points/player.right.stats['Games Played']) + player.right.season_projected_points/16 + player.right.week_projected_points)/3
            player.left['sosScore'] = lscore
            player.right['sosScore'] = rscore
            if (lscore > rscore) {
                $('#left').addClass('active');
            }
                else{
                    $('#right').addClass('active')

        }


                player.substitute = true
            player.compared = true


         }

         player.switchPosition = function() {
           var buttons = $('.btn-group').children()
           for (i = 0; i < buttons.length; i ++){

             if(buttons[i].classList.contains('active')) {
               buttons[i].classList.remove('active')
             }
           }
           $('.btn-group').children
           if (event.target.textContent === 'All'){
             player.position = null
             player.filteredList = $filter('filter')(player.data, player.position)
           }
           else{
           player.position = event.target.textContent
           player.filteredList = $filter('filter')(player.data, player.position)
         }
         event.target.classList.add('active')
         }

        //  player.switchPlayer = function(side) {
         //
        //     TeamService.switchPlayer(Auth.currentUser().$$state.value.id, player[side]).then(function(resp){
         //
        //         $rootScope.$emit('changeLineup', resp);
        //         for (i = 0; i < resp.data.players.length; i ++) {
         //
        //           if (resp.data.players[i]['position'] === player.left.position){
        //             player.left = resp.data.players[i]
        //             player.stock = 'http://static.nfl.com/static/content/public/static/img/fantasy/transparent/200x200/'+resp.data.players[i]['esbid']+'.png'
        //             player.reset()
        //             player.listStats('left')
        //         }
        //         }
         //
        //     })
         //
         //
        //  }
         player.reset = function() {
           player.left = ""
           player.leftstock = ""
            player.right = ""
            player.rightstock = ""
            player.left['clicked'] = false
            player.right['clicked'] = false
            player.comapred = false
            player.substitute = false
            $('#left').removeClass('active')
            $('#right').removeClass('active')
         }


  }
  angular
    .module('app')
    .controller('CompareController', CompareController)
