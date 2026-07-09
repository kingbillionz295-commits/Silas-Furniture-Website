// =========================
// PREMIUM TOAST ENGINE
// =========================

const toast = document.getElementById("toast");
const toastIcon = document.getElementById("toast-icon");
const toastText = document.getElementById("toast-text");

let toastTimer;

export function showToast(icon, message){

clearTimeout(toastTimer);

toastIcon.textContent = icon;

toastText.textContent = message;

toast.classList.add("show");

toastTimer = setTimeout(()=>{

toast.classList.remove("show");

},2500);

}