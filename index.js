let boardSize = 8
let available_row = ["a", "b", "c", "d", "e", "f", "g", "h"]
let available_col = ["8", "7", "6", "5", "4", "3", "2", "1"]

const resultContainerElement = document.querySelector(".result-container")
const attemptElement = document.getElementById("attempt")

let attempt
let available_pieces = []
let placed_pieces = []
let answer
let king

initGame()

function initGame() {
    resultContainerElement.classList.add("hide")
    attempt = 1

    updateAttempt()
    generateBoard()
    newGuess()
    answer = getRandomSquares(1)
    let coord = answer[0];
    let index = getIndexFromCoord(coord)
    king = new King(index)
}

function getStartPieces() {
    return ["Queen", "Knight", "Bishop"]
}

function newGuess() {
    available_pieces = getStartPieces()
    placed_pieces = []
    updateUnplacedPieces()
}

function updateUnplacedPieces() {
    const root = document.querySelector(".unplaced-pieces-container")
    root.innerHTML = ""

    available_pieces.forEach(piece => {
        let e = getUnplacedPieceElement(lowerFirstLetter(piece))
        root.innerHTML += e
    });

    function getUnplacedPieceElement(piece) {
        return `<div class="unplaced-piece ${piece}"></div>`
    }
}

function updateAttempt() {
    attemptElement.innerHTML = attempt
}

function confirmBtn() {
    let allSquares = []

    // Reveal vision for pieces
    placed_pieces.forEach(piece => {
        allSquares = allSquares.concat(piece.getSquaresCoord())
        revealSquares(piece, "vision")
    });
    let result = king.checkmateStatus(allSquares)

    // Is game over
    if (result == "checkmate" || result == "stalemate")
        gameOver(result)
    else {
        // Create new board
        attempt++
        updateAttempt()
        generateBoard()
        newGuess()
    }
}

function squareClicked(e) {

    console.log(e.dataset.attempt)
    console.log(attempt)
    // Cannot interact with square from previous board
    if (e.dataset.attempt != attempt) return

    let pieceChild = e.querySelector(".piece")
    // Remove if clicking on already placed piece
    if (pieceChild !== null) {
        let piece = capitalizeFirstLetter(pieceChild.dataset.piece)
        let index = getIndexFromCoord(e.dataset.square)
        available_pieces.push(piece)
        pieceChild.remove()

        placed_pieces.forEach((piece, j) => {
            if (piece.i == index) placed_pieces.splice(j, 1)
        });
    }
    else if (available_pieces.length <= 0) return
    else {
        let piece = available_pieces[0]
        let square = e.dataset.square
        let i = getIndexFromCoord(square)
        let pieceOb = eval(`new ${piece}(${i})`)

        placePiece(e, pieceOb)

        available_pieces.splice(0, 1)
    }
    updateUnplacedPieces()
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function placePiece(e, piece) {
    placed_pieces.push(piece)

    e.innerHTML += (piece.getElement())
}

function generateBoard() {
    const root = document.querySelector(".boards-container")
    const board = getBoard()
    root.insertBefore(board, root.firstChild);

    let available_squares = ["light", "dark"]
    let alternate_index = 0

    for (let coli = 0; coli < boardSize; coli++) {
        for (let rowi = 0; rowi < boardSize; rowi++) {
            let i = rowi * boardSize + coli
            let col = available_col[coli]
            let row = available_row[rowi]
            let square = available_squares[alternate_index % 2]
            let e = getSquare(col, row, square)
            board.innerHTML += e

            alternate_index++
        }
        alternate_index++
    }

    function getBoard() {
        let board = `<div class="board"></div>`
        var div = document.createElement('div');
        div.innerHTML = board.trim();

        return div.firstChild;
    }

    function getSquare(col, row, square) {
        let coord = row + col
        let index = getIndexFromCoord(coord)

        return `<div class="square bg-${square}" data-square="${row + col}" data-attempt="${attempt}" onclick="squareClicked(this)">
        <span class="index">${""}</span><span class="coord">${""}</span></div>`
    }
}

function getIndexFromCoord(coord) {
    let col = parseInt(available_row.indexOf(coord[0]))
    let row = parseInt(available_col.indexOf(coord[1]))

    return row * boardSize + col
}

function getCoordFromIndex(i) {
    let coli = Math.floor(i / boardSize)
    let rowi = i - (coli * boardSize)

    let col = available_col[coli]
    let row = rowi

    return available_row[row] + col
}

function getElementFromCoord(coord) {
    return document.querySelector(`[data-square~=${coord}]`)
}

function getRandomSquares(am = 1) {
    let result = []
    let available_squares = []

    for (let i = 0; i < boardSize * boardSize; i++)
        available_squares.push(i)

    for (let i = 0; i < am; i++) {
        let rand = Math.round(Math.random() * (available_squares.length - 1))
        let index = available_squares[rand]
        let coord = getCoordFromIndex(index)
        result.push(coord)
        available_squares.splice(rand, 1)
    }

    return result
}

function revealSquares(piece, type) {

    if (type == "vision") {
        let squares = piece.getSquaresCoord()
        let className = "bg-grey"

        // Is piece checking the king
        if (king.isCheck(squares)) {
            piece.check = true
            className = "bg-yellow"
        }

        squares.forEach((square, i) => {
            let e = document.querySelector(`[data-square~=${square}]`)
            try {
                e.classList.remove("bg-yellow")
                e.classList.add(className)
            } catch (error) {
                console.log(squares)
                console.log(square)
                console.log(`i: ${i}`)
            }
        });
    }
    else if (type == "checkmate") {
        let squares = king.coordSquares
        squares.push(king.coord)

        squares.forEach(square => {
            let e = document.querySelector(`[data-square~=${square}]`)
            e.classList.add("bg-green")
            e.classList.remove("bg-yellow")
            e.classList.remove("bg-grey")
        });
    }
}

function gameOver(result) {
    resultContainerElement.classList.remove("hide")
    document.getElementById("result").innerHTML = `${capitalizeFirstLetter(result)}!`

    const kingSquareElement = getElementFromCoord(king.coord)
    placePiece(kingSquareElement, king)

    revealSquares(undefined, "checkmate")
}

