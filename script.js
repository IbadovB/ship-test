const board = document.querySelector(".board");
const scoreDisplay = document.querySelector("#score");
const startBtn = document.querySelector("#start-btn");
const restart = document.querySelector("#restart");


let ships = [];
let score = 0;
let hits = 0;

function startGame() {
    board.innerHTML = "";

    score = 0;
    hits = 0;
    scoreDisplay.innerText = score;

    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }

    const cells = document.querySelectorAll(".cell");

    ships = [];
    while (ships.length < 20) {
        let randomNumber = Math.floor(Math.random() * 100);
        if (!ships.includes(randomNumber)) {
            ships.push(randomNumber);
        }
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (cell.classList.contains("hit") || cell.classList.contains("miss")) return;

            score++;
            scoreDisplay.innerText = score;

            if (ships.includes(index)) {
                cell.classList.add("hit");
                cell.style.display.background = "blue";
                hits++;

            } else {
                cell.classList.add("miss");
                cell.style.display.background = "red";
            }

            if (hits === 20) {
                setTimeout(() => {
                    alert("You Win!");
                }, 100);
            }
        });
    });
}



restart.addEventListener("click", startGame);

startBtn.addEventListener("click", startGame);
