/* VARIABLES */

let player = "";
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let attempts = 0;
let matches = 0;

let timer = 0;
let interval;

let bestScore = localStorage.getItem("bestScore") || null;

/* DOM CACHE (PERF) */

const gameContainer = document.getElementById("game");
const timerEl = document.getElementById("timer");
const attemptsEl = document.getElementById("attempts");
const playerNameEl = document.getElementById("playerName");

/* INSTRUCTIONS */

function showInstructions() {
    const box = document.getElementById("instructions");
    if (!box) return;

    box.style.display = "block";
    box.classList.remove("hide");

    setTimeout(() => box.classList.add("hide"), 5000);
    setTimeout(() => box.style.display = "none", 5800);
}

/* START GAME */

function startSolo() {
    showInstructions();

    const name = document.getElementById("player").value.trim();
    const regex = /^[A-Za-z]{3,10}$/;

    if (!regex.test(name)) {
        alert("Nom invalide (3-10 lettres uniquement)");
        return;
    }

    player = name;

    resetGame();
    updateStats();

    interval = setInterval(() => {
        timer++;
        timerEl.innerText = "⏱ " + timer + "s";
    }, 1000);

    createBoard();
}

/* RESET GAME */

function resetGame() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    attempts = 0;
    matches = 0;
    timer = 0;

    clearInterval(interval);
    gameContainer.innerHTML = "";
}

/* CREATE BOARD */

function createBoard() {
    let images = [];

    for (let i = 1; i <= 40; i++) {
        images.push(`images/IMG${i}.png`);
    }

    let selected = shuffle(images).slice(0, 10);
    let cards = shuffle([...selected, ...selected]);

    cards.forEach(img => createCard(img));
}

/* CREATE CARD */

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

    gameContainer.appendChild(card);
}

/* FLIP CARD */

function flipCard(card, img) {
    if (lockBoard) return;
    if (firstCard && card === firstCard.card) return;
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

    setTimeout(checkMatch, 700);
}

/* CHECK MATCH */

function checkMatch() {
    if (firstCard.img === secondCard.img) {

        firstCard.card.classList.add("matched");
        secondCard.card.classList.add("matched");

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

/* UPDATE STATS */

function updateStats() {
    attemptsEl.innerText = "🎯 " + attempts;

    playerNameEl.innerText =
        player + (bestScore ? " | 🏆 " + bestScore : "");
}

/* END GAME */

function endGame() {
    clearInterval(interval);

    if (!bestScore || attempts < bestScore) {
        bestScore = attempts;
        localStorage.setItem("bestScore", bestScore);
    }

    document.getElementById("winTitle").innerText = "🏆 Bravo " + player;

    document.getElementById("winText").innerText =
        "Tentatives : " + attempts +
        " | Meilleur score : " + bestScore +
        " | Temps : " + timer + "s";

    document.getElementById("winScreen").classList.remove("hidden");
}

/* SHUFFLE (PRO) */

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/* RESTART */

function restartGame() {
    document.getElementById("winScreen").classList.add("hidden");
    startSolo();
}
