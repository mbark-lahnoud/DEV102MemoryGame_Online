/* ===================== */
/* VARIABLES */
/* ===================== */

let player = "";
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let attempts = 0;
let matches = 0;

let timer = 0;
let interval;

let bestScore = localStorage.getItem("bestScore") || null;

/* ===================== */
/* DOM CACHE (PERF) */
/* ===================== */

const gameContainer = document.getElementById("game");
const timerEl = document.getElementById("timer");
const attemptsEl = document.getElementById("attempts");
const playerNameEl = document.getElementById("playerName");


function showInstructions() {
    const box = document.getElementById("instructions");

    if (!box) return;

    // reset au cas où
    box.style.display = "block";
    box.classList.remove("hide");

    // ⏳ disparaît après 5s
    setTimeout(() => {
        box.classList.add("hide");
    }, 5000);

    // 🔥 supprime complètement après animation
    setTimeout(() => {
        box.style.display = "none";
    }, 5800);
}


/* ===================== */
/* START GAME */
/* ===================== */

function startSolo() {
    showInstructions();

    const name = document.getElementById("player").value.trim();
    const regex = /^[A-Za-z]{3,10}$/;

    if (!regex.test(name)) {
        alert("Nom invalide (3-10 lettres uniquement)");
        return;
    }

    player = name;

    document.getElementById("game").innerHTML = "";
    attempts = 0;
    matches = 0;
    timer = 0;

    updateStats();

    clearInterval(interval);
    interval = setInterval(() => {
        timer++;
        document.getElementById("timer").innerText = "⏱ " + timer + "s";
    }, 1000);

    createBoard();
}

/* ===================== */
/* CREATE BOARD */
/* ===================== */

function createBoard() {

    let images = [];

    for (let i = 1; i <= 40; i++) {
        images.push(`images/IMG${i}.png`);
    }

    let selected = shuffle(images).slice(0, 10);
    let cards = shuffle([...selected, ...selected]);

    cards.forEach(img => createCard(img));
}

/* ===================== */
/* CREATE CARD */
/* ===================== */

function createCard(img) {

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="inner">
            <div class="front"><img src="${img}"></div>
            <div class="back"><img src="images/logo.png"></div>
        </div>
    `;

    card.addEventListener("click", () => flipCard(card, img));

    document.getElementById("game").appendChild(card);
}

/* ===================== */
/* FLIP CARD */
/* ===================== */

function flipCard(card, img) {

    if (lockBoard) return;
    if (card === firstCard?.card) return;
    if (card.classList.contains("matched")) return;

    card.classList.add("flip");

    if (!firstCard) {
        firstCard = { card, img };
        return;
    }

    secondCard = { card, img };

    lockBoard = true;
    attempts++;
    updateStats();

    setTimeout(checkMatch, 1000);
}

/* ===================== */
/* CHECK MATCH */
/* ===================== */

function checkMatch() {

    if (firstCard.img === secondCard.img) {

        firstCard.card.classList.add("matched");
        secondCard.card.classList.add("matched");

        // 🔒 bloquer totalement interaction
        firstCard.card.style.pointerEvents = "none";
        secondCard.card.style.pointerEvents = "none";

        matches++;

    } else {

        firstCard.card.classList.remove("flip");
        secondCard.card.classList.remove("flip");
    }

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    updateStats();

    if (matches === 10) endGame();
}

/* ===================== */
/* UPDATE STATS */
/* ===================== */

function updateStats() {

    document.getElementById("attempts").innerText = "🎯 " + attempts;

    document.getElementById("playerName").innerText =
        player + (bestScore ? " | 🏆 " + bestScore : "");
}

/* ===================== */
/* END GAME */
/* ===================== */

function endGame() {

    clearInterval(interval);

    // 🏆 BEST SCORE
    let bestScore = localStorage.getItem("bestScore");

    if (!bestScore || attempts < bestScore) {
        bestScore = attempts;
        localStorage.setItem("bestScore", bestScore);
    }

    // 🎉 AFFICHAGE ÉCRAN
    document.getElementById("winTitle").innerText = "🏆 Bravo " + player;

    document.getElementById("winText").innerText =
        "Tentatives : " + attempts +
        " | Meilleur score : " + bestScore +
        " | Temps : " + timer + "s";

    document.getElementById("winScreen").classList.remove("hidden");
}
/* ===================== */
/* SHUFFLE */
/* ===================== */

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
function restartGame() {
    location.reload();
}
