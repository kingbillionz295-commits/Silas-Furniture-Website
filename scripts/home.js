import "./auth.js";
import { showToast } from "./toast.js";
// ==========================================================
// FIREBASE
// ==========================================================

import { db } from "./firebase.js";

import {

    collection,

    query,

    orderBy,

    onSnapshot

}
from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
// ================================
// MGE v1.0 HOME ENGINE
// ================================

// ---------- HERO TEXT ANIMATION ----------

const messages = [

"Crafting elegant furniture for modern living.",

"Designed with quality. Built for comfort.",

"Transform your space with timeless elegance.",

"Luxury furniture made for homes and businesses."

];

const heroText = document.getElementById("hero-text");

let current = 0;

function changeHeroText() {

    if (!heroText) return;

    heroText.style.opacity = "0";

    setTimeout(() => {

        current++;

        if (current >= messages.length) {

            current = 0;

        }

        heroText.textContent = messages[current];

        heroText.style.opacity = "1";

    }, 400);

}

setInterval(changeHeroText,4000);

// ---------- SEARCH ----------

const searchInput = document.getElementById("search-input");

const searchBtn = document.getElementById("search-btn");

const searchStatus = document.getElementById("search-status");

function performSearch(){

    const keyword = searchInput.value.trim();

    searchBtn.textContent = "Searching...";

    setTimeout(() => {

        if(keyword===""){

            searchStatus.textContent =
            "Please type what you want to search.";

        }else{

            searchStatus.textContent =
            `No products found for "${keyword}". Continue browsing our catalogue.`;

        }

        searchBtn.textContent = "Search";

    },500);

}
    // Firestore search will be connected here later



if (searchBtn) {

    searchBtn.onclick = performSearch;

}

if (searchInput) {

    searchInput.addEventListener("keydown", function(e){

        if(e.key === "Enter"){

            performSearch();

        }

    });

}
// Clear search message while typing

if (searchInput) {

    searchInput.addEventListener("input", function () {

        searchStatus.textContent = "";

    });

}
// ---------- PRODUCT IMAGE CLICK ----------

document.querySelectorAll(".card img").forEach(image=>{

    image.addEventListener("click",()=>{

        window.open(image.src,"_blank");

    });

});

// ================================
// WISHLIST BUTTON
// ================================

document.addEventListener("click", function(e){

const wish = e.target.closest(".wishlist-action");

if(!wish) return;

const icon = wish.querySelector(".material-symbols-outlined");

const text = wish.querySelector("small");

if(icon.textContent.trim()=="add"){

icon.textContent="done";

text.textContent="Saved";

}else{

icon.textContent="add";

text.textContent="Wishlist";

}

});
// ================================
// LIKE BUTTON
// ================================

document.addEventListener("click", function(e){

const like=e.target.closest(".like-action");

if(!like) return;

const icon=like.querySelector(".material-symbols-outlined");

const count=like.querySelector("strong");

let likes=parseInt(count.textContent);

if(like.classList.contains("liked")){

like.classList.remove("liked");

icon.innerHTML="♡";

icon.style.color="white";

count.textContent=Math.max(0,likes-1);

}else{

like.classList.add("liked");

icon.innerHTML="❤";

icon.style.color="#ff2d55";

count.textContent=likes+1;

}

});
console.log("✅ MGE Home Engine Loaded");
const menuBtn = document.getElementById("menu-btn");

const sideMenu = document.getElementById("side-menu");

const overlay = document.getElementById("menu-overlay");

const closeBtn = document.getElementById("close-menu");

if (menuBtn && sideMenu && overlay && closeBtn) {

    menuBtn.addEventListener("click", () => {

        sideMenu.classList.add("open");

        overlay.classList.add("show");

    });

    closeBtn.addEventListener("click", closeMenu);

    overlay.addEventListener("click", closeMenu);

}

function closeMenu(){

    sideMenu.classList.remove("open");

    overlay.classList.remove("show");

}
/* ===========================
COMMENTS PANEL
=========================== */

const commentBtn = document.querySelector(".comment-action");
const commentsPanel = document.getElementById("comments-panel");
const closeComments = document.getElementById("close-comments");

