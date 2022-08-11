import { Player } from "./Player.js";
import { gameMark } from "../constants/constants.js";
import { Cell } from "./Cell.js";
import { Game } from "./Game.js";

export class ComputerPlayer extends Player {
    constructor() {
        super(0);
    }

    doComputerStep(allCells: Cell[], game: Game) {
        let id = this.generateNumberOfCell(allCells.length);
        if (allCells[id].isCellOccupied()) {
            this.doComputerStep(allCells, game);
        } else {
            let idHTML:string = `cell${id}`;
            document.getElementById(idHTML).innerHTML = `<img src="./images/${gameMark.circle}.png" alt="${gameMark.circle}">`;
            allCells[id].setCellOccupied();
            allCells[id].setCellOccupiedByElement(gameMark.circle);
            game.isGameOver();
        }
    }

    generateNumberOfCell(size: number) {
        return (Math.floor(Math.random() * size));
    }
}
