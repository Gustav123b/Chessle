class Movement {
    getIndex(row, col) {
        return row * this.boardSize + col
    }

    removeUndefined(arr) {
        let result = []

        // Remove undefined values
        arr.forEach(element => {
            if (element !== undefined) result.push(element)
        });

        return result
    }
}