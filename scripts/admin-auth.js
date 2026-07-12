import { auth, db } from "./firebase.js";

import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

import {
doc,
getDoc
}
from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import {
loadAdminProfile
}
from "./admin-dashboard.js";

// =====================================
// ADMIN AUTHENTICATION
// =====================================

const loading =
document.getElementById("admin-loading");

const dashboard =
document.getElementById("admin-dashboard");

onAuthStateChanged(auth, async (user)=>{

    // -----------------------------
    // NOT LOGGED IN
    // -----------------------------

    if(!user){

        window.location.replace("admin-login.html");

        return;

    }

    try{

        const adminRef =
        doc(db,"admins",user.email);

        const adminSnap =
        await getDoc(adminRef);

        // -----------------------------
        // NOT AN ADMIN
        // -----------------------------

        if(!adminSnap.exists()){

            sessionStorage.setItem(
                "deniedEmail",
                user.email
            );

            window.location.replace(
                "access-denied.html"
            );

            return;

        }

        const admin =
        adminSnap.data();

        // -----------------------------
        // DISABLED ADMIN
        // -----------------------------

        if(admin.active !== true){

            sessionStorage.setItem(
                "deniedEmail",
                user.email
            );

            window.location.replace(
                "access-denied.html"
            );

            return;

        }

        // -----------------------------
        // VERIFIED ADMIN
        // -----------------------------

        if(loading){

            loading.style.display="none";

        }

        if(dashboard){

            dashboard.hidden=false;

        }

        // Load Google Profile

        loadAdminProfile(user);

    }

    catch(error){

        console.error(
            "Admin Authentication Error:",
            error
        );

        window.location.replace(
            "admin-login.html"
        );

    }

});