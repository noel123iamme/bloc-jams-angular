(function() {
  function config($stateProvider, $locationProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });
    
    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: '/templates/landing.html'
      })
//      .state('collection', {
//        url: '/',
//        templateUrl: '/templates/collection.html'
//      })
      .state('album', {
        url: '/',
        templateUrl: '/templates/album.html'
      });
  }
  
  angular
    .module('blocJams', ['ui.router'])
    .config(config);
})();
