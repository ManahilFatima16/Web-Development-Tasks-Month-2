// ====== Songs List ======
const songs = [
  { name: "Zara Sa", file: "songs/song1.mp3", category: "romantic" },
  { name: "Tum Mile", file: "songs/song2.mp3", category: "romantic" },
  { name: "I Think They Call This Love", file: "songs/song3.mp3", category: "pop" },
  { name: "Let Me Down Slowly", file: "songs/song4.mp3", category: "pop" }
];


// ====== Variables ======
let currentSongIndex = 0;
let audio = document.getElementById("audio"); // make sure your HTML has <audio id="audio">
let playlist = document.getElementById("playlist"); // <ul id="playlist">
let searchBox = document.getElementById("searchBox"); // <input id="searchBox">
let categoryFilter = document.getElementById("categoryFilter"); // <select id="categoryFilter">
let volumeControl = document.getElementById("volumeControl"); // <input type="range" id="volumeControl">

// ====== Display Playlist ======
function displaySongs(songList) {
    playlist.innerHTML = "";
    songList.forEach((song, index) => {
        let li = document.createElement("li");
        li.textContent = song.name + " (" + song.category + ")";
        li.onclick = () => playSong(index);

        // Highlight currently playing song
        if (index === currentSongIndex) {
            li.style.fontWeight = "bold";
            li.style.color = "green";
        }

        playlist.appendChild(li);
    });
}

// Initial load
displaySongs(songs);

// ====== Play Song ======
function playSong(index) {
    currentSongIndex = index;
    audio.src = songs[index].file;
    audio.play();
    displaySongs(songs); // update highlighting
}

// ====== Play / Pause ======
function playPause() {
    if (!audio.src) {
        playSong(currentSongIndex);
    } else if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

// ====== Next / Previous Song ======
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
}

// ====== Volume Control ======
volumeControl.addEventListener("input", function() {
    audio.volume = volumeControl.value;
});

// ====== Search Functionality ======
searchBox.addEventListener("input", function() {
    let value = searchBox.value.toLowerCase();
    let filtered = songs.filter(song =>
        song.name.toLowerCase().includes(value)
    );
    displaySongs(filtered);
});

// ====== Category Filter ======
categoryFilter.addEventListener("change", function() {
    let category = categoryFilter.value;
    if (category === "all") {
        displaySongs(songs);
    } else {
        let filtered = songs.filter(song => song.category === category);
        displaySongs(filtered);
    }
});

// ====== Auto Play Next ======
audio.addEventListener("ended", function() {
    nextSong();
});
