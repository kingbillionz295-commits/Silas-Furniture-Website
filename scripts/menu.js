const menuBtn = document.getElementById("menu-btn");

const sideMenu = document.getElementById("side-menu");

const overlay = document.getElementById("menu-overlay");

const closeBtn = document.getElementById("close-menu");

menuBtn.addEventListener("click",()=>{

    sideMenu.classList.add("open");

    overlay.classList.add("show");

});

closeBtn.addEventListener("click",closeMenu);

overlay.addEventListener("click",closeMenu);

function closeMenu(){

    sideMenu.classList.remove("open");

    overlay.classList.remove("show");

}