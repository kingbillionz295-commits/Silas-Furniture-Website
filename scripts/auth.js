import { showToast } from "./toast.js";
import { auth, googleProvider } from "./firebase.js";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} 
from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import { saveUser, clearUser } from "./session.js";

// ===============================
// GOOGLE LOGIN
// ===============================
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    saveUser(result.user);

showToast(
    "Login successful! Welcome back.",
    "success"
);

setTimeout(() => {

    window.location.href = "../index.html";

},1000);
  } catch (error) {
    console.error("Google Login Error:", error);
    alert("Google Sign-In failed.");
  }
}

// ===============================
// LOGOUT
// ===============================
export async function logout() {

    await signOut(auth);

    clearUser();

    sessionStorage.setItem(
        "logoutSuccess",
        "Logged out successfully."
    );

    setTimeout(() => {

        window.location.href = "../index.html";

    },500);

}
// ===============================
// KEEP SESSION UPDATED
// ===============================
onAuthStateChanged(auth, (user) => {

  const slot = document.getElementById("user-slot");
  const loginLink = document.getElementById("login-link");

  if (user) {

    saveUser(user);
if (loginLink) {

    loginLink.style.display = "none";

}
    if (slot) {

      slot.innerHTML = `
        <img
          src="${user.photoURL}"
          alt="${user.displayName}"
          class="user-avatar"
          id="user-avatar">
      `;
      const menu = document.getElementById("user-menu");

if (menu) {

    const hour = new Date().getHours();

    let greeting = "Welcome back";

    if (hour < 12) {

        greeting = "🌅 Good Morning";

    } else if (hour < 18) {

        greeting = "☀️ Good Afternoon";

    } else {

        greeting = "🌙 Good Evening";

    }

    menu.innerHTML = `

    <div class="menu-profile">

        <img src="${user.photoURL}" class="menu-profile-pic">

        <h3>${greeting},</h3>

        <strong>${user.displayName}</strong>

        <p>${user.email}</p>

    </div>

    <hr>

    <button class="menu-item">❤️ Wishlist</button>

    <button class="menu-item">📍 Delivery Address</button>

    <button class="menu-item">🤖 AI Assistant</button>

    <button class="menu-item" id="logout-btn">

        🚪 Logout

    </button>

    `;
    const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {

    logoutBtn.onclick = logout;

}
    const avatar = document.getElementById("user-avatar");

if (avatar) {

    avatar.onclick = function (e) {

        e.stopPropagation();

        menu.classList.toggle("show");

    };

}

}

    }

  } else {

    clearUser();
    if (loginLink) {

    loginLink.style.display = "block";

}

    if (slot) {

      slot.innerHTML = "";

    }

  }

});
// ===============================
// CLOSE USER MENU
// ===============================

document.addEventListener("click", function () {

    const menu = document.getElementById("user-menu");

    if (menu) {

        menu.classList.remove("show");

    }

});