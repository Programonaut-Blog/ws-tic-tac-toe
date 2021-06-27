class Field {
    /** 
     * current state of the field
     * 0 = none
     * 1 = player 1
     * 2 = player 2
     */
    field = [[0,0,0],[0,0,0],[0,0,0]];

    getCell(x, y) {
        return this.field[y][x];
    }

    setCell(x, y, value) {
        this.field[y][x] = value;
    }

    checkCol(colIdx, id) {
        return this.field[colIdx].every((cell) => cell == id);
    }

    checkRow(rowIdx, id) {
        let row = [];
        this.field.forEach((col) => row.push(col[rowIdx]));
        return row.every((cell) => cell == id);
    }

    checkDiagonal(lr, id) {
        let lrIdxes = lr ? [0,1,2] : [2,1,0];
        let lrIdx = 0;
        let diag = []
        this.field.forEach((col) =>{ diag.push(col[lrIdxes[lrIdx]]); lrIdx++});
        return diag.every((cell) => cell == id);
    }

    checkWin(id) {
        let colWin = this.checkCol(0, id) || this.checkCol(1, id) || this.checkCol(2, id);
        let rowWin = this.checkRow(0, id) || this.checkRow(1, id) || this.checkRow(2, id);
        let diagWin = this.checkDiagonal(true, id) || this.checkDiagonal(false, id);

        return colWin || rowWin || diagWin;
    }

    checkGameOver(id) {
        let fieldFull = this.field[0].every((cell) => cell != 0) && this.field[1].every((cell) => cell != 0) && this.field[2].every((cell) => cell != 0);
        let win = this.checkWin(id)

        return {"over": fieldFull || win, "id": win ? id : 0};
    }

    resetField() {
        this.field = [[0,0,0],[0,0,0],[0,0,0]];
    }

    getField() {
        return this.field;
    }
}

module.exports.Field = Field;