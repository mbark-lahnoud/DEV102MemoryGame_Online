/* VARIABLES GLOBALES */

const buttons = document.querySelectorAll(".mode-btn");

/* NAVIGATION */

function navigateTo(page) {
    animateClick();

    setTimeout(() => {
        window.location.href = page;
    }, 200);
}
function goSolo() {
    navigateTo("solo.html");
}

function goMulti() {
    navigateTo("multi.html");
}

/* ===================== */
/* ANIMATION CLICK */
/* ===================== */

function animateClick() {

    const buttons = document.querySelectorAll(".mode-btn");

    buttons.forEach(btn => {
        btn.style.transform = "scale(0.95)";
        setTimeout(() => {
            btn.style.transform = "scale(1)";
        }, 150);
    });
}

/* ===================== */
/* BONUS : HOVER SOUND (OPTIONNEL) */
/* ===================== */

document.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.boxShadow = "0 0 25px red";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.boxShadow = "0 0 10px red";
    });
});

/* ===================== */
/* LOAD EFFECT */
/* ===================== */

window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});
