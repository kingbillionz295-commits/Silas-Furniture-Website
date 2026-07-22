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

export function verifyAdmin(callback){

    onAuthStateChanged(auth, async(user)=>{

        if(!user){

            window.location.replace("admin-login.html");

            return;

        }

        try{

            const adminRef =
            doc(db,"admins",user.email);

            const adminSnap =
            await getDoc(adminRef);

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

            callback(user);

        }

        catch(error){

            console.error(error);

            window.location.replace(
                "admin-login.html"
            );

        }

    });

}