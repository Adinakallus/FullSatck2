const levels = {
    1: { rows: 2, columns: 4 },
    2: { rows: 3, columns: 4 },
    3: { rows: 4, columns: 4 }
};

const loggedInUsername = localStorage.getItem("loggedInUser");
const loggedInUserData = JSON.parse(localStorage.getItem(loggedInUsername));

let currentLevel = 1;
let totalCards = levels[currentLevel].rows * levels[currentLevel].columns;
let selectedCards = [];
let successCount = 0;
let attempts = 0;

function initializeGame() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    attempts = 0;
    const imagePairs = getLevelImagePairs();
    const shuffledPairs = shuffleArray([...imagePairs]);

    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-index", i);
        card.image = shuffledPairs[i];
        card.backImage = "../IMG/cardBackground.jpg";
        card.style.backgroundImage = `url("${card.backImage}")`;

        card.addEventListener("click", () => onCardClick(i));
        gameBoard.appendChild(card);
    }
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
    document.getElementById("trophy").style.visibility = "hidden";
    document.getElementById("victory-message").style.visibility = "hidden";
    document.getElementById("score").style.visibility = "hidden";
    document.getElementById("try-again-button").style.visibility = "hidden";
    document.getElementById("game-board").style.visibility = "visible";
}

function openLevelSelector() {
    const levelList = document.getElementById("level-list");
    levelList.style.display = levelList.style.display === "none" ? "flex" : "none";
}

function selectLevel(level) {
    currentLevel = level;
    totalCards = levels[currentLevel].rows * levels[currentLevel].columns;
    initializeGame();
    document.getElementById("level-list").style.display = "none";
}

function onCardClick(index) {
    const card = document.querySelector(`.card[data-index="${index}"]`);

    if (selectedCards.length < 2 && !selectedCards.includes(card)) {
        attempts++;
        card.style.background = `url("${card.image}")`;
        card.style.visibility = "visible";
        card.style.backgroundSize = 'cover';
        selectedCards.push(card);
        if (selectedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const card1 = selectedCards[0];
    const card2 = selectedCards[1];
    const frontImage1 = card1.image;
    const frontImage2 = card2.image;

    if (frontImage1 === frontImage2) {
        successCount += 2;
        animateMatch(card1, card2);
    } else {
        card1.style.backgroundImage =  `url("${card1.backImage}")`;
        card2.style.backgroundImage =  `url("${card2.backImage}")`;
    }

    selectedCards = [];

    if (successCount === totalCards) {
        victory();
    }
}

function victory() {
    setTimeout(() => {
        document.getElementById("trophy").style.visibility = "visible";
        document.getElementById("victory-message").style.visibility = "visible";
        document.getElementById("score").style.visibility = "visible";
        document.getElementById("try-again-button").style.visibility = "visible";
        document.getElementById("score").innerText = "Attempts: " + attempts;
        successCount = 0;
    }, 1000);
}

function animateMatch(card1, card2) {
    const trophy = document.getElementById("trophy");
    const animationDuration = 1000;

    if (card1 && card2) {
        Promise.all([
            card1.animate(
                [
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.2)' },
                    { transform: 'scale(1)' },
                    { transform: `translate(${trophy.offsetLeft - card1.offsetLeft}px, ${trophy.offsetTop - card1.offsetTop}px)` },
                    { transform: 'scale(0)' }
                ],
                {
                    duration: animationDuration,
                    easing: 'ease-out'
                }
            ).finished,
            card2.animate(
                [
                    { transform: 'scale(1)' },
                    { transform: 'scale(1.2)' },
                    { transform: 'scale(1)' },
                    { transform: `translate(${trophy.offsetLeft - card2.offsetLeft}px, ${trophy.offsetTop - card2.offsetTop}px)` },
                    { transform: 'scale(0)' }
                ],
                {
                    duration: animationDuration,
                    easing: 'ease-out'
                }
            ).finished
        ]).then(() => {
            handleAnimationFinish(card1);
            handleAnimationFinish(card2);
        });} else {
            console.error("Invalid card elements for animation");
        }
}

function handleAnimationFinish(card) {
    card.style.backgroundImage = '';
    card.style.visibility = 'hidden';
}

function getLevelImagePairs() {
    const images = [
        "../MemoryImg/apple.jpg",
        "../MemoryImg/banana.jpg",
        "../MemoryImg/carrot.jpg",
        "../MemoryImg/cucumber.jpg",
        "../MemoryImg/onion.jpg",
        "../MemoryImg/orange.jpg",
        "../MemoryImg/potato.jpg",
        "../MemoryImg/tomato.jpg",
        "../MemoryImg/eggplanet.jpg"
    ];
    const levelImages = images.slice(0, levels[currentLevel].rows * levels[currentLevel].columns / 2);
    return levelImages.concat(levelImages); //duplicate
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function tryAgain() {
    document.getElementById("victory-message").style.display = "none";
    initializeGame();
}

function navigateToAllGames() {
    window.location.href = "../HTML/Main.html";
}

initializeGame();