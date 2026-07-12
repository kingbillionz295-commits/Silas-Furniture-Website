// ==========================================
// SILAS FURNITURE
// ADMIN DASHBOARD CONTROLLER
// PHASE 3 - PART 2
// ==========================================

// Sidebar buttons
const sidebarButtons =
document.querySelectorAll(".sidebar-btn");

// Dashboard pages
const pages =
document.querySelectorAll(".page");

// Sidebar
const sidebar =
document.querySelector(".sidebar");

// Menu Toggle
const menuToggle =
document.getElementById("menu-toggle");

// ==========================================
// OPEN PAGE
// ==========================================

function openPage(pageId, button){

    pages.forEach(page=>{

        page.hidden = true;

        page.classList.remove("active-page");

    });

    sidebarButtons.forEach(btn=>{

        btn.classList.remove("active");

    });

    const selectedPage =
    document.getElementById(pageId);

    if(selectedPage){

        selectedPage.hidden = false;

        selectedPage.classList.add("active-page");

    }

    button.classList.add("active");

    // Close sidebar automatically on phones

    if(window.innerWidth <= 768){

        sidebar.classList.remove("sidebar-open");

    }

}

// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

sidebarButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        openPage(

            button.dataset.page,

            button

        );

    });

});

// ==========================================
// MOBILE MENU
// ==========================================

if(menuToggle){

    menuToggle.addEventListener("click",()=>{

        sidebar.classList.toggle("sidebar-open");

    });

}

// ==========================================
// CLOSE SIDEBAR WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener("click",(event)=>{

    if(window.innerWidth > 768) return;

    if(

        !sidebar.contains(event.target)

        &&

        !menuToggle.contains(event.target)

    ){

        sidebar.classList.remove("sidebar-open");

    }

});

// ==========================================
// WINDOW RESIZE
// ==========================================

window.addEventListener("resize",()=>{

    if(window.innerWidth > 768){

        sidebar.classList.remove("sidebar-open");

    }

});

// ==========================================
// DEFAULT PAGE
// ==========================================

window.addEventListener("DOMContentLoaded",()=>{

    const defaultButton =

    document.querySelector(".sidebar-btn.active");

    if(defaultButton){

        openPage(

            defaultButton.dataset.page,

            defaultButton

        );

    }

});

// ==========================================
// FUTURE MODULES PLACEHOLDER
// ==========================================

function initializeDashboard(){

    console.log(

        "✅ Dashboard Ready"

    );

}

initializeDashboard();