if (commentBtn && commentsPanel && closeComments) {

    commentBtn.addEventListener("click", () => {

        commentsPanel.classList.add("show");

    });

    closeComments.addEventListener("click", () => {

        commentsPanel.classList.remove("show");

    });

}
// =========================
// PREMIUM ACTION TRAY
// =========================

document.querySelectorAll(".product-card").forEach(card=>{

const button=card.querySelector(".menu-dots");

const tray=card.querySelector(".action-tray");

const media=card.querySelector(".product-media");

const close=card.querySelector(".close-tray");

button.addEventListener("click",(e)=>{

e.stopPropagation();

tray.classList.add("show");

media.classList.add("dim");

});

close.addEventListener("click",()=>{

tray.classList.remove("show");

media.classList.remove("dim");

});

document.addEventListener("click",(e)=>{

if(!tray.contains(e.target) &&

!button.contains(e.target)){

tray.classList.remove("show");

media.classList.remove("dim");

}

});

});
// =========================
// SHARE BUTTON
// =========================

const shareButton = document.querySelector(".share-action");

if(shareButton){

shareButton.addEventListener("click", async ()=>{

const shareData = {

title:"Silas Furniture Integrated Services",

text:"Check out this amazing furniture.",

url:window.location.href

};

try{

if(!navigator.share){

showToast("⚠","Sharing is not supported on this browser.");

return;

}

// Tell the user we're opening Android's share menu
showToast("📤","Opening share menu...");

// Open Android share sheet
await navigator.share(shareData);

// If the share finishes successfully,
// don't show another toast.

}catch(err){

// If the user cancelled,
// don't show any error.

if(err.name !== "AbortError"){

showToast("❌","Unable to share.");

}

}

});

}
// =========================
// WHATSAPP BUTTON
// =========================

const whatsappButton = document.querySelector(".whatsapp-action");

if(whatsappButton){

whatsappButton.addEventListener("click",()=>{

const phone = "2348038726982";

const card = whatsappButton.closest(".product-card");

const productName =
card.querySelector(".product-title")?.textContent.trim() ||
"Furniture";

const productDescription =
card.querySelector(".product-desc")?.textContent.trim() ||
"No description";

const message = encodeURIComponent(

`Hello 👋

I'm interested in this furniture.

🪑 Product:
${productName}

📝 Description:
${productDescription}

Can I get the price and more details?

Thank you.`

);
window.open(
`https://wa.me/${phone}?text=${message}`,
"_blank"
);

});

}
// =========================
// COPY LINK
// =========================

document.querySelectorAll(".copy-action").forEach(button => {

button.addEventListener("click", async () => {

try{

await navigator.clipboard.writeText(window.location.href);

showToast("✔","Link copied successfully");
}catch(error){

showToast("⚠","Unable to copy link");
console.error(error);

}

});

});
// =========================
// CALL BUTTON
// =========================

document.addEventListener("click", function (e) {

    const callBtn = e.target.closest(".call-action");

    if (!callBtn) return;

    window.location.href = "tel:+2348038726982";
     
});
// =========================
// LOGIN / LOGOUT TOAST
// =========================

const loginMessage = sessionStorage.getItem("loginSuccess");

if (loginMessage) {

    showToast(loginMessage, "success");

    sessionStorage.removeItem("loginSuccess");

}

const logoutMessage = sessionStorage.getItem("logoutSuccess");

if (logoutMessage) {

    showToast(logoutMessage, "success");

    sessionStorage.removeItem("logoutSuccess");

}
// ==========================================================
// PHASE 10.1
// MASTER PRODUCT CARD ENGINE
// ==========================================================

const productsGrid = document.getElementById("products-grid");

// ------------------------------------------
// CREATE PRODUCT CARD
// ------------------------------------------


// ======================================================
// PHASE 10.2
// BUILD PRODUCT CARD FROM TEMPLATE
// ======================================================
// ==========================================
// ACTIVE VIDEO CONTROLLER
// ==========================================

