import constants, { numberOfBoardSquares } from '../constants'
import { getLegalMoves } from '../util'

const initialState = {
  state: new Array(numberOfBoardSquares).fill(new Array(numberOfBoardSquares).fill('blank')),
  numberOfLegalMoves: 1,
}

export default (state = initialState, action) => {
  let numberOfLegalMoves = 0
  let legalMoves = []
  let x
  let y
  let boardState
  let stringifiedLegalMoves
  let updatedBoardState
  const { payload } = action
  switch (action.type) {
    case constants.CLEAR_BOARD:
      return {
        ...state,
        state: JSON.parse(JSON.stringify(new Array(numberOfBoardSquares).fill(new Array(numberOfBoardSquares).fill('blank')))),
      }

    case constants.LOAD_LEVEL:
      x = payload[0][0]
      y = payload[0][1]

      boardState = JSON.parse(JSON.stringify(new Array(numberOfBoardSquares).fill(new Array(numberOfBoardSquares).fill('blank'))))
      legalMoves = getLegalMoves(x, y, numberOfBoardSquares)
      stringifiedLegalMoves = legalMoves.map(field => `${field[0]},${field[1]}`)
      action.payload.forEach((field) => {
        if (stringifiedLegalMoves.includes(`${field[0]},${field[1]}`)) {
          boardState[field[0]][field[1]] = 'legalMove'
          numberOfLegalMoves += 1
        } else {
          boardState[field[0]][field[1]] = 'unfinished'
        }
      })
      boardState[x][y] = 'finished'
      return {
        ...state,
        state: boardState,
        numberOfLegalMoves,
      }

    case constants.UPDATE_BOARD:
      updatedBoardState = JSON.parse(JSON.stringify(state.state))
      updatedBoardState[action.payload.x][action.payload.y] = 'finished'
      legalMoves = getLegalMoves(action.payload.x, action.payload.y, numberOfBoardSquares)
      // Clear legal move fields
      for (x = 0; x < numberOfBoardSquares; x += 1) {
        for (y = 0; y < numberOfBoardSquares; y += 1) {
          if (updatedBoardState[x][y] === 'legalMove') updatedBoardState[x][y] = 'unfinished'
        }
      }
      // Add new legal moves
      legalMoves.forEach((field) => {
        if (updatedBoardState[field[0]][field[1]] === 'unfinished') {
          updatedBoardState[field[0]][field[1]] = 'legalMove'
          numberOfLegalMoves += 1
        }
      })
      return {
        ...state,
        numberOfLegalMoves,
        state: updatedBoardState,
      }

    default:
      return state
  }
}
