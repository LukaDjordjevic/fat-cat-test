export const range = (start, end) => {
  const length = end - start
  return Array.from({ length }, (_, i) => start + i)
}

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
    console.log('allOk')
    return levelFields
  } else {
    console.log('Fokked up, starting over')
    return createLevel(x, y, levelNumber, numberOfBoardSquares)
  }
}

export const getLegalMoves = (x, y, numberOfBoardSquares) => {
  const possibleFields = [[x, y - 3], [x + 2, y - 2], [x + 3, y], [x + 2, y + 2], [x, y + 3], [x - 2, y + 2], [x - 3, y], [x - 2, y - 2]]
  const legalMoves = possibleFields.reduce((acc, field) => {
    if (isFieldValid(field[0], field[1], numberOfBoardSquares)) {
      acc.push(field)
      return acc
    }
    return acc
  }, [])
  return legalMoves
}

const getAvailableFields = (x, y, numberOfBoardSquares, levelFields) => {
  const stringifiedLevelFields = levelFields.map(field => `${field[0]},${field[1]}`)
  const legalMoves = getLegalMoves(x, y, numberOfBoardSquares)
  const availableFields = legalMoves.reduce((acc, field) => {
    if (!stringifiedLevelFields.includes(`${field[0]},${field[1]}`)) {
      acc.push(field)
      return acc
    }
    return acc
  }, [])
  // console.log('got available fields', availableFields)
  return availableFields
}

const isFieldValid = (x, y, numberOfBoardSquares) => {
  return x >= 0 && x < numberOfBoardSquares && y >=0 && y < numberOfBoardSquares
}

// getAvailableFields(0, 0, 10, [[2, 2]])
// const level = createLevel(5, 5, 50, 10)
// console.log('returned level', level)
// console.log(getLegalMoves(0, 0, 10))
