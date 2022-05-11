console.log("Welcome to Spotify");

//audioElement.play();
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Let ME Love You", filePath:"songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Sorry", filePath:"songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Happier", filePath:"songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Perfect", filePath:"songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Stay With Me", filePath:"songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Treat You Better", filePath:"songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Love Yourself", filePath:"songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Closer", filePath:"songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Beliver", filePath:"songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Sympony", filePath:"songs/10.mp3", coverPath: "covers/10.jpg"},

    
]
songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play;

// Handle play/pause click 
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause(); 
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration /100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id); 
        gif.style.opacity = 1;
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src =`songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex +=1;
    }
    audioElement.src =`songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -=1;
    }
    audioElement.src =`songs/${songIndex+1}.mp3`;
    gif.style.opacity = 1;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})