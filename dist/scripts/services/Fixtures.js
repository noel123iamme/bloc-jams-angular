(function() {
  function Fixtures() {
    var Fixtures = {};

    // Example Album
    var albumPicasso = {
        id: '01',
        title: 'The Colors',
        artist: 'Pablo Picasso',
        label: 'Cubism',
        year: '1881',
        albumArtUrl: '/assets/images/album_covers/01.png',
        songs: [
            { title: 'Blue', duration: 161.71, audioUrl: '/assets/music/blue' },
            { title: 'Green', duration: 103.96, audioUrl: '/assets/music/green' },
            { title: 'Red', duration: 268.45, audioUrl: '/assets/music/red' },
            { title: 'Pink', duration: 153.14, audioUrl: '/assets/music/pink' },
            { title: 'Magenta', duration: 374.22, audioUrl: '/assets/music/magenta' }
        ]
    };

    // Another Example Album
    var albumMarconi = {
        id: '20',
        title: 'The Telephone',
        artist: 'Guglielmo Marconi',
        label: 'EM',
        year: '1909',
        albumArtUrl: '/assets/images/album_covers/20.png',
        songs: [
            { title: 'Hello, Operator?', duration: '1:01' },
            { title: 'Ring, ring, ring', duration: '5:01' },
            { title: 'Fits in your pocket', duration: '3:21'},
            { title: 'Can you hear me now?', duration: '3:14' },
            { title: 'Wrong phone number', duration: '2:15'}
        ]
    };

    // 3rd Album
    var albumPop = {
        id: '21',
        title: 'Pop! Goes the Weasel',
        artist: 'Nursery Rhymes',
        label: 'Kids',
        year: '1853',
        albumArtUrl: '/assets/images/album_covers/21.png',
        songs: [
            { title: 'Up and down the City Road', duration: '1:01' },
            { title: 'In and out the Eagle', duration: '5:01' },
            { title: 'That\'s the way the money goes', duration: '3:21'},
            { title: 'Jack in the box', duration: '3:14' },
            { title: 'London Bridge', duration: '2:15'}
        ]
    };

    Fixtures.getAlbum = function(pageID) {
      var album = angular.copy(albumPicasso);
      console.log(pageID);
      album.id = pageID;
      album.albumArtUrl = '/assets/images/album_covers/' + pageID + '.png';
      console.log(album);
      
      return album;  
    };
    
    Fixtures.getCollection = function(numberOfAlbums) {
      var albums = [];
      var sPad = '0';
      for (var i = 0; i < numberOfAlbums; i++) {
        if (i >= 9) {sPad = ''}
        albums.push(angular.copy(albumPicasso));
        albums[i].id = sPad + (i + 1);
        albums[i].albumArtUrl = '/assets/images/album_covers/' + sPad + (i + 1) + '.png';
      }
      return albums;
    };
    
    return Fixtures;
  }
  
  angular
    .module('blocJams')
    .factory('Fixtures', Fixtures);
})();
