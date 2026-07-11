import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.replace("admin-login.html");

        return;

    }

    const adminRef = doc(db, "admins", user.email);

    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists()) {

        window.location.replace("../admin/access-denied.html");
        return;

    }

    const data = adminSnap.data();

    if (data.active !== true) {

        window.location.replace("../admin/access-denied.html");
        return;

    }

    const adminName =
    document.getElementById("admin-name");

    if (adminName) {

        adminName.textContent =
        `Welcome ${user.displayName}`;

    }

});