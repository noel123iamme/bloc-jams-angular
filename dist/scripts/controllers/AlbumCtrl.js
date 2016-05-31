(function() {
  function AlbumCtrl($scope, $state, $stateParams, Fixtures, SongPlayer) {
    var pageID = $stateParams.pageID;
    console.log(pageID);
    this.albumData = Fixtures.getAlbum(pageID);
    this.songPlayer = SongPlayer;
  }

  angular
    .module('blocJams')
    .controller('AlbumCtrl', ['$scope','$state', '$stateParams', 'Fixtures', 'SongPlayer', AlbumCtrl]);
})();
