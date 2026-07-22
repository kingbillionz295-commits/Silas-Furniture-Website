// ==========================================================
// SILAS FURNITURE
// PRODUCT MANAGER
// VERSION 3.0
// PRODUCTS WORKSPACE ENGINE
// ==========================================================

// ==========================================================
// IMPORTS
// ==========================================================

import { openMedia } from "./media-viewer.js";

// ==========================================================
// FIREBASE
// ==========================================================

import { db } from "./firebase.js";

import {

    collection,

    addDoc,

    serverTimestamp

}
from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import {

    uploadToCloudinary

}
from "./cloudinary.js";

// ==========================================================
// DOM REFERENCES
// ==========================================================

// ---------- Upload Controls ----------

const mediaInput =
document.getElementById("media-input");

const chooseMediaBtn =
document.getElementById("choose-media-btn");

const publishProductBtn =
document.getElementById("publish-product-btn");

const clearFormBtn =
document.getElementById("clear-form-btn");

// ---------- Preview ----------

const previewPlaceholder =
document.getElementById("preview-placeholder");

const previewImage =
document.getElementById("preview-image");

const previewVideo =
document.getElementById("preview-video");

const previewPlayBtn =
document.getElementById("preview-play-btn");

// ---------- Product Form ----------

const productName =
document.getElementById("product-name");

const productDescription =
document.getElementById("product-description");

const productCategory =
document.getElementById("product-category");

// ---------- Recently Uploaded ----------

const recentProductsGrid =
document.getElementById("recent-products-grid");

// ==========================================================
// WORKSPACE STATE
// ==========================================================

const workspace = {

    selectedFile : null,

    selectedMediaType : null,

    uploadedMediaURL : "",

    uploadedThumbnail : "",

    isUploading : false

};

// ==========================================================
// INITIALIZER
// ==========================================================

function initializeWorkspace(){

    console.log("🚀 Products Workspace Ready");

    console.log("Version 3.0");

}

initializeWorkspace();
// ==========================================================
// PHASE 2
// MEDIA PICKER ENGINE
// ==========================================================

// ------------------------------------------
// OPEN FILE PICKER
// ------------------------------------------

if (chooseMediaBtn && mediaInput) {

    chooseMediaBtn.addEventListener("click", () => {

        mediaInput.click();

    });

}

// ------------------------------------------
// FILE SELECTED
// ------------------------------------------

if (mediaInput) {

    mediaInput.addEventListener("change", handleMediaSelection);

}

// ------------------------------------------
// HANDLE MEDIA
// ------------------------------------------

function handleMediaSelection(event) {

    const file = event.target.files[0];

    if (!file) return;

    workspace.selectedFile = file;

    // Detect media type

    if (file.type.startsWith("image/")) {

        workspace.selectedMediaType = "image";

    }

    else if (file.type.startsWith("video/")) {

        workspace.selectedMediaType = "video";

    }

    else {

        workspace.selectedMediaType = null;

    }

    console.log("📂 Selected:", file.name);

    console.log("📦 Type:", workspace.selectedMediaType);

    // Move to Preview Engine

    loadPreview(file);

}
// ==========================================================
// PHASE 3
// LIVE PREVIEW ENGINE
// ==========================================================

// ------------------------------------------
// LOAD PREVIEW
// ------------------------------------------

