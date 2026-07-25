// ==========================================================
// SILAS FURNITURE
// MEDIA ENGINE V8
// PART 1 — FOUNDATION
// ==========================================================

console.log("🚀 Media Engine V8 Started");

// ==========================================================
// SAFE DOM
// ==========================================================

const $ = (id) => document.getElementById(id);

// ==========================================================
// DOM
// ==========================================================

const viewer = $("media-viewer");
const backdrop = $("viewer-backdrop");

const image = $("viewer-image");
const video = $("viewer-video");

const imageContainer = $("image-container");
const videoContainer = $("video-container");

const loader = $("viewer-loader");

const playButton = $("play-button");
const fullscreenButton = $("fullscreen-btn");
const closeButton = $("close-viewer");

// ==========================================================
// STATE
// ==========================================================

const state = {

    opened:false,

    mode:null,

    src:null,

    zoom:1,

    translateX:0,

    translateY:0,

    playbackTime:0,

    isFullscreen:false

};

// ==========================================================
// READY
// ==========================================================

const engineReady =

viewer &&
backdrop &&
image &&
video;

console.log("Media Engine Ready:",engineReady);

// ==========================================================
// OPEN
// ==========================================================

export function openMedia(media){

    if(!engineReady) return;

    if(!media) return;

    state.mode = media.type;

    state.src = media.src;

    state.opened = true;

    viewer.classList.remove("hidden");

    requestAnimationFrame(()=>{

        viewer.classList.add("show");

    });

    document.body.style.overflow = "hidden";

}

// ==========================================================
// CLOSE
// ==========================================================

export function closeMedia(){

    if(!engineReady) return;

    viewer.classList.remove("show");

    setTimeout(()=>{

        viewer.classList.add("hidden");

    },250);

    document.body.style.overflow="";

}

// ==========================================================
// EVENTS
// ==========================================================

backdrop?.addEventListener(

"click",

closeMedia

);

closeButton?.addEventListener(

"click",

closeMedia

);

document.addEventListener(

"keydown",

(event)=>{

    if(event.key==="Escape"){

        closeMedia();

    }

});
// ==========================================================
// PART 2
// IMAGE ENGINE
// ==========================================================

// ------------------------------------------
// LOADER
// ------------------------------------------

function showLoader(){

    loader?.classList.add("show");

}

function hideLoader(){

    loader?.classList.remove("show");

}

// ------------------------------------------
// SHOW IMAGE
// ------------------------------------------

function showImage(src){

    if(!image) return;

    // hide video
    video.hidden = true;
    video.pause();

    imageContainer.hidden = false;
    videoContainer.hidden = true;

    image.hidden = false;

    playButton.hidden = true;
    fullscreenButton.hidden = true;

    showLoader();

    image.style.opacity = "0";
    image.style.transform = "scale(.96)";

    image.onload = ()=>{

        hideLoader();

        requestAnimationFrame(()=>{

            image.style.transition =
            "opacity .25s ease, transform .25s ease";

            image.style.opacity = "1";

            image.style.transform = "scale(1)";

        });

    };

    image.onerror = ()=>{

        hideLoader();

        console.warn("Image failed to load");

    };

    image.src = src;

}

// ------------------------------------------
// CONNECT TO OPEN
// ------------------------------------------

const oldOpenMedia = openMedia;

openMedia = function(media){

    oldOpenMedia(media);

    if(media.type==="image"){

        showImage(media.src);

    }

};