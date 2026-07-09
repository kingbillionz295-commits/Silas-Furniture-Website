import { getUser } from "./session.js";

export function loadUser() {

    const user = getUser();

    const avatar = document.getElementById("user-avatar");

    if (!avatar) return;

    if (!user) {

        avatar.innerHTML = "Login";
        avatar.href = "pages/login.html";
        return;
    }

    if (user.photoURL) {

        avatar.innerHTML = `
            <img src="${user.photoURL}"
                 alt="Profile"
                 style="
                    width:40px;
                    height:40px;
                    border-radius:50%;
                    object-fit:cover;
                 ">
        `;

    } else {

        avatar.innerHTML = `
            <div style="
                width:40px;
                height:40px;
                border-radius:50%;
                background:#D4AF37;
                color:black;
                display:flex;
                justify-content:center;
                align-items:center;
                font-weight:bold;
            ">
                ${user.displayName.charAt(0).toUpperCase()}
            </div>
        `;
    }

}