function loadPreview(file) {

    if (!file) return;

    const mediaURL = URL.createObjectURL(file);

    // Hide placeholder

    previewPlaceholder.hidden = true;

    // Reset preview

    previewImage.hidden = true;
    previewVideo.hidden = true;

    previewPlayBtn.style.display = "none";

    // -----------------------------
    // IMAGE PREVIEW
    // -----------------------------

    if (workspace.selectedMediaType === "image") {

        previewImage.src = mediaURL;

        previewImage.hidden = false;
if (previewFullscreenBtn) {

    previewFullscreenBtn.hidden = true;

}
        previewImage.onclick = () => {

            openMedia({

                type: "image",

                src: mediaURL

            });

        };

    }

    // -----------------------------
    // VIDEO PREVIEW
    // -----------------------------

    if (workspace.selectedMediaType === "video") {

        previewVideo.src = mediaURL;
previewVideo.load();
        previewVideo.hidden = false;
if (previewFullscreenBtn) {

    previewFullscreenBtn.hidden = false;

}
        previewVideo.currentTime = 0;

        previewVideo.loop = true;

        previewVideo.play().catch(error => {

    console.log("Preview play failed:", error);

});
        // Tap video = Pause

        previewVideo.onclick = pausePreviewVideo;

    }

}
// ==========================================================
// PHASE 4
// VIDEO PLAYBACK ENGINE
// ==========================================================

// ------------------------------------------
// PAUSE VIDEO
// ------------------------------------------

function pausePreviewVideo(){

    if(previewVideo.paused) return;

    previewVideo.pause();

    previewPlayBtn.innerHTML = "▶";

    previewPlayBtn.style.display = "flex";

}

// ------------------------------------------
// PLAY VIDEO
// ------------------------------------------

function playPreviewVideo(){

    previewVideo.play();

    previewPlayBtn.style.display = "none";

}

// ------------------------------------------
// PLAY BUTTON
// ------------------------------------------

previewPlayBtn.onclick = playPreviewVideo;

// ------------------------------------------
// VIDEO FINISHED
// ------------------------------------------

previewVideo.onended = ()=>{

    previewPlayBtn.innerHTML = "▶";

    previewPlayBtn.style.display = "flex";

};

// ------------------------------------------
// KEEP BUTTON HIDDEN WHILE PLAYING
// ------------------------------------------

previewVideo.onplay = ()=>{

    previewPlayBtn.style.display = "none";

};

// ------------------------------------------
// SHOW BUTTON WHEN PAUSED
// ------------------------------------------

previewVideo.onpause = ()=>{

    if(previewVideo.ended) return;

    previewPlayBtn.style.display = "flex";

};
// ==========================================================
// PHASE 5
// UNIVERSAL MEDIA VIEWER INTEGRATION
// ==========================================================

// ------------------------------------------
// PREVIEW IMAGE
// ------------------------------------------

previewImage.addEventListener("click", () => {

    if (!workspace.selectedFile) return;

    openMedia({

        type: "image",

        src: previewImage.src

    });

});

// ------------------------------------------
// FULLSCREEN BUTTON
// ------------------------------------------

const previewFullscreenBtn =
document.getElementById("preview-fullscreen-btn");

// ------------------------------------------

if(previewFullscreenBtn){

    previewFullscreenBtn.addEventListener("click",()=>{

        if(workspace.selectedMediaType !== "video") return;

        openMedia({

            type:"video",

            src:previewVideo.src

        });

    });

}
// ==========================================================
// PHASE 6
// PRODUCT FORM ENGINE
// ==========================================================

// ------------------------------------------
// COLLECT PRODUCT DATA
// ------------------------------------------

function collectProductData(){

    const data = {

        name:
        productName.value.trim(),

        description:
        productDescription.value.trim(),

        category:
        productCategory.value,

        mediaType:
        workspace.selectedMediaType,

        mediaURL:
        workspace.uploadedMediaURL,

        thumbnail:
        workspace.uploadedThumbnail,

        featured:false,

        likes:0,

        comments:0,

        views:0,

        status:"published",

        createdAt:Date.now()

    };

    return data;

}

// ------------------------------------------
// VALIDATE PRODUCT
// ------------------------------------------

