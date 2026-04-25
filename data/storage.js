/* SAVE / LOAD GENERIC */

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

function remove(key) {
    localStorage.removeItem(key);
}

function clearAll() {
    localStorage.clear();
}

/* PLAYER SOLO */

function savePlayer(name) {
    save("player", name);
}

function getPlayer() {
    return load("player");
}

/* MULTIJOUEUR */

function savePlayers(p1, p2) {
    save("players", { p1, p2 });
}

function getPlayers() {
    return load("players");
}

/* SCORES */

function saveScores(score1, score2) {
    save("scores", { score1, score2 });
}

function getScores() {
    return load("scores");
}

/* BEST SCORE (SOLO) */

function saveBestScore(score) {

    let best = load("bestScore");

    if (!best || score < best) {
        save("bestScore", score);
    }
}

function getBestScore() {
    return load("bestScore");
}

/* HISTORY (OPTIONNEL PRO) */

function saveGameHistory(gameData) {

    let history = load("history") || [];

    history.push(gameData);

    save("history", history);
}

function getGameHistory() {
    return load("history") || [];
}
