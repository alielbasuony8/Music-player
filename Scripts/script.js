const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".music-progress");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

const musicFiles = [
  "Al-Fatihah",
  "An-Nas",
  "Al-Falaq",
  "Al-Ikhlas",
  "Al-Masad",
  "An-Nasr",
  "Al-Kafirun",
];
let musicIndex = 0;

loadMusic(musicFiles[musicIndex]);

function loadMusic(music) {
  title.innerText = music;
  audio.src = `Music/${music}.mp3`;
  cover.src = `Images/${music}.jpg`;
}

function pauseMusic() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

function playMusic() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
});

prevBtn.onclick = () => {
  musicIndex--;
  if (musicIndex < 0) {
    musicIndex = musicFiles.length - 1;
  }
  loadMusic(musicFiles[musicIndex]);
  playMusic();
};
nextBtn.onclick = () => {
  musicIndex++;
  if (musicIndex > musicFiles.length - 1) {
    musicIndex = 0;
  }
  loadMusic(musicFiles[musicIndex]);
  playMusic();
};

audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressCounter = (currentTime / duration) * 100;
  progress.style.width = `${progressCounter}%`;
});
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener("click", setProgress);

audio.addEventListener("ended", () => {
    setTimeout(() => nextBtn.click(), 3000)
});