function validateProduct(){

    if(!workspace.selectedFile){

        alert("Please choose an image or video.");

        return false;

    }

    if(productName.value.trim()===""){

        alert("Please enter product name.");

        productName.focus();

        return false;

    }

    if(productDescription.value.trim()===""){

        alert("Please enter product description.");

        productDescription.focus();

        return false;

    }

    if(productCategory.value===""){

        alert("Please select a category.");

        productCategory.focus();

        return false;

    }

    return true;

}
// ==========================================================
// PHASE 10.4
// PUBLISH PRODUCT ENGINE
// ==========================================================

async function publishProduct() {

    // ------------------------------------------
    // PREVENT DOUBLE CLICK
    // ------------------------------------------

    if (workspace.isUploading) return;

    // ------------------------------------------
    // VALIDATE FORM
    // ------------------------------------------

    if (!validateProduct()) return;

    try {

        workspace.isUploading = true;

        publishProductBtn.disabled = true;

        publishProductBtn.textContent = "⏳ Uploading...";

        // ------------------------------------------
        // UPLOAD MEDIA
        // ------------------------------------------

        const upload = await uploadToCloudinary(
            workspace.selectedFile
        );

        if (!upload.success) {

            throw new Error(
                upload.message || "Upload failed."
            );

        }

        // ------------------------------------------
        // SAVE TO FIRESTORE
        // ------------------------------------------

        await addDoc(

            collection(db, "products"),

            {

                name: productName.value.trim(),

                description: productDescription.value.trim(),

                category: productCategory.value,

                mediaURL: upload.url,

                mediaType: upload.resourceType,

                publicId: upload.publicId,

                likes: 0,

                comments: 0,

                views: 0,

                featured: false,

                status: "published",

                createdAt: serverTimestamp()

            }

        );

        // ------------------------------------------
        // SUCCESS
        // ------------------------------------------

        alert("✅ Product Published Successfully!");

        clearWorkspace();

    }

    catch (error) {

        console.error(error);

        alert(error.message || "Unable to publish product.");

    }

    finally {

        workspace.isUploading = false;

        publishProductBtn.disabled = false;

        publishProductBtn.textContent = "🚀 Publish Product";

    }

}
// ==========================================================
// PHASE 8
// CLOUDINARY UPLOAD ENGINE
// ==========================================================

// ------------------------------------------
// UPLOAD PRODUCT
// ------------------------------------------


// ==========================================================
// PHASE 9
// FIRESTORE SAVE ENGINE
// ==========================================================

// ------------------------------------------
// FIREBASE IMPORTS
// (Replace later with your actual firebase.js)
// ------------------------------------------

// import { db } from "./firebase.js";
// import {
//     collection,
//     addDoc
// } from "firebase/firestore";

// ------------------------------------------
// SAVE PRODUCT
// ------------------------------------------
// ==========================================================
// PHASE 10.5
// CLEAR WORKSPACE ENGINE
// ==========================================================

function clearWorkspace() {

    // ------------------------------------------
    // RESET WORKSPACE STATE
    // ------------------------------------------

    workspace.selectedFile = null;

    workspace.selectedMediaType = null;

    workspace.uploadedMediaURL = "";

    workspace.uploadedThumbnail = "";

    // ------------------------------------------
    // CLEAR FORM
    // ------------------------------------------

    productName.value = "";

    productDescription.value = "";

    productCategory.selectedIndex = 0;

    mediaInput.value = "";

    // ------------------------------------------
    // RESET PREVIEW
    // ------------------------------------------

    previewImage.src = "";

    previewImage.hidden = true;

    previewVideo.pause();

    previewVideo.src = "";

    previewVideo.hidden = true;

    previewPlayBtn.style.display = "none";

    previewPlaceholder.hidden = false;

    // ------------------------------------------
    // HIDE PREVIEW FULLSCREEN BUTTON
    // ------------------------------------------

    if (previewFullscreenBtn) {

        previewFullscreenBtn.hidden = true;

    }

    console.log("🧹 Workspace Cleared");

}

// ==========================================
// PUBLISH BUTTON
// ==========================================

publishProductBtn.addEventListener("click", publishProduct);
