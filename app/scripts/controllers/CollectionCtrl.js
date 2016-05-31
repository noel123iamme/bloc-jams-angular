(function() {
  function CollectionCtrl(Fixtures) {
    this.albums = Fixtures.getCollection(21);
  }

  angular
    .module('blocJams')
    .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
})();
