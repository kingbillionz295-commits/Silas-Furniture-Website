import { loginAdmin } from "./auth.js";

console.log("✅ admin-login.js loaded");

const btn = document.getElementById("admin-google-login");

console.log(btn);

btn.addEventListener("click", () => {

    console.log("Button clicked");

    loginAdmin();

});