let activeVideo = null;
function createProductCard(product) {

    const card = document.createElement("div");
    card.className = "product-card";

    const isVideo =
        product.type === "video" ||
        product.mediaType === "video";

    card.innerHTML = `

<div class="product-media">
${
isVideo
?

`
<div class="video-wrapper">

<video
class="product-video"
src="${product.media}"
muted
playsinline
preload="metadata">
</video>

<div class="play-overlay">

<span class="material-symbols-outlined">
play_circle
</span>

</div>

</div>
`

:

`
<img
class="product-image"
src="${product.media}"
alt="${product.name}">
`

}

<div class="floating-actions">

<div class="action like-action">

<span class="material-symbols-outlined">♡</span>

<strong>${product.likes ?? 0}</strong>

</div>

<div class="action comment-action">

<span class="material-symbols-outlined">chat</span>

<strong>${product.comments ?? 0}</strong>

</div>

<div class="action wishlist-action">

<span class="material-symbols-outlined">add</span>

<small>Wishlist</small>

</div>

<div class="menu-wrapper">

<button class="menu-dots">

<span class="material-symbols-outlined">

more_horiz

</span>

</button>

</div>

</div>

<div class="action-tray">

<button class="close-tray">

<span class="material-symbols-outlined">

close

</span>

</button>

<div class="tray-track">

<button class="tray-action share-action">

<span class="material-symbols-outlined">

forward

</span>

<small>Share</small>

</button>

<button class="tray-action copy-action">

<span class="material-symbols-outlined">

link

</span>

<small>Copy Link</small>

</button>

<button class="tray-action whatsapp-action">

<i class="fa-brands fa-whatsapp"></i>

<small>WhatsApp</small>

</button>

<button class="tray-action call-action">

<span class="material-symbols-outlined">

call

</span>

<small>Call</small>

</button>

</div>

</div>

<div class="views-counter">

<span class="material-symbols-outlined">

visibility

</span>

<span>${product.views ?? 0}</span>

</div>

</div>

<div class="product-info">

<h3 class="product-title">

${product.name}

</h3>

<p class="product-desc">

${product.description}

</p>

<button class="order-btn">

Order

</button>

</div>

`;

    // WhatsApp Order
    card.querySelector(".order-btn").onclick = () => {

        const text = encodeURIComponent(

`Hello 👋

I'm interested in:

${product.name}

${product.description}`

        );

        window.open(

`https://wa.me/2348038726982?text=${text}`,

"_blank"

        );

    };

    
initializeProductCard(card);

    return card;

}

// ==========================================================
// PHASE 10.5
// LIVE FIRESTORE GALLERY
// ==========================================================

const productsCollection = collection(db, "products");

const productsQuery = query(

    productsCollection,

    orderBy("createdAt", "desc")

);

onSnapshot(productsQuery, (snapshot) => {

    productsGrid.innerHTML = "";

    snapshot.forEach((doc) => {
const product = doc.data();

console.log(product);
        

        const card = createProductCard({

    id: doc.id,

    name: product.name,

    description: product.description,

    media: product.mediaURL,

    type: product.mediaType,

    likes: product.likes ?? 0,

    comments: product.comments ?? 0,

    views: product.views ?? 0

});
        productsGrid.appendChild(card);
console.log(card.outerHTML);
    });

});
function initializeProductCard(card){

const tray = card.querySelector(".action-tray");
const menuBtn = card.querySelector(".menu-dots");
const closeBtn = card.querySelector(".close-tray");
const media = card.querySelector(".product-media");

// =====================
// MENU
// =====================

menuBtn.addEventListener("click",(e)=>{

e.stopPropagation();

tray.classList.add("show");

media.classList.add("dim");

});

closeBtn.addEventListener("click",()=>{

tray.classList.remove("show");

media.classList.remove("dim");

});

// =====================
// COMMENT
// =====================

const commentBtn = card.querySelector(".comment-action");

commentBtn.addEventListener("click",()=>{

commentsPanel.classList.add("show");

});

// =====================
// VIDEO
// =====================

const video = card.querySelector("video");

if(video){

const wrapper = card.querySelector(".video-wrapper");
const overlay = card.querySelector(".play-overlay");

video.addEventListener("click",()=>{

if(activeVideo && activeVideo!==video){

activeVideo.pause();

activeVideo.currentTime=0;

activeVideo.controls=false;

activeVideo.closest(".video-wrapper")
.classList.remove("playing");

}

if(video.paused){

video.controls=true;

video.muted=false;

video.play();

wrapper.classList.add("playing");

activeVideo=video;

}else{

video.pause();

video.currentTime=0;

video.controls=false;

wrapper.classList.remove("playing");

}

});

video.addEventListener("ended",()=>{

wrapper.classList.remove("playing");

video.currentTime=0;

});
}

}