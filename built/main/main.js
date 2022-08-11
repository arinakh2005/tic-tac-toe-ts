'use strict';
import { Game } from "../classes/Game.js";
let game;
export function createNewGame() {
    let haveUnfinishedGame = JSON.parse(window.localStorage.getItem('haveUnfinishedGame'));
    game = new Game();
    game.createNewGame(haveUnfinishedGame);
}
export function doStep(id) {
    game.doStep(id);
}
export function restartGame() {
    if (game) {
        game.getGameMap().clearGameMap();
    }
    createNewGame();
}
document.getElementById("btn-start").addEventListener("click", createNewGame);
document.getElementById("btn-clear").addEventListener("click", restartGame);
document.getElementById("game-area").addEventListener("change", restartGame);
document.getElementById("number-of-cells-for-win").addEventListener("change", restartGame);
document.getElementById("game-mode").addEventListener("change", restartGame);
