const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    const rat = hole.querySelector('.rat');
    rat.style.display = 'block';
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        rat.style.display = 'none';
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    score = 0;
    timeUp = false;
    peep();
    setTimeout(() => {
        timeUp = true;
        if (score >= 5) {
            alert("No rats in sight");
        } else if (score >= 3) {
            alert("You're mid");
        } else {
            alert("You suck");
        }
    }, 10000);
}

function bonk(e) {
    if (!e.isTrusted) return;
    const hammer = this.querySelector('.hammer');
    if (hammer) {
        hammer.style.display = 'block';
        setTimeout(() => {
            hammer.style.display = 'none';
        }, 500);
    }
    const rat = this.querySelector('.rat');
    if (rat && rat.style.display !== 'none') {
        score++;
        scoreBoard.textContent = score;
        rat.style.display = 'none';
    }
}

holes.forEach(hole => hole.addEventListener('click', bonk));

startGame();
