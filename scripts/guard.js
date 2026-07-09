import { isLoggedIn } from "./session.js";

export function protectPage() {

    if (!isLoggedIn()) {

        window.location.href = "pages/login.html";

    }

}