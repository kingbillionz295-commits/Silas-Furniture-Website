// ==========================================================
// SILAS FURNITURE
// UNIVERSAL MEDIA ENGINE V4
// FOUNDATION
// ==========================================================

console.log("🔥 Universal Media Engine V4 Loaded");

// ==========================================================
// DOM
// ==========================================================

const viewer =
document.getElementById("media-viewer");

const backdrop =
document.getElementById("viewer-backdrop");

const image =
document.getElementById("viewer-image");

const video =
document.getElementById("viewer-video");

const closeButton =
document.getElementById("close-viewer");

const fullscreenButton =
document.getElementById("fullscreen-btn");

// ==========================================================
// ENGINE STATUS
// ==========================================================

const viewerReady = (

viewer &&
backdrop &&
image &&
video &&
closeButton &&
fullscreenButton

);

// ==========================================================
// ENGINE STATE
// ==========================================================

let currentMedia = null;

let currentType = null;

let lastVideoTime = 0;

// ==========================================================
// OPEN VIEWER
// ==========================================================

export function openMedia(media){

    if(!viewerReady) return;

    if(!media) return;

    currentMedia = media;

    currentType = media.type;

    viewer.classList.remove("hidden");

    requestAnimationFrame(()=>{

        viewer.classList.add("show");

    });

    document.body.style.overflow = "hidden";

    if(media.type === "image"){

        showImage(media.src);

    }

    else if(media.type === "video"){

        showVideo(media.src);

    }

}

// ==========================================================
// CLOSE VIEWER
// ==========================================================

export function closeMedia(){

    if(!viewerReady) return;

    viewer.classList.remove("show");

    setTimeout(()=>{

        viewer.classList.add("hidden");

    },300);

    stopVideo();

    hideImage();

    document.body.style.overflow = "";

    currentMedia = null;

    currentType = null;

}
// ==========================================================
// IMAGE ENGINE
// ==========================================================

function showImage(src){

    if(!image || !video || !fullscreenButton) return;

    video.pause();

    video.hidden = true;

    image.hidden = false;

    fullscreenButton.hidden = true;

    image.src = src;

    image.style.transform = "scale(1)";

    image.style.cursor = "zoom-in";

}

function hideImage(){

    if(!image) return;

    image.src = "";

    image.hidden = true;

}

// ==========================================================
// VIDEO ENGINE
// ==========================================================

function showVideo(src){

    if(!video || !fullscreenButton) return;

    hideImage();

    video.hidden = false;

    fullscreenButton.hidden = false;

    if(video.src !== src){

        video.src = src;

        lastVideoTime = 0;

    }

    video.currentTime = lastVideoTime;

    video.loop = true;

}

function stopVideo(){

    if(!video) return;

    lastVideoTime = video.currentTime;

    video.pause();

}
// ==========================================================
// VIEWER CONTROLS
// ==========================================================

// ------------------------------------------
// Close Button
// ------------------------------------------

if(closeButton){

    closeButton.addEventListener("click",()=>{

        closeMedia();

    });

}

// ------------------------------------------
// Backdrop Click
// ------------------------------------------

if(backdrop){

    backdrop.addEventListener("click",()=>{

        closeMedia();

    });

}

// ------------------------------------------
// ESC Key
// ------------------------------------------

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closeMedia();

    }

});

// ==========================================================
// VIDEO PLAY / PAUSE
// ==========================================================

if(video){

    video.addEventListener("click",()=>{

        if(video.paused){

            video.play();

        }

        else{

            video.pause();

        }

    });

}
// ==========================================================
// PLAYBACK MEMORY ENGINE
// ==========================================================

// ------------------------------------------
// Save playback position
// ------------------------------------------

if(video){

    video.addEventListener("pause",()=>{

        lastVideoTime = video.currentTime;

    });

}

// ------------------------------------------
// Resume playback position
// ------------------------------------------

if(video){

    video.addEventListener("play",()=>{

        if(video.currentTime !== lastVideoTime){

            video.currentTime = lastVideoTime;

        }

    });

}

// ------------------------------------------
// Reset when finished
// ------------------------------------------

if(video){

    video.addEventListener("ended",()=>{

        lastVideoTime = 0;

    });

}

// ==========================================================
// FULLSCREEN CONTINUITY
// ==========================================================

document.addEventListener("fullscreenchange",()=>{

    if(!video) return;

    if(video.hidden) return;

    lastVideoTime = video.currentTime;

    if(!document.fullscreenElement){

        setTimeout(()=>{

            video.currentTime = lastVideoTime;

        },100);

    }

});
// ==========================================================
// FULLSCREEN BUTTON
// ==========================================================

if(fullscreenButton){

    fullscreenButton.addEventListener("click", async ()=>{

        if(!video) return;

        if(video.hidden) return;

        try{

            if(document.fullscreenElement){

                await document.exitFullscreen();

            }

            else{

                await video.requestFullscreen();

            }

        }

        catch(error){

            console.error("Fullscreen Error:",error);

        }

    });

}

// ==========================================================
// VIEWER ANIMATION
// ==========================================================

if(viewer){

    viewer.addEventListener("transitionend",()=>{

        if(!viewer.classList.contains("show")){

            viewer.classList.add("hidden");

        }

    });

}
