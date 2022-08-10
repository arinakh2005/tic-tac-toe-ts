"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
class Cell {
    constructor(id) {
        this.isOccupied = false;
        this.occupiedBy = 'unknown';
        this.id = id;
    }
    setCellOccupied() {
        this.isOccupied = true;
    }
    setCellOccupiedByElement(elem) {
        this.occupiedBy = elem;
    }
    isCellOccupied() {
        return this.isOccupied;
    }
}
exports.Cell = Cell;
