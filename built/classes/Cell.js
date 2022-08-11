export class Cell {
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
