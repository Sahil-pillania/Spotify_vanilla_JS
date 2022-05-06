console.log("Connected");

let songIndex = 0;
let audioElement = new Audio("Music/1.mp3");
//audioElement.play();
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  { songName: 1, filePath: "Music/1.mp3", coverPath: "cover/1.jpg" },
  { songName: 2, filePath: "Music/2.mp3", coverPath: "cover/1.jpg" },
  { songName: 3, filePath: "Music/3.mp3", coverPath: "cover/1.jpg" },
  { songName: 4, filePath: "Music/4.mp3", coverPath: "cover/1.jpg" },
  { songName: 5, filePath: "Music/5.mp3", coverPath: "cover/1.jpg" },
  { songName: 6, filePath: "Music/6.mp3", coverPath: "cover/1.jpg" },
  { songName: 7, filePath: "Music/7.mp3", coverPath: "cover/1.jpg" },
  { songName: 8, filePath: "Music/8.mp3", coverPath: "cover/1.jpg" },
  { songName: 9, filePath: "Music/9.mp3", coverPath: "cover/1.jpg" },
  { songName: 10, filePath: "Music/10.mp3", coverPath: "cover/1.jpg" },
];

songItems.forEach((e, i) => {
  //console.log(e, i);
  e.getElementsByTagName("img")[i].src = songs[i].coverPath;
  e.getElementsByClassName("songName")[i].innerText = songs[i].songName;
  console.log(e.getElementsByClassName("songName")[i].innerText);
});

//Handle play/pause
masterPlay.addEventListener("click", () => {
  console.log("clicked");
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.add("fa-play-circle");
    masterPlay.classList.remove("fa-pause-circle");
    gif.style.opacity = 0;
  }
});
audioElement.addEventListener("timeupdate", () => {
  //   console.log("timeupdate");
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  //   console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((e) => {
    e.classList.remove("fa-pause-circle");
    e.classList.add("fa-play-circle");
  });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      console.log(e.target);
      makeAllPlays();
      masterSongName.innerText = songs[songIndex].songName;
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `Music/${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `Music/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("next").addEventListener("click", () => {
  console.log("clicked on next button");
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `Music/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
