// =========================================
// SILAS FURNITURE ASSISTANT
// VERSION 2
// =========================================
import "./auth.js";
import { getUser } from "./session.js";

const welcomeTitle = document.getElementById("welcome-title");
const welcomeContainer = document.getElementById("welcome-message");


const user = getUser();
console.log("MGE User:", user);
let firstName = "Friend";

if (user && user.displayName) {

    firstName = user.displayName.split(" ")[0];

}

const lastVisit = Number(localStorage.getItem("lastAIVisit")) || 0;

const now = Date.now();

const minutesAway = Math.floor((now - lastVisit) / 60000);

localStorage.setItem("lastAIVisit", now);

let intro = "";
if (lastVisit === 0) {

    welcomeTitle.textContent =
    `How may I help you today, ${firstName}?`;

    intro =
`Hello ${firstName} 👋

Welcome to Silas Furniture.

I'm your personal furniture assistant.

Feel free to ask me anything.`;

}
else if (minutesAway < 10) {

    welcomeTitle.textContent =
    `Welcome back, ${firstName} 👋`;

    intro =
`Hello again ${firstName} 😄

Back so soon?

What can I help you with this time?`;

}
else if (minutesAway < 60) {

    welcomeTitle.textContent =
    `Welcome back, ${firstName} 👋`;

    intro =
`Hello ${firstName} 👋

It's nice to see you again.

How may I assist you today?`;

}
else if (minutesAway < 1440) {

    welcomeTitle.textContent =
    `Welcome back, ${firstName} 👋`;

    intro =
`Hello ${firstName} 👋

I hope your day has been going well.

What can I help you with today?`;

}
else {

    welcomeTitle.textContent =
    `Welcome back, ${firstName} 👋`;

    intro =
`Hello ${firstName} 👋

It's been a little while.

I'm happy to see you again.

How may I assist you today?`;

}
document.addEventListener("DOMContentLoaded", () => {

    createWelcomeBubble();

});

function createWelcomeBubble(){

    welcomeContainer.innerHTML = "";

    const bubble = document.createElement("div");

    bubble.className = "ai-bubble";

    welcomeContainer.appendChild(bubble);

    typeWriter(bubble, intro);

}

function typeWriter(element, text){

    let i = 0;

    function typing(){

        if(i < text.length){

            element.textContent += text.charAt(i);

            i++;

            setTimeout(typing,55);

        }

    }

    typing();

}

// =========================
// BACK BUTTON
// =========================

document.getElementById("back-btn")
.addEventListener("click",()=>{

history.back();

});