app.
  service('IndexService',function($http) {

    this.getIndices = function() {

      return $http.get('http://localhost:3000/indices.json')
    }
  })
