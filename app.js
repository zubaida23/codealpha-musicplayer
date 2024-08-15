let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');

let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let updateTimer;

const music_list = [
    {
        img: 'images/stay.png',   // Image path
        name: 'Stay',
        artist: 'The Kid LAROI, Justin Bieber',
        music: 'music/music_stay.mp3'   // Music file path
    },
    {
        img: 'images/fallingdown1.jpg',
        name: 'Falling Down',
        artist: 'Wid Cards',
        music: 'music/music_fallingdown.mp3'
    },
    {
        img: 'images/faded.png',
        name: 'Faded',
        artist: 'Alan Walker',
        music: 'music/music_Faded.mp3'
    },
    {
        img: 'images/ratherbe1.jpg',
        name: 'Rather Be',
        artist: 'Clean Bandit',
        music: 'music/Rather Be.mp3'
    }
];


function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;

    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '&#10074;&#10074;';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '&#9654;';
}

function nextTrack() {
    if (track_index < music_list.length - 1)
        track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = music_list.length - 1;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

loadTrack(track_index);
