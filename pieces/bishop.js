class Bishop extends Piece {
    constructor(i) {
        super()

        this.i = i
        this.coord = this.getCoordFromIndex(i)
        this.diagonal = new Diagonal()
        this.indexSquares = this.diagonal.getSquares(this.i)
        this.name = "bishop"
    }
}