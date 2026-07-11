import { auth, googleProvider, db } from "./firebase.js";

import {
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const button =
document.getElementById("admin-google-login");

button.addEventListener("click", async () => {

    button.disabled = true;
    button.textContent = "Verifying...";

    try {

        const result =
        await signInWithPopup(auth, googleProvider);

        const user = result.user;

        const adminRef =
        doc(db, "admins", user.email);

        const adminSnap =
        await getDoc(adminRef);

        if (!adminSnap.exists()) {

            sessionStorage.setItem(
                "deniedEmail",
                user.email
            );

            window.location.href =
            "../admin/access-denied.html";

            return;

        }

        const data = adminSnap.data();

        if (data.active !== true) {

            sessionStorage.setItem(
                "deniedEmail",
                user.email
            );

            window.location.href =
            "../admin/access-denied.html";

            return;

        }

        sessionStorage.setItem(
            "adminVerified",
            "true"
        );

        window.location.href =
        "../admin/admin.html";

    } catch (error) {

        console.error(error);

        button.disabled = false;

        button.textContent =
        "🔐 Verify Administrator";

        alert(error.message);

    }

});