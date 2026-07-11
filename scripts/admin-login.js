import { loginWithGoogle } from "./auth.js";

const btn = document.getElementById("admin-google-login");

btn.addEventListener("click", () => {

    loginWithGoogle();

});