class KingMovement extends Movement {
    getSquares(i, boardSize = 8) {
        let row = Math.floor(i / boardSize)
        let col = i - (row * boardSize)
        this.boardSize = boardSize

        let result = [this.up(row, col), this.right(row, col), this.down(row, col), this.left(row, col)]

        return this.removeUndefined(result)
    }

    up(startRow, startCol) {
        let row = startRow - 1
        let col = startCol

        if (row < 0) return

        return this.getIndex(row, col)
    }

    right(startRow, startCol) {
        let row = startRow
        let col = startCol + 1

        if (col >= this.boardSize) return

        return this.getIndex(row, col)
    }

    down(startRow, startCol) {
        let row = startRow + 1
        let col = startCol

        if (row >= this.boardSize) return

        return this.getIndex(row, col)
    }

    left(startRow, startCol) {
        let row = startRow
        let col = startCol - 1

        if (col < 0) return

        return this.getIndex(row, col)
    }
}