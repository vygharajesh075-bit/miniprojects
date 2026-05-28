let songs = [
    {
        name: "Song 1",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        name: "Song 2",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    }
];

let current = 0;
let audio = document.getElementById("audio");

function loadSong(index) {
    audio.src = songs[index].url;
    document.getElementById("songTitle").innerText = songs[index].name;
}

function playSong() {
    audio.play();
}

function pauseSong() {
    audio.pause();
}

function nextSong() {
    current = (current + 1) % songs.length;
    loadSong(current);
    playSong();
}

function prevSong() {
    current = (current - 1 + songs.length) % songs.length;
    loadSong(current);
    playSong();
}

loadSong(current);