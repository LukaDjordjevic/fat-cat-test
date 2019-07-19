// Return array filled with integers >= start && < end
export const range = (start, end) => {
  const length = end - start
  return Array.from({ length }, (_, i) => start + i)
}

// Generate level. It randomly chooses one of the available fields until the correct number is reached.
// If it fails (e.g. no more legal moves left && not enough fields selected) it will optimistically
// try again via the recursive call.
// Useful up until level 80 for 10x10 board after which it will probably cause max stack size exception.
// Different, non random algorithm is needed for levels > 80 but it's currently missing due to time constraints.
export const createLevel = (x, y, levelNumber, numberOfBoardSquares) => {
  const levelFields = [[x, y]]
  let lastField = [x, y]
  let allOk = true
  for (let i = 0; i < levelNumber; i++) {
    const availableFields = getAvailableFields(lastField[0], lastField[1], numberOfBoardSquares, levelFields)
    if (!availableFields.length) {
      allOk = false
      break
    }
    const nextField = availableFields[Math.floor(Math.random() * availableFields.length)]
    levelFields.push(nextField)
    lastField = [nextField[0], nextField[1]]
  }
  if (allOk) {
    return levelFields
  } else {
    return createLevel(x, y, levelNumber, numberOfBoardSquares)
  }
}

// Return avaiable fields for level creator to choose from
const getAvailableFields = (x, y, numberOfBoardSquares, levelFields) => {
  const stringifiedLevelFields = levelFields.map(field => `${field[0]},${field[1]}`)
  const legalMoves = getLegalMoves(x, y, numberOfBoardSquares)
  const availableFields = legalMoves.filter(field => !stringifiedLevelFields.includes(`${field[0]},${field[1]}`))
  return availableFields
}

// Return all legal moves based on position alone
export const getLegalMoves = (x, y, numberOfBoardSquares) => {
  const possibleFields = [[x, y - 3], [x + 2, y - 2], [x + 3, y], [x + 2, y + 2], [x, y + 3], [x - 2, y + 2], [x - 3, y], [x - 2, y - 2]]
  const legalMoves = possibleFields.filter(field => isFieldInsideBoard(field[0], field[1], numberOfBoardSquares))
  return legalMoves
}

// Is field inside the board?
const isFieldInsideBoard = (x, y, numberOfBoardSquares) => {
  return x >= 0 && x < numberOfBoardSquares && y >=0 && y < numberOfBoardSquares
}
