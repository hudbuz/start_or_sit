(function() {


  function IndexService($http) {

    this.getIndices = function() {

      return $http.get('http://localhost:3000/indices.json')
    }
  }

angular
  .module('app')
  .service('IndexService', IndexService)




}())