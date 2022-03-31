class Diagonal extends Movement {
    getSquares(i, boardSize = 8, depth = 8) {
        let row = Math.floor(i / boardSize)
        let col = i - (row * boardSize)
        this.boardSize = boardSize
        this.depth = depth
        
        return this.topLeft(row, col).concat(this.topRight(row, col)).concat(this.bottomLeft(row, col)).concat(this.bottomRight(row, col))
    }

    topLeft(startRow, startCol) {
        let row = startRow
        let col = startCol
        let result = []
        let i = 0

        while ((row > 0 && col > 0) && i < this.depth) {
            row--
            col--
            result.push(this.getIndex(row, col))

            i++
        }

        return result
    }

    topRight(startRow, startCol) {
        let row = startRow
        let col = startCol
        let result = []
        let i = 0

        while ((row > 0 && col < this.boardSize - 1) && i < this.depth) {
            row--
            col++
            result.push(this.getIndex(row, col))

            i++
        }

        return result
    }


    bottomLeft(startRow, startCol) {
        let row = startRow
        let col = startCol
        let result = []
        let i = 0

        while ((row < this.boardSize - 1 && col > 0) && i < this.depth) {
            row++
            col--
            result.push(this.getIndex(row, col))

            i++
        }

        return result
    }

    bottomRight(startRow, startCol) {
        let row = startRow
        let col = startCol
        let result = []
        let i = 0

        while ((row < this.boardSize - 1 && col < this.boardSize - 1) && i < this.depth) {
            row++
            col++
            result.push(this.getIndex(row, col))

            i++
        }

        return result
    }
}