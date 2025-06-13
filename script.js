const board = document.querySelector(".board");
const scoreDisplay = document.querySelector("#score");
const startBtn = document.querySelector("#start-btn");
const restart = document.querySelector("#restart");

let grid = [];
let ships = [];
let score = 0;
let hits = 0;

const shipConfigs = [
    { size: 4, count: 1 },
    { size: 3, count: 2 },
    { size: 2, count: 3 },
    { size: 1, count: 4 },
];

function createGrid() {
    board.innerHTML = "";
    grid = [];
    ships = [];
    score = 0;
    hits = 0;
    scoreDisplay.innerText = score;

    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
        grid.push(cell);
    }
}

function placeAllShips() {
    createGrid();

    const occupied = new Set();

    for (const config of shipConfigs) {
        let placed = 0;
        while (placed < config.count) {
            const isHorizontal = Math.random() < 0.5;
            const x = Math.floor(Math.random() * (isHorizontal ? 10 - config.size + 1 : 10));
            const y = Math.floor(Math.random() * (isHorizontal ? 10 : 10 - config.size + 1));

            const shipCells = [];

            let valid = true;

            for (let i = 0; i < config.size; i++) {
                const nx = isHorizontal ? x + i : x;
                const ny = isHorizontal ? y : y + i;
                const idx = ny * 10 + nx;

                if (hasNeighbor(occupied, nx, ny)) {
                    valid = false;
                    break;
                }

                shipCells.push(idx);
            }

            if (valid) {
                for (const idx of shipCells) {
                    occupied.add(idx);
                    markCellAsShip(idx);
                }
                ships.push(shipCells);
                placed++;
            }
        }
    }

  
    grid.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (cell.classList.contains("hit") || cell.classList.contains("miss")) return;

            score++;
            scoreDisplay.innerText = score;

            if (cell.classList.contains("ship")) {
                cell.classList.add("hit"); 
                hits++;
                if (hits === 20) {
                    setTimeout(() => alert("You Win!"), 100);
                }
            } else {
                cell.classList.add("miss"); 
            }
        });
    });
}

function hasNeighbor(occupied, x, y) {
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
                const idx = ny * 10 + nx;
                if (occupied.has(idx)) return true;
            }
        }
    }
    return false;
}

function markCellAsShip(index) {
    const cell = grid[index];
    cell.classList.add("ship");
}

startBtn.addEventListener("click", () => {
    placeAllShips();
});

restart.addEventListener("click", () => {
    placeAllShips();
});