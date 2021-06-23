class Field {
    /** 
     * current state of the field
     * 0 = none
     * 1 = player 1
     * 2 = player 2
     */
    field = [[0,0,0],[0,0,0],[0,0,0]];

    getCell(x, y) {
        return this.field[x][y];
    }

    setCell(x, y, value) {
        this.field[x][y] = value;
    }

    checkRow(rowIdx, id) {
        return this.field[rowIdx].every((cell) => cell == id);
    }

    checkCol(colIdx, id) {
        let col = [];
        this.field.forEach((row) => col.push(row[colIdx]));
        return col.every((cell) => cell == id);
    }

    checkDiagonal(lr, id) {
        let lrIdxes = lr ? [0,1,2] : [2,1,0];
        let lrIdx = 0;
        let diag = []
        this.field.forEach((row) =>{ diag.push(row[lrIdxes[lrIdx]]); lrIdx++});
        return diag.every((cell) => cell == id);
    }

    checkWin(id) {
        let colWin = this.checkCol(0, id) || this.checkCol(1, id) || this.checkCol(2, id);
        let rowWin = this.checkRow(0, id) || this.checkRow(1, id) || this.checkRow(2, id);
        let diagWin = this.checkDiagonal(true, id) || this.checkDiagonal(false, id);

        return colWin || rowWin || diagWin;
    }
}

module.exports.Field = Field;