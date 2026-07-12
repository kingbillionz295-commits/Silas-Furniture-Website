// ==========================================
// SILAS FURNITURE ADMIN DASHBOARD
// VERSION 2
// PART A
// ==========================================

// Sidebar
const sidebar =
document.querySelector(".sidebar");

const sidebarButtons =
document.querySelectorAll(".sidebar-btn");

// Pages
const pages =
document.querySelectorAll(".page");

// Header

const menuToggle =
document.getElementById("menu-toggle");

const dashboardClock =
document.getElementById("dashboard-clock");

// Administrator

const adminAvatar =
document.getElementById("admin-avatar");

const adminGreeting =
document.getElementById("admin-greeting");

const adminName =
document.getElementById("admin-name");

const adminStatus =
document.getElementById("admin-status");

// ==========================================
// LIVE CLOCK
// ==========================================

function updateClock(){

const now = new Date();

dashboardClock.textContent =
now.toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

});

}

updateClock();

setInterval(updateClock,1000);

// ==========================================
// GREETING
// ==========================================

function updateGreeting(){

const hour =
new Date().getHours();

let greeting = "👋 Welcome";

if(hour<12){

greeting="🌅 Good Morning";

}

else if(hour<18){

greeting="☀️ Good Afternoon";

}

else{

greeting="🌙 Good Evening";

}

adminGreeting.textContent =
greeting;

}

// ==========================================
// LOAD GOOGLE PROFILE
// ==========================================

export function loadAdminProfile(user){

if(!user) return;

// Avatar

adminAvatar.src =
user.photoURL ||
"../images/default-avatar.png";

// Animation

adminAvatar.animate([

{

transform:"scale(.7)",

opacity:.2

},

{

transform:"scale(1)",

opacity:1

}

],{

duration:500,

fill:"forwards"

});

// Name

adminName.textContent =
user.displayName ||
"Administrator";

// Status

adminStatus.textContent =
"🟢 Online";

// Greeting

updateGreeting();

}

// ==========================================
// PAGE SWITCHER
// ==========================================

function openPage(pageId, button){

pages.forEach(page=>{

page.hidden = true;

page.classList.remove("active-page");

});

sidebarButtons.forEach(btn=>{

btn.classList.remove("active");

});

// Show page

const selectedPage =
document.getElementById(pageId);

if(selectedPage){

selectedPage.hidden = false;

selectedPage.classList.add("active-page");

// Smooth reveal animation

selectedPage.animate([

{

opacity:0,

transform:"translateY(20px)"

},

{

opacity:1,

transform:"translateY(0px)"

}

],{

duration:300,

fill:"forwards"

});

// Scroll to top of workspace

selectedPage.scrollIntoView({

behavior:"smooth",

block:"start"

});

}

// Highlight active button

button.classList.add("active");

// Auto close sidebar on phones

if(window.innerWidth <= 768){

sidebar.classList.remove("sidebar-open");

}

}

// ==========================================
// SIDEBAR BUTTONS
// ==========================================

sidebarButtons.forEach(button=>{

button.addEventListener("click",()=>{

const pageId =

button.dataset.page;

openPage(pageId,button);

});

});

// ==========================================
// MOBILE MENU
// ==========================================

if(menuToggle){

menuToggle.addEventListener("click",()=>{

sidebar.classList.toggle("sidebar-open");

});

}

// ==========================================
// CLOSE SIDEBAR WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener("click",(event)=>{

if(window.innerWidth > 768) return;

if(

!sidebar.contains(event.target)

&&

!menuToggle.contains(event.target)

){

sidebar.classList.remove("sidebar-open");

}

});

// ==========================================
// HOVER ANIMATIONS
// ==========================================

adminAvatar.addEventListener("mouseenter",()=>{

adminAvatar.style.transform="scale(1.08) rotate(3deg)";

});

adminAvatar.addEventListener("mouseleave",()=>{

adminAvatar.style.transform="scale(1) rotate(0deg)";

});

// ==========================================
// GREETING ANIMATION
// ==========================================

setInterval(()=>{

adminGreeting.animate([

{

opacity:.5

},

{

opacity:1

}

],{

duration:600

});

},10000);

// ==========================================
// DEFAULT PAGE
// ==========================================

window.addEventListener("DOMContentLoaded",()=>{

const firstButton =

document.querySelector(".sidebar-btn.active");

if(firstButton){

openPage(

firstButton.dataset.page,

firstButton

);

}

});

// ==========================================
// END OF VERSION 2
// ==========================================