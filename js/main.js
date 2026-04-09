/* ===================== */
/* NAVIGATION */
/* ===================== */

function goSolo() {
    animateClick();
    setTimeout(() => {
        window.location.href = "solo.html";
    }, 200);
}

function goMulti() {
    animateClick();
    setTimeout(() => {
        window.location.href = "multi.html";
    }, 200);
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