class Knight extends Piece {
    constructor(i) {
        super()

        this.i = i
        this.coord = this.getCoordFromIndex(i)
        this.knightMovement = new KnightMovement()
        this.indexSquares = this.knightMovement.getSquares(this.i)
        this.name = "knight"
    }
}