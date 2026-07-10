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

        console.log("✅ Login Success", result.user);

        saveUser(result.user);

        
    } catch (error) {

        console.error(error);

        alert(error.message);

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

    window.location.href = "/Silas-Furniture-Website/index.html";
}
// ===============================
// KEEP SESSION UPDATED
// ===============================
onAuthStateChanged(auth, (user) => {

  const slot = document.getElementById("user-slot");
  const loginLink = document.getElementById("login-link");

  if (user) {
      const onLoginPage =
window.location.pathname.includes("login.html");

if (onLoginPage) {

    sessionStorage.setItem(
        "loginSuccess",
        `Welcome back, ${user.displayName}!`
    );

    window.location.href =
    "/Silas-Furniture-Website/index.html";

    return;

}

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

   <button
class="menu-item"
id="assistant-btn">

🤖 AI Assistant

</button>
    <button class="menu-item" id="logout-btn">

        🚪 Logout

    </button>

    `;
    const logoutBtn = document.getElementById("logout-btn");
    const assistantBtn =
document.getElementById("assistant-btn");

if (assistantBtn) {

    assistantBtn.onclick = () => {

        window.location.href =
"/Silas-Furniture-Website/pages/ai.html";

    };

}

if (logoutBtn) {

    logoutBtn.onclick = () => {

        const modal = document.getElementById("logout-modal");

        const photo = document.getElementById("logout-photo");

        const name = document.getElementById("logout-name");

        const email = document.getElementById("logout-email");

        if (photo) photo.src = user.photoURL;

        if (name) name.textContent = user.displayName;

        if (email) email.textContent = user.email;

        if (modal) {

            modal.classList.add("show");

        }

    };

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
// ===============================
// LOGOUT MODAL
// ===============================

const logoutModal = document.getElementById("logout-modal");

const logoutYes = document.getElementById("logout-yes");

const logoutNo = document.getElementById("logout-no");

if (logoutNo) {

    logoutNo.onclick = () => {

        logoutModal.classList.remove("show");

    };

}

if (logoutYes) {

    logoutYes.onclick = async () => {

        logoutModal.classList.remove("show");

        await logout();

    };

}