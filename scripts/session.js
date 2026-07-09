// ===============================
// SESSION MANAGER (MGE v1.0)
// ===============================

export function saveUser(user) {
    localStorage.setItem("mge_user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
    }));
}

export function getUser() {
    return JSON.parse(localStorage.getItem("mge_user"));
}

export function clearUser() {
    localStorage.removeItem("mge_user");
}

export function isLoggedIn() {
    return getUser() !== null;
}