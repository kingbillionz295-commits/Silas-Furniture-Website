import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// =====================================
// ADMIN AUTHENTICATION V2
// =====================================

const loading =
document.getElementById("admin-loading");

const dashboard =
document.getElementById("admin-dashboard");

const adminName =
document.getElementById("admin-name");

onAuthStateChanged(auth, async (user) => {

    // Not logged in
    if (!user) {

        window.location.replace("admin-login.html");

        return;

    }

    // Didn't come through admin login
    if (sessionStorage.getItem("adminVerified") !== "true") {

        window.location.replace("admin-login.html");

        return;

    }

    try {

        const adminRef = doc(db, "admins", user.email);

        const adminSnap = await getDoc(adminRef);

        // Email not found
        if (!adminSnap.exists()) {

            sessionStorage.setItem(
                "deniedEmail",
                user.email
            );

            sessionStorage.removeItem("adminVerified");

            window.location.replace("access-denied.html");

            return;

        }

        const admin = adminSnap.data();

        // Disabled account
        if (admin.active !== true) {

            sessionStorage.setItem(
                "deniedEmail",
                user.email
            );

            sessionStorage.removeItem("adminVerified");

            window.location.replace("access-denied.html");

            return;

        }

        // Success
        if (adminName) {

            adminName.textContent =
            `Welcome ${user.displayName}`;

        }

        if (loading) {

            loading.remove();

        }

        if (dashboard) {

            dashboard.hidden = false;

        }

    } catch (error) {

        console.error(error);

        sessionStorage.removeItem("adminVerified");

        window.location.replace("admin-login.html");

    }

});