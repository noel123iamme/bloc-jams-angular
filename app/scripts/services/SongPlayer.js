(function() {
  function SongPlayer(Fixtures) {
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
    
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
