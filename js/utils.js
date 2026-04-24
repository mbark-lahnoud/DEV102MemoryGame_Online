/* VALIDATION NOM */

const NAME_REGEX = /^[A-Za-z]{3,10}$/;

function validateName(name) {
    return NAME_REGEX.test(name);
}

/* SHUFFLE (FIABLE) */

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/* LOCAL STORAGE */

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

/* TIMER */

function startTimer(callback) {
    let time = 0;
    return setInterval(() => {
        time++;
        callback(time);
    }, 1000);
}

function stopTimer(interval) {
    clearInterval(interval);
}

/* UI HELPERS */

function $(id) {
    return document.getElementById(id);
}

function updateText(id, text) {
    const el = $(id);
    if (el) el.textContent = text;
}

function addClass(id, className) {
    const el = document.getElementById(id);
    if (el) el.classList.add(className);
}

function removeClass(id, className) {
    const el = document.getElementById(id);
    if (el) el.classList.remove(className);
}

/* RANDOM IMAGES */

function getRandomImages(count = 10, max = 40) {

    let images = [];

    for (let i = 1; i <= max; i++) {
        images.push(`images/IMG${i}.png`);
    }

    let selected = shuffleArray(images).slice(0, count);

    return shuffleArray([...selected, ...selected]);
}
