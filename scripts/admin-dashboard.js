// ==========================================
// SILAS FURNITURE
// ADMIN DASHBOARD CONTROLLER
// PHASE 3 - PART 1
// ==========================================

const sidebarButtons =
document.querySelectorAll(".sidebar-btn");

const pages =
document.querySelectorAll(".page");

// ==========================================
// OPEN PAGE
// ==========================================

function openPage(pageId, button){

    // Remove active page

    pages.forEach(page=>{

        page.classList.remove("active-page");

        page.hidden = true;

    });

    // Remove active sidebar

    sidebarButtons.forEach(btn=>{

        btn.classList.remove("active");

    });

    // Show selected page

    const selectedPage =
    document.getElementById(pageId);

    if(selectedPage){

        selectedPage.hidden = false;

        selectedPage.classList.add("active-page");

    }

    // Highlight button

    button.classList.add("active");

}

// ==========================================
// SIDEBAR NAVIGATION
// ==========================================

sidebarButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        const page =
        button.dataset.page;

        openPage(page,button);

    });

});

// ==========================================
// DEFAULT PAGE
// ==========================================

window.addEventListener("DOMContentLoaded",()=>{

    const firstButton =
    document.querySelector(".sidebar-btn.active");

    if(firstButton){

        openPage(

            firstButton.dataset.page,

            firstButton

        );

    }

});