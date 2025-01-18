const overlay = document.querySelector("[data-overlay]");

document.addEventListener("DOMContentLoaded", () => {
    overlay.classList.remove('unloaded');
});

let selectedWords = [];
const startButton = document.getElementById("start-button");
const retryButton = document.querySelector("[data-retry]");
let ended = false;

function hideOverlay() {
    const content = document.querySelector(".content");
    const body = document.body;

    overlay.classList.add("fade-out");
    setTimeout(() => {
        body.classList.remove('no-scroll');
    }, 400);
    content.classList.remove('content');
}

startButton.addEventListener("click", function () {
    hideOverlay();
});

retryButton.addEventListener("click", function () {
    location.reload();
});

// Passa alla schermata successiva
function nextScreen(currentScreen) {
    console.log("Funzione nextScreen chiamata per la schermata:", currentScreen);

    const dropzones = getDropzones(currentScreen);
    if (!validateDropzones(dropzones)) return;

    addSelectedWords(dropzones);
    updateCloudWords();

    hideCurrentScreen(currentScreen);
    showNextScreen(currentScreen);
}

// Query sulle dropzone
function getDropzones(currentScreen) {
    return Array.from(document.querySelectorAll(`.dropzone[data-swapy-slot^="screen-${currentScreen}-"]`)).filter(dropzone => dropzone.style.display !== 'none');
}

// Funzione per validare le dropzone
function validateDropzones(dropzones) {
    let filledCount = dropzones.filter(dropzone => dropzone.querySelectorAll('.draggable').length > 0).length;

    if (!ended) {
        if (filledCount < 2) {
            alert("Devi trascinare 2 parole!");
            return false;
        }
    return true;
    }
}

// Funzione per aggiungere le parole selezionate all'array (nuvola)
function addSelectedWords(dropzones) {
    dropzones.forEach(dropzone => {
        const items = dropzone.querySelectorAll('.draggable');
        items.forEach(item => {
            const word = item.textContent;
            if (!selectedWords.includes(word)) { // Fix per eviutare duplicati
                selectedWords.push(word);
            }
        });
    });
}

// Funzione per nascondere la schermata corrente e le dropzone relative
function hideCurrentScreen(currentScreen) {
    document.getElementById(`screen${currentScreen}`).style.display = 'none';

    document.querySelector(`.subtitle h2.subtitle-screen${currentScreen}`).style.display = 'none';

    const dropzones = document.querySelectorAll(`.dropzone[data-swapy-slot^="screen-${currentScreen}-"]`);
    dropzones.forEach(dropzone => {
        dropzone.style.display = 'none';
    });
}

// Nextscreen + screen finale di stampa
function showNextScreen(currentScreen) {
    if (currentScreen === 4) {
        // Mostra la screen finale 5
        document.getElementById('screen5').style.removeProperty('display');
        document.getElementById('screen5').classList.add("end-screen");
        document.querySelector('.subtitle h2.subtitle-screen5').style.display = 'flex';
        retryButton.style.display = 'flex';
        ended = true;
        // debugger;
        console.log("Valore const ended: ", ended);
    } else {
        document.getElementById(`screen${currentScreen + 1}`).style.display = 'flex';
        document.querySelector(`.subtitle h2.subtitle-screen${currentScreen + 1}`).style.display = 'flex';

        // Mostra solo 2 dropzone della screen successiva
        const nextDropzones = document.querySelectorAll(`.dropzone[data-swapy-slot^="screen-${currentScreen + 1}-"]`);
        nextDropzones.forEach((dropzone, index) => {
            if (index < 2) {
                dropzone.style.display = 'flex';
            } else {
                dropzone.style.display = 'none';
            }
        });
    }
}

// Aggiorna le parole nella nuvola
function updateCloudWords() {
    const cloudWordsDivs = document.querySelectorAll('.word-div');
    const totalWords = selectedWords.length;

    for (let i = 0; i < cloudWordsDivs.length; i++) {
        if (i < totalWords) {
            cloudWordsDivs[i].textContent = selectedWords[i];
        } else {
            cloudWordsDivs[i].textContent = '';
        }
    }

    console.log("Nuvola aggiornata con parole:", selectedWords); // da levare
}

// Funzione stampa ez
function printCloud() {
    window.print();
}

document.addEventListener("DOMContentLoaded", () => {
    const nextButtons = document.querySelectorAll('.next-button');
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentScreen = parseInt(button.getAttribute('data-screen'));
            console.log("Pulsante Avanti cliccato per la schermata:", currentScreen); // Debug
            nextScreen(currentScreen);
        });
    });

    const finishButton = document.getElementById('finish-button');
    if (finishButton) {
        finishButton.addEventListener('click', printCloud);
    }
});