angular
  .module('app', ['ui.router', 'templates', 'Devise'])
  .config(function($stateProvider, $urlRouterProvider){

    $stateProvider
    .state('home', {
      url: '/', 
      templateUrl: 'home.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/login.html',
        controller: 'authCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home.team');
          })
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: 'register.html',
        controller: 'authCtrl',
        onEnter: ['$state', 'Auth', function($state, Auth) {
          Auth.currentUser().then(function (){
            $state.go('home.team');
          })
        }]
})

    .state('home.team', {
      url: 'team', 
      templateUrl: 'team/team.html', 
      controller: 'TeamController as team'
    })
    .state('home.qb', {
      url: 'qb', 
      templateUrl: 'players/qb.html', 
      controller: 'PlayerController as player',
      resolve: {
        players: function(PlayerService, $http){
         
          return PlayerService.getPlayers()
          

      }, 
      position: function() {
        return "QB"
      }
    }
    })
    .state('home.rb', {
      url: 'rb', 
      templateUrl: 'players/rb.html',
      controller: 'PlayerController as player',
      resolve: {
        players: function(PlayerService, $http){
          
          return PlayerService.getPlayers()
          
      }, 
      position: function() {
        return "RB"
      }
    }
    })
    .state('home.wr', {
      url: 'wr', 
      templateUrl: 'players/wr.html',
      controller: 'PlayerController as player',
      resolve: {
        players: function(PlayerService, $http){
          
          return PlayerService.getPlayers()
          
      }, 
      position: function() {
        return "WR"
      }
    }
    })
    .state('home.te', {
      url: 'te', 
      templateUrl: 'players/te.html',
      controller: 'PlayerController as player',
      resolve: {
        players: function(PlayerService, $http){
          
          return PlayerService.getPlayers()
          
      }, 
      position: function() {
        return "TE"
      }
    }
    })


       $urlRouterProvider.otherwise('/');


  })
