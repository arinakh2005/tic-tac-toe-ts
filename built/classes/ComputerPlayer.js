"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComputerPlayer = void 0;
const Player_1 = require("./Player");
const constants_1 = require("../constants/constants");
class ComputerPlayer extends Player_1.Player {
    constructor() {
        super(0);
    }
    doComputerStep(allCells, game) {
        let id = this.generateNumberOfCell(allCells.length);
        if (allCells[id].isCellOccupied()) {
            this.doComputerStep(allCells, game);
        }
        else {
            let idHTML = `cell${id}`;
            document.getElementById(idHTML).innerHTML = `<img src="./images/${constants_1.gameMark.circle}.png" alt="${constants_1.gameMark.circle}">`;
            allCells[id].setCellOccupied();
            allCells[id].setCellOccupiedByElement(constants_1.gameMark.circle);
            game.isGameOver();
        }
    }
    generateNumberOfCell(size) {
        return (Math.floor(Math.random() * size));
    }
}
exports.ComputerPlayer = ComputerPlayer;
