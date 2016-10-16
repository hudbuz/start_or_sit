function teambar($rootScope) {

return {
  templateUrl: 'team/teambar.html',
  link: function($rootscope) {
    $rootscope.on('newLineup', function(event, data){
      debugger
    })
  }



}






}

angular
  .module('app')
  .directive('teambar', teambar)
