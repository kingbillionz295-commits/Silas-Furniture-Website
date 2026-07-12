import { loginAdmin } from "./auth.js";

const loginButton =
document.getElementById("admin-google-login");

loginButton.addEventListener("click", async () => {

    loginButton.disabled = true;

    loginButton.textContent = "Verifying...";

    await loginAdmin();

});