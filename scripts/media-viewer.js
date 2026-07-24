// =============================================
// UNIVERSAL MEDIA ENGINE V5
// PART 1
// =============================================

console.log("🔥 Media Engine V5");

// ==============================
// DOM
// ==============================

const viewer =
document.getElementById("media-viewer");

const backdrop =
document.getElementById("viewer-backdrop");

const shell =
document.querySelector(".viewer-shell");

const imageContainer =
document.getElementById("image-container");

const videoContainer =
document.getElementById("video-container");

const image =
document.getElementById("viewer-image");

const video =
document.getElementById("viewer-video");

const loader =
document.getElementById("viewer-loader");

const playButton =
document.getElementById("play-button");

const fullscreenButton =
document.getElementById("fullscreen-btn");

const closeButton =
document.getElementById("close-viewer");

// ==============================

let mediaType = null;

let currentSource = null;

// ==============================
// OPEN
// ==============================

export function openMedia(media){

if(!media) return;

mediaType = media.type;

currentSource = media.src;

viewer.classList.remove("hidden");

requestAnimationFrame(()=>{

viewer.classList.add("show");

});

document.body.style.overflow="hidden";

loader.classList.add("show");

if(media.type==="image"){

openImage(media.src);

}else{

openVideo(media.src);

}

}

// ==============================
// CLOSE
// ==============================

export function closeMedia(){

viewer.classList.remove("show");

setTimeout(()=>{

viewer.classList.add("hidden");

},250);

document.body.style.overflow="";

image.hidden=true;

video.hidden=true;

video.pause();

video.removeAttribute("src");

video.load();

playButton.style.display="none";

fullscreenButton.style.display="none";

loader.classList.remove("show");

}

// ==============================
// IMAGE
// ==============================

function openImage(src){

videoContainer.hidden=true;

imageContainer.hidden=false;

image.hidden=false;

image.onload=()=>{

loader.classList.remove("show");

};

image.src=src;

}

// ==============================
// VIDEO
// ==============================

function openVideo(src){

imageContainer.hidden=true;

videoContainer.hidden=false;

video.hidden=false;

playButton.style.display="flex";

fullscreenButton.style.display="flex";

video.src=src;

video.load();

video.addEventListener("loadeddata",()=>{

loader.classList.remove("show");

},{once:true});

}

// ==============================
// CLOSE EVENTS
// ==============================

backdrop.onclick=closeMedia;

closeButton.onclick=closeMedia;

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

closeMedia();

}

});

// =============================================
// PART 2
// PLAY / PAUSE
// =============================================

playButton.onclick = ()=>{

if(video.paused){

video.controls = true;

video.muted = false;

video.play();

playButton.style.opacity="0";

setTimeout(()=>{

playButton.style.display="none";

},250);

}else{

video.pause();

playButton.style.display="flex";

requestAnimationFrame(()=>{

playButton.style.opacity="1";

});

}

};

// =============================================
// SHOW PLAY BUTTON AGAIN
// =============================================

video.addEventListener("pause",()=>{

playButton.style.display="flex";

requestAnimationFrame(()=>{

playButton.style.opacity="1";

});

});

video.addEventListener("ended",()=>{

playButton.style.display="flex";

playButton.style.opacity="1";

});

// =============================================
// FULLSCREEN
// =============================================

fullscreenButton.onclick = async()=>{

try{

if(document.fullscreenElement){

await document.exitFullscreen();

}else{

await video.requestFullscreen();

}

}catch(err){

console.log(err);

}

};

// =============================================
// PLAYBACK MEMORY
// =============================================

let playbackTime = 0;

video.addEventListener("timeupdate",()=>{

playbackTime = video.currentTime;

});

document.addEventListener("fullscreenchange",()=>{

if(!document.fullscreenElement){

setTimeout(()=>{

video.currentTime = playbackTime;

},100);

}

});

// =============================================
// LOADING
// =============================================

video.addEventListener("waiting",()=>{

loader.classList.add("show");

});

video.addEventListener("playing",()=>{

loader.classList.remove("show");

});

// =============================================
// IMAGE TAP
// =============================================

image.onclick = ()=>{

closeMedia();

};
// =============================================
// PART 3
// PREMIUM IMAGE ENGINE
// =============================================

let scale = 1;
let translateX = 0;
let translateY = 0;

let startX = 0;
let startY = 0;

let dragging = false;

// ----------------------------
// Apply Transform
// ----------------------------

function updateImageTransform(){

image.style.transform =
`translate(${translateX}px,${translateY}px)
scale(${scale})`;

}

// ----------------------------
// Double Tap Zoom
// ----------------------------

let lastTap = 0;

image.addEventListener("click",()=>{

const now = Date.now();

if(now-lastTap<300){

if(scale===1){

scale=2;

}else{

scale=1;

translateX=0;

translateY=0;

}

updateImageTransform();

}

lastTap=now;

});

// ----------------------------
// Drag
// ----------------------------

image.addEventListener("pointerdown",(e)=>{

if(scale<=1)return;

dragging=true;

startX=e.clientX-translateX;

startY=e.clientY-translateY;

image.style.cursor="grabbing";

});

window.addEventListener("pointermove",(e)=>{

if(!dragging)return;

translateX=e.clientX-startX;

translateY=e.clientY-startY;

updateImageTransform();

});

window.addEventListener("pointerup",()=>{

dragging=false;

image.style.cursor="grab";

});

// ----------------------------
// Mouse Wheel Zoom
// (Desktop Testing)
// ----------------------------

image.addEventListener("wheel",(e)=>{

e.preventDefault();

if(e.deltaY<0){

scale+=0.15;

}else{

scale-=0.15;

}

scale=Math.max(1,Math.min(scale,4));

if(scale===1){

translateX=0;

translateY=0;

}

updateImageTransform();

});

// ----------------------------
// Swipe Down Close
// ----------------------------

let swipeStartY=0;

image.addEventListener("touchstart",(e)=>{

swipeStartY=e.touches[0].clientY;

});

image.addEventListener("touchend",(e)=>{

const endY=e.changedTouches[0].clientY;

if(endY-swipeStartY>120 && scale===1){

closeMedia();

}

});

// =============================================
// RESET EVERYTHING
// =============================================

function resetViewer(){

scale=1;

translateX=0;

translateY=0;

updateImageTransform();

}

const oldClose = closeMedia;

closeMedia = function(){

resetViewer();

oldClose();

};