"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameMap = void 0;
const Cell_1 = require("./Cell");
const constants_1 = require("../constants/constants");
class GameMap {
    constructor(size, numberOfCellsToWin) {
        this.nobodyWonFlag = -1;
        let gameAreaElemHtml = document.getElementById('game-area');
        if (size < constants_1.minMapSize) {
            this.size = constants_1.minMapSize;
            gameAreaElemHtml.value = String(constants_1.minMapSize);
            alert(`Мінімальний розмір поля ${constants_1.minMapSize}х${constants_1.minMapSize}!`);
        }
        else if (size > constants_1.maxMapSize) {
            this.size = constants_1.maxMapSize;
            gameAreaElemHtml.value = String(constants_1.maxMapSize);
            alert(`Максимальний розмір поля ${constants_1.maxMapSize}х${constants_1.maxMapSize}!`);
        }
        else {
            this.size = size;
        }
        let numberOfCellsToWinElemHtml = document.getElementById('number-of-cells-for-win');
        if (numberOfCellsToWin < constants_1.minNumberOfCellsForWin) {
            this.numberOfCellsToWin = constants_1.minNumberOfCellsForWin;
            numberOfCellsToWinElemHtml.value = String(constants_1.minNumberOfCellsForWin);
            alert(`Мінімальна к-сть клітинок для виграшу ${constants_1.minNumberOfCellsForWin}!`);
        }
        else if (numberOfCellsToWin > this.size) {
            this.numberOfCellsToWin = this.size;
            numberOfCellsToWinElemHtml.value = String(this.size);
            alert(`Максимальна к-сть клітинок для виграшу ${this.size}!`);
        }
        else {
            this.numberOfCellsToWin = numberOfCellsToWin;
        }
    }
    buildGameMap(localStorageFlag) {
        // LocalStorageFlag means:
        //     0 - create new game area
        //     1 - resume game area
        let tempAllCells = [];
        const table = document.querySelector('table');
        for (let i = 0; i < this.size; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < this.size; j++) {
                const td = document.createElement('td');
                td.classList.add("cell");
                let id = `cell${((i * this.size) + j)}`;
                td.setAttribute('id', `${id}`);
                this.currentCell = new Cell_1.Cell(id);
                if (localStorageFlag === 1) {
                    if (this.allCells[((i * this.size) + j)].occupiedBy === constants_1.gameMark.cross) {
                        this.currentCell.setCellOccupied();
                        this.currentCell.setCellOccupiedByElement(constants_1.gameMark.cross);
                        td.innerHTML = `<img src="./images/${constants_1.gameMark.cross}.png" alt="${constants_1.gameMark.cross}">`;
                    }
                    if (this.allCells[((i * this.size) + j)].occupiedBy === constants_1.gameMark.circle) {
                        this.currentCell.setCellOccupied();
                        this.currentCell.setCellOccupiedByElement(constants_1.gameMark.circle);
                        td.innerHTML = `<img src="./images/${constants_1.gameMark.circle}.png" alt="${constants_1.gameMark.circle}">`;
                    }
                    tempAllCells.push(this.currentCell);
                }
                td.setAttribute('onclick', `doStep("${id}")`);
                if (localStorageFlag === 0) {
                    this.allCells.push(this.currentCell);
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        if (localStorageFlag === 1) {
            this.allCells = tempAllCells;
        }
        const box = document.querySelector('.game-area');
        box.style.visibility = 'visible';
    }
    clearGameMap() {
        window.localStorage.clear();
        let elem = document.getElementsByClassName("game-area__table")[0];
        elem.parentNode.removeChild(elem);
        let spaceForElement = document.getElementsByClassName('game-area')[0];
        const gameMap = document.createElement('table');
        gameMap.classList.add('game-area__table');
        spaceForElement.appendChild(gameMap);
        elem = document.getElementById("player-number");
        elem.parentNode.removeChild(elem);
        const labelWithPlayersNumber = document.createElement('p');
        labelWithPlayersNumber.id = 'player-number';
        labelWithPlayersNumber.textContent = "Хід: ...";
        labelWithPlayersNumber.classList.add('game-area__player-number');
        spaceForElement.appendChild(labelWithPlayersNumber);
        this.allCells = [];
        this.occupiedCells = [];
        this.currentCell = null;
        document.getElementById('btn-start').setAttribute('disabled', 'false');
    }
    isPlayerWon() {
        if (this.wonInRow())
            return true;
        if (this.wonInColumn())
            return true;
        if (this.wonInMainDiagonal())
            return true;
        if (this.wonInAntiDiagonal())
            return true;
        if (this.isAllCellsFilled()) {
            return this.nobodyWonFlag;
        }
    }
    isCellAvailableForStep(idHTML) {
        let id = +(idHTML.slice(4, 6));
        if (this.allCells[id].isCellOccupied()) {
            return true;
        }
    }
    isAllCellsFilled() {
        let counter = 0;
        this.allCells.forEach(function (item) { if (item.isOccupied === true)
            counter++; });
        return (counter === Math.pow(this.size, 2));
    }
    getCurrentCell() {
        return this.currentCell;
    }
    setCurrentCell(cellId) {
        this.currentCell = new Cell_1.Cell(cellId);
    }
    getAllCells() {
        return this.allCells;
    }
    setAllCells(allCells) {
        this.allCells = allCells;
    }
    getOccupiedCells() {
        return this.occupiedCells;
    }
    setOccupiedCells(occupiedCells) {
        this.occupiedCells = occupiedCells;
    }
    getNumberOfCellsToWin() {
        return this.numberOfCellsToWin;
    }
    setNumberOfCellsToWin(numberOfCellsToWin) {
        this.numberOfCellsToWin = numberOfCellsToWin;
    }
    getNobodyWonFlag() {
        return this.nobodyWonFlag;
    }
    checkWinCombinations(arrOfIndexes) {
        if (arrOfIndexes.every(item => item.occupiedBy === constants_1.gameMark.circle)) {
            return true;
        }
        else if (arrOfIndexes.every(item => item.occupiedBy === constants_1.gameMark.cross)) {
            return true;
        }
    }
    wonInRow() {
        let step = 0;
        let arrOfIndexes = [];
        do {
            for (let i = this.size - this.numberOfCellsToWin - step; i < (this.size * this.size); i += this.size) {
                for (let j = i; j < i + this.numberOfCellsToWin; j++) {
                    arrOfIndexes.push(this.allCells[j]);
                    if (this.checkWinCombinations(arrOfIndexes) === true
                        && arrOfIndexes.length === this.numberOfCellsToWin) {
                        return true;
                    }
                }
                arrOfIndexes = [];
            }
            step++;
        } while (this.size - this.numberOfCellsToWin - step >= 0);
    }
    wonInColumn() {
        let step = this.size - this.numberOfCellsToWin;
        let arrOfIndexes = [];
        for (let i = 0; i < (this.size * (step + 1)); i++) {
            for (let j = i; j < Math.pow(this.size, 2); j += this.size) {
                if (arrOfIndexes.length < this.numberOfCellsToWin) {
                    arrOfIndexes.push(this.allCells[j]);
                }
            }
            if (this.checkWinCombinations(arrOfIndexes) === true
                && arrOfIndexes.length === this.numberOfCellsToWin) {
                return true;
            }
            arrOfIndexes = [];
        }
    }
    wonInMainDiagonal() {
        let arrOfIndexes = [];
        let allowableIndexes = this.fillArrOfAllowableIndexesInMainDiagonal();
        for (let i = 0; i < Math.pow(this.size, 2); i++) {
            for (let j = allowableIndexes[i]; j < Math.pow(this.size, 2); j += (this.size + 1)) {
                if (arrOfIndexes.length < this.numberOfCellsToWin) {
                    arrOfIndexes.push(this.allCells[j]);
                }
            }
            if (this.checkWinCombinations(arrOfIndexes) === true
                && arrOfIndexes.length === this.numberOfCellsToWin) {
                return true;
            }
            arrOfIndexes = [];
        }
    }
    fillArrOfAllowableIndexesInMainDiagonal() {
        let arrOfAllowableIndexes = [];
        let step = this.size - this.numberOfCellsToWin;
        let i = 0;
        while (step > 0) {
            arrOfAllowableIndexes.push(i++);
            step--;
        }
        step = this.size - this.numberOfCellsToWin;
        arrOfAllowableIndexes.push(i);
        for (i = this.size; i < Math.pow(this.size, 2); i++) {
            if (step === 0) {
                return arrOfAllowableIndexes;
            }
            if ((this.size % i === 0) || (i % this.size === 0)) {
                arrOfAllowableIndexes.push(i);
                while (step > 0) {
                    arrOfAllowableIndexes.push(++i);
                    step--;
                }
                step = this.size - this.numberOfCellsToWin;
                if (arrOfAllowableIndexes.length >= Math.pow((step + 1), 2)) {
                    return arrOfAllowableIndexes;
                }
            }
        }
    }
    wonInAntiDiagonal() {
        let arrOfIndexes = [];
        let allowableIndexes = this.fillArrOfAllowableIndexesInAntiDiagonal()
            .sort(function (a, b) {
            return a - b;
        });
        for (let i = 0; i < Math.pow(this.size, 2); i++) {
            for (let j = allowableIndexes[i]; j < Math.pow(this.size, 2); j += (this.size - 1)) {
                if (arrOfIndexes.length < this.numberOfCellsToWin) {
                    arrOfIndexes.push(this.allCells[j]);
                }
            }
            if (this.checkWinCombinations(arrOfIndexes) === true
                && arrOfIndexes.length === this.numberOfCellsToWin) {
                return true;
            }
            arrOfIndexes = [];
        }
    }
    fillArrOfAllowableIndexesInAntiDiagonal() {
        let arrOfAllowableIndexes = [];
        let step = this.size - this.numberOfCellsToWin;
        let indexForRemember;
        for (let i = this.size; i < Math.pow(this.size, 2); i++) {
            if (step === 0) {
                arrOfAllowableIndexes.push(this.size - 1);
                return arrOfAllowableIndexes;
            }
            if ((this.size % i === 0) || (i % this.size === 0)) {
                i = i - 1;
                arrOfAllowableIndexes.push(i);
                indexForRemember = i;
                while (step > 0) {
                    arrOfAllowableIndexes.push(--i);
                    step--;
                }
                step = this.size - this.numberOfCellsToWin;
                i = indexForRemember + this.size;
                if (arrOfAllowableIndexes.length >= Math.pow((step + 1), 2)) {
                    return arrOfAllowableIndexes;
                }
            }
        }
    }
}
exports.GameMap = GameMap;
