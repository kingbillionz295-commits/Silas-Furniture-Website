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

const loading = document.getElementById("admin-loading");

const dashboard = document.getElementById("admin-dashboard");

const adminName = document.getElementById("admin-name");

onAuthStateChanged(auth, async (user) => {

    // =====================================
    // USER NOT LOGGED IN
    // =====================================

    if (!user) {

        window.location.replace("admin-login.html");

        return;

    }

    try {

        // =====================================
        // CHECK ADMINS COLLECTION
        // =====================================

        const adminRef = doc(db, "admins", user.email);

        const adminSnap = await getDoc(adminRef);

        // =====================================
        // EMAIL NOT FOUND
        // =====================================

        if (!adminSnap.exists()) {

            sessionStorage.setItem(
                "deniedEmail",
                user.email
            );

            window.location.replace("access-denied.html");

            return;

        }

        const admin = adminSnap.data();

        // =====================================
        // ACCOUNT DISABLED
        // =====================================

        if (admin.active !== true) {

            sessionStorage.setItem(
                "deniedEmail",
                user.email
            );

            window.location.replace("access-denied.html");

            return;

        }

        // =====================================
        // VERIFIED ADMIN
        // =====================================

        if (adminName) {

            adminName.textContent =
            `Welcome ${user.displayName}`;

        }

        if (loading) {

            loading.style.display = "none";

        }

        if (dashboard) {

            dashboard.style.display = "block";

        }

    }

    catch (error) {

        console.error("Admin Authentication Error:", error);

        window.location.replace("admin-login.html");

    }

});