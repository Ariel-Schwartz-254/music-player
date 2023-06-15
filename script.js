const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric'
    }

];

// Current Song
let songIndex = 0;

// Check if music is playing
let musicIsPlaying = false;

// Play
function playSong() {
    musicIsPlaying = true;
    music.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
}

// Pause
function pauseSong() {
    musicIsPlaying = false;
    music.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Next
function nextSong() {
    (songIndex < songs.length - 1)? songIndex++ : songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

// Previous
function prevSong() {
    songIndex > 0 ? songIndex-- : songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
    playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar
function updateProgressBar(event) {
    if (musicIsPlaying) {
        const { duration, currentTime } = event.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        // console.log(progressPercent);
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = '0' + durationSeconds
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
         // Calculate display for current time
         const currentMinutes = Math.floor(currentTime / 60);
         let currentSeconds = Math.floor(currentTime % 60);
         if (currentSeconds < 10) {
             currentSeconds = '0' + currentSeconds;
         }
         // Delay switching duration Element to avoid NaN
        if (currentSeconds) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

// Set Progress Bar
function setProgressBar(event) {

    const width = this.clientWidth;
    const clickX = event.offsetX;
    console.log(clickX, width);
    const { duration } = music;
    console.log((clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', () => (musicIsPlaying? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);