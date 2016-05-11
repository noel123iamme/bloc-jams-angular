(function() {
  function SongPlayer($rootScope, Fixtures) {
    var SongPlayer = {};
    
    /*---------------------------------------------------------------------------------
    * @desc Current album object
    * @type {Object} album
    -----------------------------------------------------------------------------------*/
    var currentAlbum = Fixtures.getAlbum();
    
    /*---------------------------------------------------------------------------------
    * @desc Buzz object audio file
    * @type {Object}
    -----------------------------------------------------------------------------------*/
    var currentBuzzObject = null;
    
    /*---------------------------------------------------------------------------------
    * @function getSongIndex
    * @desc Get index of current song in current albumn
    * @param {Object} song
    -----------------------------------------------------------------------------------*/
    var getSongIndex = function(song) {
      song = song || SongPlayer.currentSong;
      return currentAlbum.songs.indexOf(song);  
    }
    
    /*---------------------------------------------------------------------------------
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    -----------------------------------------------------------------------------------*/
    var setSong = function(song) {
      song = song || SongPlayer.currentSong;
      stopCurrentSong();

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime();
        });
      });

      SongPlayer.currentSong = song;
    };
    
    /*---------------------------------------------------------------------------------
    * @function playSong
    * @desc Starts playing song
    * @param {Object} song
    -----------------------------------------------------------------------------------*/
    var playSong = function(song) {
      song = song || SongPlayer.currentSong;

      if (currentBuzzObject) {
        currentBuzzObject.play();
        song.playing = true;
      }
    };
    
    /*---------------------------------------------------------------------------------
    * @function stopSong
    * @desc Stops playing song
    * @param {Object} song
    -----------------------------------------------------------------------------------*/
    var stopCurrentSong = function() {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = false;
      }
    };
    
   /*---------------------------------------------------------------------------------
    * @desc Active song object from list of songs
    * @type {Object}
    -----------------------------------------------------------------------------------*/
    SongPlayer.currentSong = null;
    
   /*---------------------------------------------------------------------------------
    * @desc Current playing time of active song object from list of songs
    * @type {Object}
    -----------------------------------------------------------------------------------*/
    SongPlayer.currentTime = null;
    
   /*---------------------------------------------------------------------------------
    * @desc Volume of playing song object from list of songs
    * @type {Object}
    -----------------------------------------------------------------------------------*/
    SongPlayer.volume = null;
    
   /*---------------------------------------------------------------------------------
    * @desc Active album object artist
    * @type {Object}
    -----------------------------------------------------------------------------------*/
    SongPlayer.currentSongArtist = currentAlbum.artist;
    
    /*---------------------------------------------------------------------------------
    * @function play
    * @desc Sets and starts playing current song 
    * @param {Object} song
    -----------------------------------------------------------------------------------*/
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };
    
    /*---------------------------------------------------------------------------------
    * @function pause
    * @desc Stops currently playing song
    * @param {Object} song
    -----------------------------------------------------------------------------------*/
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    
    /*---------------------------------------------------------------------------------
    * @function previous
    * @desc Stops currently playing song and plays previous song
    * @param {Object} song
    -----------------------------------------------------------------------------------*/
    SongPlayer.previous = function(song) {
      song = song || SongPlayer.currentSong;

      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if (currentSongIndex < 0) {
         stopCurrentSong();
      } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
      }
    };
    
    /*---------------------------------------------------------------------------------
    * @function next
    * @desc Stops currently playing song and plays previous song
    * @param {Object} song
    -----------------------------------------------------------------------------------*/
    SongPlayer.next = function(song) {
      song = song || SongPlayer.currentSong;

      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if (currentSongIndex > currentAlbum.songs.length) {
         stopCurrentSong();
      } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
      }
    };

    /**
    * @function setCurrentTime
    * @desc Set current time (in seconds) of currently playing song
    * @param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };
    
    /**
    * @function setVolume
    * @desc Set volume of currently playing song
    * @param {Number} volume
    */
    SongPlayer.setVolume = function(volume) {
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume);
      }
    };
    
    /**
    * @function timeCode
    * @desc Formats time in seconds to mm:ss
    * @param {seconds} 
    */
    SongPlayer.timeCode = function(seconds) {
      if (Number.isNaN(seconds)) {
        return "-:--";
      }
      if (currentBuzzObject) {
        return buzz.toTimer(seconds);
      }
    };
    
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
