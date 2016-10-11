function stats() {
  return {
  templateUrl: 'stats/stats.html',
  bindings: {
    label: '='
  }

}
}

angular
  .module('app')
  .directive('stats', stats)