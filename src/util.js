export const range = (start, end) => {
  const length = end - start
  return Array.from({ length }, (_, i) => start + i)
}

export const createLevel = (x, y, levelNumber, numberOfBoardSquares) => {
  const levelFields = [[x, y]]
  let lastField = [x, y]
  let allOk = true
  for (let i = 0; i < levelNumber - 1; i++) {
    const availableFields = getAvailableFields(lastField[0], lastField[1], numberOfBoardSquares, levelFields)
    if (!availableFields.length) {
      console.log('No more available fields left, fok')
      allOk = false
      break
    }
    const nextField = availableFields[Math.floor(Math.random() * availableFields.length)]
    levelFields.push(nextField)
    lastField = [nextField[0], nextField[1]]
  }
  if (allOk) {
    console.log('allOk')
    console.log(levelFields)
    return levelFields
  } else {
    console.log('Foked up, starting over')
    return createLevel(x, y, levelNumber, numberOfBoardSquares)
  }
}

const getAvailableFields = (x, y, numberOfBoardSquares, levelFields) => {
  const surroundingFields = [[x, y - 3], [x + 2, y - 2], [x + 3, y], [x + 2, y + 2], [x, y + 3], [x - 2, y + 2], [x - 3, y], [x - 2, y - 2]]
  const stringifiedLevelFields = levelFields.map(field => `${field[0]},${field[1]}`)
  const availableFields = surroundingFields.reduce((acc, field) => {
    if (isFieldValid(field[0], field[1], numberOfBoardSquares) && !stringifiedLevelFields.includes(`${field[0]},${field[1]}`)) {
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
const level = createLevel(5, 5, 80, 10)
console.log('returned level', level)
