//var $ = $; // to override jslint error

// creates the song rows
var createSongRow = function (songNumber, songName, songLength) {
     
	var template =
        '<tr class="album-view-song-item">'
		  + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>';
 
	var $row = $(template); // turns the template into a jquery object

	// when user clicks on a song...
	var clickHandler = function () {

		var songNumber = parseInt($(this).attr('data-song-number'));

		if (currentlyPlayingSongNumber !== null) {
			var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
			currentlyPlayingCell.html(currentlyPlayingSongNumber);
		} 
		
		if (currentlyPlayingSongNumber !== songNumber) {
			$(this).html(pauseButtonTemplate);
			setSong(songNumber - 1);
			currentSoundFile.play();
			$(this).html(pauseButtonTemplate);
			updatePlayerBarSong();

		} else if (currentlyPlayingSongNumber === songNumber) {
			if (currentSoundFile.isPaused()) {
				$(this).html(pauseButtonTemplate);
				$('.left-controls .play-pause').html(playerBarPlayButton);
				currentSoundFile.play();
			}
			else {
				$(this).html(playButtonTemplate);
				$('.left-controls .play-pause').html(playerBarPlayButton);
				currentSoundFile.pause();
			}
		}

	};
 
	// when we hover over a song...
	var onHover = function (event) {
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumberCell.attr('data-song-number')); // Bloc's refactor
		// if it's not already playing, we show the Play button
		if (songNumber !== currentlyPlayingSongNumber) {
			songNumberCell.html(playButtonTemplate);
		}
	}; // ends onHover
 
	// when we nav away a song we were just hovering over...
	var offHover = function (event) {
		var songNumberCell = $(this).find('.song-item-number');
		var songNumber = parseInt(songNumberCell.attr('data-song-number')); // Bloc's refactor
		// if it's not the currently playing song we just show the song # again.
		if (songNumber !== currentlyPlayingSongNumber) {
			songNumberCell.html(songNumber);
		}
	}; // ends offHover
 
	// instantiates all the methods written above
	$row.find('.song-item-number').click(clickHandler);
	$row.hover(onHover, offHover);

	return $row;

}; // ends createSongRow!
	 
// creates the album object using data from fixtures.js
var setCurrentAlbum = function (album) {
	 
	currentAlbum = album;
	
 	// captures all of the album info & converts it to jQuery objects
	var $albumTitle = $('.album-view-title');
	var $albumArtist = $('.album-view-artist');
	var $albumReleaseInfo = $('.album-view-release-info');
	var $albumImage = $('.album-cover-art');
	var $albumSongList = $('.album-view-song-list');
	 
	$albumTitle.text(album.name);
	$albumArtist.text(album.artist);
	$albumReleaseInfo.text(album.year + ' ' + album.label);
	$albumImage.attr('src', album.albumArtUrl);
 
	$albumSongList.empty(); // instantiating an empty song list
 
	 // Build list of songs from album JavaScript object
	for (i = 0; i < album.songs.length; i++) {
		var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
		$albumSongList.append($newRow);
		// filling out the song list
	}
 
}; // ends setCurrentAlbum


// simple method for returning the index of a song within an album
var trackIndex = function (album, song) {
	return album.songs.indexOf(song);
};

// checkpoint 32 assignment - function to retrieve the song number cell
var getSongNumberCell = function (number) {

	return $('.song-item-number[data-song-number="' + number + '"]'); // brackets allow you to select attributes of a specific kind
};

// sets song and instantiates music
var setSong = function (number) {
	if (currentSoundFile) {
		currentSoundFile.stop();
	}

	currentlyPlayingSongNumber = parseInt(number + 1);
	currentSongFromAlbum = currentAlbum.songs[number];
	
	currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         formats: [ 'mp3' ],
         preload: true
	});
	
setVolume(currentVolume);
	
}; // ends setSong
 
 var setVolume = function(volume) {
	 
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
	 
 }; // ends setVolume

// updates the player bar per the current song being played
var updatePlayerBarSong = function () {

    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
	};

// ALbum button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

 // Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null
var currentSoundFile = null;
var currentVolume = 80;

 // Player bar element selectors
var $previousButton = $('.left-controls .previous');
var $nextButton = $('.left-controls .next');


// function for user to skip to the next song in the list using the player bar button
var nextSong = function () {
	
var indexOfNextSong = trackIndex(currentAlbum, currentSongFromAlbum) + 1;
    
if (indexOfNextSong >= currentAlbum.songs.length) {
	indexOfNextSong = 0;
}	
	
    var getLastSongNumber = function (index) {
        return index === 0 ? currentAlbum.songs.length : index;
			};
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Incrementing the index
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
			currentSongIndex = 0;
    }
    
    // Set a new current song
	setSong(indexOfNextSong);
	currentSoundFile.play();
	
    // Update the Player Bar information
	updatePlayerBarSong();

	
		// updates all the pertinent variables
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
		
	}; // ends nextSong

// function for user to skip to the previous song in the list using the player bar button
var previousSong = function () {
    
    // Note the difference between this implementation and the one in nextSong()
    var getLastSongNumber = function (index) {
        return index === (currentAlbum.songs.length - 1) ? 1 : index + 2;
			};
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Decrementing the index
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
			currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
	setSong(currentSongIndex);	
//	currentlyPlayingSongNumber = currentSongIndex + 1;
//	currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
	
		// Play the current sound file
	currentSoundFile.play();

    // Update the Player Bar information
    updatePlayerBarSong();
	
    // updates all the pertinent variables
		var lastSongNumber = getLastSongNumber(currentSongIndex);
		var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
		var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
	$previousSongNumberCell.html(pauseButtonTemplate);
	$lastSongNumberCell.html(lastSongNumber);
    	
}; // ends previousSong

// checkpoint 33 assignment
var togglePlayFromPlayerBar = function () {
	
	var $PlayPauseButton = $('.left-controls .play-pause');
	
	if (currentSoundFile.isPaused() && $PlayPauseButton.html === playerBarPlayButton ) { // if song is paused and play button clicked in player bar
		currentlyPlayingCell.html(pauseButtonTemplate); // change song number cell from play to pause
		$('.left-controls .play-pause').html(playerBarPauseButton); // change HTML of player bar's play button to a pause button
	}
	else { // if song is playing and the pause button is clicked
		currentlyPlayingCell.html(playButtonTemplate); // change song number cell from pause to play
		$('.left-controls .play-pause').html(playerBarPlayButton); // change HTML of player bar's pause button to a play button
	}
};

// when document loads, set up the album
$(document).ready(function () {
	 
	setCurrentAlbum(albumPicasso);
	$previousButton.click(previousSong);
	$nextButton.click(nextSong);
	$('.left-controls .play-pause').html(playerBarPauseButton);

});