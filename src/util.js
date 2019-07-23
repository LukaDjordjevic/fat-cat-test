// Return array filled with integers >= start && < end
export const range = (start, end) => {
  const length = end - start
  return Array.from({ length }, (_, i) => start + i)
}

// Is field inside the board?
const isFieldInsideBoard = (x, y, numberOfBoardSquares) => x >= 0 && x < numberOfBoardSquares && y >= 0 && y < numberOfBoardSquares

// Return all legal moves based on position alone
export const getLegalMoves = (x, y, numberOfBoardSquares) => {
  const possibleFields = [[x, y - 3], [x + 2, y - 2], [x + 3, y], [x + 2, y + 2], [x, y + 3], [x - 2, y + 2], [x - 3, y], [x - 2, y - 2]]
  const legalMoves = possibleFields.filter(field => isFieldInsideBoard(field[0], field[1], numberOfBoardSquares))
  return legalMoves
}

// Return avaiable fields for level creator to choose from
const getAvailableFields = (x, y, levelFields, numberOfBoardSquares) => {
  const stringifiedLevelFields = levelFields.map(field => `${field[0]},${field[1]}`)
  const legalMoves = getLegalMoves(x, y, numberOfBoardSquares)
  const availableFields = legalMoves.filter(field => !stringifiedLevelFields.includes(`${field[0]},${field[1]}`))
  return availableFields
}

// Order input array of moves by the amount of possible futher moves for that move. Speeds up "tour" algorithm.
const getOrderedMoves = (availableMoves, levelFields, numberOfBoardSquares) => {
  const countedMoves = availableMoves.map(move => ({
    move,
    possibleMoves: getAvailableFields(move[0], move[1], levelFields, numberOfBoardSquares).length,
  }))
  return countedMoves.sort((a, b) => a.possibleMoves - b.possibleMoves).map(move => move.move)
}

// Recursive bit of the "tour" algorithm. It essentially tries to find a solution by trying every possible
// move combination via recursive calls until the solution is found.
const makeNextMove = (x, y, levelFields, levelNumber, numberOfBoardSquares) => {
  const levelCopy = JSON.parse(JSON.stringify(levelFields))
  levelCopy.push([x, y])
  if (levelCopy.length === levelNumber) return [[x, y]] // Level solved, start returning.
  // Otherwise get available moves
  let availableMoves = getAvailableFields(x, y, levelCopy, numberOfBoardSquares)
  // Then order them by number of available further moves for that move (speeds thing up a lot)
  availableMoves = getOrderedMoves(availableMoves, levelCopy, numberOfBoardSquares)
  // Finally make recursive calls to every possible move
  for (let i = 0; i < availableMoves.length; i += 1) {
    const returnArray = makeNextMove(availableMoves[i][0], availableMoves[i][1], levelCopy, levelNumber, numberOfBoardSquares)
    if (returnArray) { // Solution exists, put current [x, y] at the begining of return array.
      returnArray.unshift([x, y])
      return returnArray // Return to outer iteration.
    }
  }
  return false // No solution found in this iteration.
}

// A naive "tour" algorithm for high levels. Returns first found solution.
function tour(x, y, levelNumber, numberOfBoardSquares) {
  return makeNextMove(x, y, [], levelNumber, numberOfBoardSquares)
}

// Generate level.
export const createLevel = (x, y, levelNumber, numberOfBoardSquares) => {
  if (levelNumber > 80) { // Use "tour" algorithm for high levels
    return tour(x, y, levelNumber, numberOfBoardSquares)
  }
  // Otherwise use randomized algorithm.
  const levelFields = [[x, y]]
  let lastField = [x, y]
  let allOk = true
  for (let i = 0; i < levelNumber; i += 1) {
    const availableFields = getAvailableFields(lastField[0], lastField[1], levelFields, numberOfBoardSquares)
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
  }
  return createLevel(x, y, levelNumber, numberOfBoardSquares)
}
