import { Player } from "./Player.js";
import { gameMark } from "../constants/constants.js";
export class ComputerPlayer extends Player {
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
            document.getElementById(idHTML).innerHTML = `<img src="./images/${gameMark.circle}.png" alt="${gameMark.circle}">`;
            allCells[id].setCellOccupied();
            allCells[id].setCellOccupiedByElement(gameMark.circle);
            game.isGameOver();
        }
    }
    generateNumberOfCell(size) {
        return (Math.floor(Math.random() * size));
    }
}
