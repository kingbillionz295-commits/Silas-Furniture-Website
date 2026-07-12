// ==========================================
// SILAS FURNITURE
// ADMIN DASHBOARD CONTROLLER
// PHASE 3 - PART 3
// ==========================================

import { auth } from "./firebase.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Sidebar buttons
const sidebarButtons =
document.querySelectorAll(".sidebar-btn");

// Pages
const pages =
document.querySelectorAll(".page");

// Sidebar
const sidebar =
document.querySelector(".sidebar");

// Toggle
const menuToggle =
document.getElementById("menu-toggle");

// Administrator UI
const adminAvatar =
document.getElementById("admin-avatar");

const adminName =
document.getElementById("admin-name");

const adminGreeting =
document.getElementById("admin-greeting");

const adminStatus =
document.getElementById("admin-status");

// ==========================================
// GREETING
// ==========================================

function updateGreeting(){

const hour =
new Date().getHours();

let greeting="Welcome";

if(hour<12){

greeting="🌅 Good Morning";

}else if(hour<18){

greeting="☀️ Good Afternoon";

}else{

greeting="🌙 Good Evening";

}

if(adminGreeting){

adminGreeting.textContent=greeting;

}

}

// ==========================================
// GOOGLE PROFILE
// ==========================================

onAuthStateChanged(auth,(user)=>{

if(!user) return;

if(adminAvatar){

adminAvatar.src=user.photoURL;

}

if(adminName){

adminName.textContent=user.displayName;

}

if(adminStatus){

adminStatus.textContent="🟢 Online";

}

updateGreeting();

});

// ==========================================
// OPEN PAGE
// ==========================================

function openPage(pageId,button){

pages.forEach(page=>{

page.hidden=true;

page.classList.remove("active-page");

});

sidebarButtons.forEach(btn=>{

btn.classList.remove("active");

});

const page=
document.getElementById(pageId);

if(page){

page.hidden=false;

page.classList.add("active-page");

page.scrollIntoView({

behavior:"smooth",

block:"start"

});

}

button.classList.add("active");

if(window.innerWidth<=768){

sidebar.classList.remove("sidebar-open");

}

}

// ==========================================
// SIDEBAR
// ==========================================

sidebarButtons.forEach(button=>{

button.addEventListener("click",()=>{

openPage(

button.dataset.page,

button

);

});

});

// ==========================================
// MENU TOGGLE
// ==========================================

if(menuToggle){

menuToggle.onclick=()=>{

sidebar.classList.toggle("sidebar-open");

};

}

// ==========================================
// CLICK OUTSIDE
// ==========================================

document.addEventListener("click",(e)=>{

if(window.innerWidth>768) return;

if(

!sidebar.contains(e.target)

&&

!menuToggle.contains(e.target)

){

sidebar.classList.remove("sidebar-open");

}

});

// ==========================================
// CLOCK
// ==========================================

function updateClock(){

const clock=

document.getElementById("dashboard-clock");

if(!clock) return;

const now=new Date();

clock.textContent=

now.toLocaleTimeString([],{

hour:"2-digit",

minute:"2-digit"

});

}

setInterval(updateClock,1000);

updateClock();

// ==========================================
// START
// ==========================================

window.addEventListener("DOMContentLoaded",()=>{

const defaultButton=

document.querySelector(".sidebar-btn.active");

if(defaultButton){

openPage(

defaultButton.dataset.page,

defaultButton

);

}

});