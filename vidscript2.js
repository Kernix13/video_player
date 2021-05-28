/*target elements*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');

const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');

const playBtn = document.getElementById('play-btn');
const stopBtn = player.querySelector('.stop');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');


function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  if (video.paused) {
      video.play();
      playBtn.classList.replace('fa-play', 'fa-pause');
      playBtn.setAttribute('title', 'Pause');
  } else {
      video.pause();
      showPlayIcon();    
  }
}

// Stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

function skip() {
  video.currentTime += +(this.dataset.skip); //removed 'parseFloat()'
}
const speakerIcon = player.querySelector('#speaker_icon');
function handleRangeUpdate() {

  video[this.name] = this.value; 
  (video['volume'] === 0 ? speakerIcon.className = "fa fa-volume-off" : 
                           speakerIcon.className = "fa fa-volume-up")
}

// Calculate display time format
function displayTime(time) {
  const minutes = Math.floor(time/60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}
// update progress bar as the video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`; 
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within the video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime*100}%`;
  video.currentTime = newTime * video.duration;
}

function scrub(event) {
  const scrubTime = (event.offsetX / progressRange.offsetWidth) * video.duration; 
  video.currentTime = scrubTime; 
}

// Spacebar used to play and pause
document.body.onkeyup = function(e){
  if(e.keyCode == 32){
      togglePlay();
  }
}

// =======================
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
// ===================
/*functions linked to elements*/
video.addEventListener('click', togglePlay);
video.addEventListener('keydown', (event) => event.keyCode === 32 && togglePlay()); 

playBtn.addEventListener('click', togglePlay);


stopBtn.addEventListener('click', stopVideo);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); 
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); 

let mouseDown = false; 
progressRange.addEventListener('click', scrub); 
progressRange.addEventListener('mousemove', (event) => mouseDown && scrub(event)); 
progressRange.addEventListener('mousedown', () => mouseDown = true); 
progressRange.addEventListener('mouseup', () => mouseDown = false); 


const screen_size = player.querySelector('.screenSize');
const controls = player.querySelector('.player_controls'); 
const screenSize_icon = player.querySelector('#screenSize_icon'); 

  function changeScreenSize() {
    if (player.mozRequestFullScreen) {

      player.mozRequestFullScreen();
      //change icon
      screenSize_icon.className = "fa fa-compress"; 
      /*control panel once fullscreen*/
      video.addEventListener('mouseout', () => controls.style.transform = 'translateY(100%) translateX(-5px)'); 
      video.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
      controls.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
      screen_size.addEventListener('click', () =>  { 
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            screenSize_icon.className = "fa fa-expand";
        }
      }); 
    } else if (player.webkitRequestFullScreen) {

      player.webkitRequestFullScreen();

      screenSize_icon.className = "fa fa-compress"; 

      video.addEventListener('mouseout', () => controls.style.transform = 'translateY(100%) translateX(-5px)'); 
      video.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
      controls.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
      screen_size.addEventListener('click', () =>  { 
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            screenSize_icon.className = "fa fa-expand"; 
        }
      }); 
   }
  }
screen_size.addEventListener('click', changeScreenSize); 
/**/

/* MUTE button */
const speaker = player.querySelector('.speaker'); 
const volInput = player.querySelector('input[name="volume"]')
//const speakerIcon = player.querySelector('#speaker_icon'); 

let muted = false;

function mute() {
  if (!muted) {
    video['volume'] = 0;
    volInput.value = 0;
    speakerIcon.className = "fa fa-volume-off"
    muted = true; 
  } else {
    video['volume'] = 1;
    volInput.value = 1;
    muted = false;
    speakerIcon.className = "fa fa-volume-up"
  }
}

speaker.addEventListener('click', mute)
/**/

/*play rate button*/
const rate_icon = player.querySelector('.rate_icon')
const rateInput = player.querySelector('input[name="playbackRate"]')
let rateChanged = false; 

function changeRate() {
  if (!rateChanged) {
    video['playbackRate'] = 0.5;
    rateInput.value = 0.5;
    rateChanged = true; 
  } else {
    video['playbackRate'] = 1;
    rateInput.value = 1;
    rateChanged = false;
  }
}

// rate_icon.addEventListener('click', changeRate)
/**/



