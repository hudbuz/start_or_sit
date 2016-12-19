angular
  .module('app', ['ui.router', 'templates', 'Devise','ui.bootstrap'])
  .config(function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
      })
      .state('compare', {
        url: '/compare',
        templateUrl: 'compare.html',
        controller: 'CompareController as player',
        resolve: {
          players: function(PlayerService, $http){
            return PlayerService.getPlayers()
          },
          indexTable: function(IndexService, $http) {
          return IndexService.getIndices()
        }
      }})
      .state('login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'authCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('team');
          })
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/register.html',
        controller: 'authCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('team');
          })
        }]
})

    .state('team', {
      url: '/team',
      templateUrl: 'team/team.html',
      controller: 'TeamController as team',
      resolve: {
        userTeam: function(TeamService, $http){

          return TeamService.getTeam()
        },
        players: function(PlayerService, $http){
          return PlayerService.getPlayers()
        },
        indexTable: function(IndexService, $http) {
        return IndexService.getIndices()
      }


      }
    })
    .state('team.qb', {
      url: '/qb',
      templateUrl: 'players/qb.html',
      controller: 'PlayerController as player',
      resolve: {


      position: function() {
        return "QB"
      }
    }
    })
    .state('team.rb', {
      url: '/rb',
      templateUrl: 'players/rb.html',
      controller: 'PlayerController as player',
      resolve: {


      position: function() {
        return "RB"
      }
    }
    })
    .state('team.wr', {
      url: '/wr',
      templateUrl: 'players/wr.html',
      controller: 'PlayerController as player',
      resolve: {


      position: function() {
        return "WR"
      }
    }
    })
    .state('team.te', {
      url: '/te',
      templateUrl: 'players/te.html',
      controller: 'PlayerController as player',
      resolve: {


      position: function() {
        return "TE"
      }
    }
    })
    //  .state('team.k', {
    //   url: '/k',
    //   templateUrl: 'players/k.html',
    //   controller: 'PlayerController as player',
    //   resolve: {
    //
    //
    //   position: function() {
    //     return "K"
    //   }
    // }
    // })
    .state('team.players', {
      url: '/players/qb',
      templateUrl: 'players/index.html',
      controller: 'PlayerController as player',
      resolve: {


      position: function() {
        return "QB"
      }
    }
    })


      // $urlRouterProvider.otherwise('/compare');


  })
