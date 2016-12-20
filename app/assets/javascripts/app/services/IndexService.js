app.
  service('IndexService',function($http) {

    this.getIndices = function() {

      return $http.get('http://start-or-sit.herokuapp.com/indices.json')
    }
  })
