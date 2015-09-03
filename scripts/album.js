 // Example Album
 var albumPicasso = {
     name: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { name: 'Blue', length: '4:26' },
         { name: 'Green', length: '3:14' },
         { name: 'Red', length: '5:01' },
         { name: 'Pink', length: '3:21'},
         { name: 'Magenta', length: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     name: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { name: 'Hello, Operator?', length: '1:01' },
         { name: 'Ring, ring, ring', length: '5:01' },
         { name: 'Fits in your pocket', length: '3:21'},
         { name: 'Can you hear me now?', length: '3:14' },
         { name: 'Wrong phone number', length: '2:15'}
     ]
 };
 
// Third Example Album - checkpoint 25 assignment
 var albumLadyGaga = {
     name: 'The Fame Monster',
     artist: 'Lady Gaga',
     label: 'Interscope',
     year: '2009',
     albumArtUrl: 'assets/images/album_covers/22.png',
     songs: [
         { name: 'Bad Romance', length: '4:54' },
         { name: 'Alejandro', length: '4:34' },
         { name: 'Monster', length: '4:10'},
         { name: 'Speechless', length: '4:31' },
         { name: 'Dance in the Dark', length: '4:49'},
			 	 { name: 'Telephone', length: '3:41'},
			   { name: 'So Happy I Could Die', length: '3:55'},
			   { name: 'Teeth', length: '3:41'}
     ]
 };


 var createSongRow = function(songNumber, songName, songLength) {
     
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 
 };
 
 var setCurrentAlbum = function(album) {
 
     // #1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     // #2
     albumTitle.firstChild.nodeValue = album.name;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // #3
     albumSongList.innerHTML = '';
 
     // #4
     for (i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
     }
 
 };
 
 window.onload = function() {
   
     setCurrentAlbum(albumladyGaga);
     
 };

// Album cover shuffle - checkpoint 25 

var albumCover = document.getElementsByClassName('album-cover-art')[0]; // album image object

albumArray = [albumPicasso, albumMarconi, albumLadyGaga]; // array of albums

//var rand = albumArray[Math.floor(Math.random() * albumArray.length)] // variable which holds a random album from the album array - not needed for refactor!

var index = 1;

var shuffleAlbums = function () {
	setCurrentAlbum(albumArray[index]);
	index++;
	if (index == albumArray.length) {
		index = 0;
	}
}; // function which loads a random album

albumCover.addEventListener("click", shuffleAlbums); // event listener which loads the next album when the album cover is clicked

// Revised attempt after watching the video!