/* VARIABLES */

let players = ["", ""];
let scores = [0, 0];
let currentPlayer = 1;

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let attempts = 0;
let matches = 0;

/* TIMER GLOBAL */
let timer = 0;
let interval;

/* TIMER PAR TOUR */
let turnTime = 10;
let turnInterval;
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

    
/* START GAME */

function startMulti() {
    showInstructions();
    const p1 = document.getElementById("p1").value.trim();
    const p2 = document.getElementById("p2").value.trim();

    const regex = /^[A-Za-z]{3,10}$/;

    if (!regex.test(p1) || !regex.test(p2)) {
        alert("Nom invalide (3-10 lettres uniquement)");
        return;
    }

    players[0] = p1;
    players[1] = p2;

    document.getElementById("game").innerHTML = "";

    scores = [0, 0];
    currentPlayer = 1;
    attempts = 0;
    matches = 0;
    timer = 0;

    updateStats();

    /* TIMER GLOBAL */
    clearInterval(interval);
    interval = setInterval(() => {
        timer++;
        document.getElementById("timer").innerText = "⏱ " + timer + "s";
    }, 1000);

    createBoard();
    resetTurnTimer(); // 🔥
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

    document.getElementById("game").appendChild(card);
}

/* FLIP CARD */

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

    setTimeout(checkMatch, 600);
}

/* CHECK MATCH */

function checkMatch() {

    if (firstCard.img === secondCard.img) {

        firstCard.card.classList.add("matched");
        secondCard.card.classList.add("matched");

        /* 🔒 BLOQUER interaction */
        firstCard.card.style.pointerEvents = "none";
        secondCard.card.style.pointerEvents = "none";

        scores[currentPlayer - 1]++;
        matches++;

        resetTurnTimer(); // 🔥 reset chrono si bon

    } else {

        firstCard.card.classList.remove("flip");
        secondCard.card.classList.remove("flip");

        switchPlayer(); // 🔥 changement joueur auto
    }

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    updateStats();

    if (matches === 10) endGame();
}

/* TIMER TOUR */

function resetTurnTimer() {

    clearInterval(turnInterval);
    turnTime = 10;
    updateTurnTimer();

    turnInterval = setInterval(() => {

        turnTime--;
        updateTurnTimer();

        if (turnTime <= 0) {
            switchPlayer();
        }

    }, 1000);
}

function updateTurnTimer() {
    document.getElementById("turnTimer").innerText = "⏳ " + turnTime;
}

/* SWITCH PLAYER */

function switchPlayer() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;

    currentPlayer = currentPlayer === 1 ? 2 : 1;

    updateStats();
    resetTurnTimer();
}

/* UPDATE STATS */

function updateStats() {

    document.getElementById("attempts").innerText = "🎯 " + attempts;

    document.getElementById("score1").innerText =
        players[0] + " : " + scores[0];

    document.getElementById("score2").innerText =
        players[1] + " : " + scores[1];

    let turn = document.getElementById("playerTurn");

    turn.innerText = "Tour : " + players[currentPlayer - 1];

    turn.classList.remove("player1-active", "player2-active");

    turn.classList.add(
        currentPlayer === 1 ? "player1-active" : "player2-active"
    );
}

/* END GAME */

function endGame() {

    clearInterval(interval);
    clearInterval(turnInterval);

    let winner;

    if (scores[0] > scores[1]) {
        winner = players[0];
    } else if (scores[1] > scores[0]) {
        winner = players[1];
    } else {
        winner = "Égalité 🤝";
    }

    document.getElementById("winTitle").innerText = "🏆 " + winner;
    document.getElementById("winText").innerText =
        players[0] + " : " + scores[0] + " | " +
        players[1] + " : " + scores[1];

    document.getElementById("winScreen").classList.remove("hidden");
}

/* SHUFFLE */

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function restartGame() {
    location.reload();
}
