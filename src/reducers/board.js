import constants, { numberOfBoardSquares } from '../constants'
import { getLegalMoves } from '../util'


const initialState = {
  state: new Array(numberOfBoardSquares).fill(new Array(numberOfBoardSquares).fill('blank')),
  numberOfLegalMoves: 0,
}

export default (state = initialState, action) => {
  let numberOfLegalMoves = 0
  let legalMoves = []
  switch (action.type) {
    // case constants.SET_PIECE_STATE:
    // const newBoardState = JSON.parse(JSON.stringify(state.state))  // Do i need this?
    // newBoardState[action.payload.x][action.payload.y] = action.payload.state
    // return {
    //   ...state,
    //   state: newBoardState
    // }

    case constants.CLEAR_BOARD:
      return {
        ...state,
        state: JSON.parse(JSON.stringify(new Array(numberOfBoardSquares).fill(new Array(numberOfBoardSquares).fill('blank'))))
      }

    case constants.LOAD_LEVEL:
      const x = action.payload[0][0]
      const y = action.payload[0][1]
      const boardState = JSON.parse(JSON.stringify(new Array(numberOfBoardSquares).fill(new Array(numberOfBoardSquares).fill('blank'))))
      legalMoves = getLegalMoves(x, y, numberOfBoardSquares)
      const stringifiedLegalMoves = legalMoves.map(field => `${field[0]},${field[1]}`)
      action.payload.forEach(field => {
        if (stringifiedLegalMoves.includes(`${field[0]},${field[1]}`)) {
          boardState[field[0]][field[1]] = 'legalMove' 
          numberOfLegalMoves++         
        } else {
          boardState[field[0]][field[1]] = 'unfinished'
        }
      });
      boardState[x][y] = 'finished'
      return {
        ...state,
        state: boardState,
        numberOfLegalMoves,
      }

    case constants.UPDATE_BOARD:
      const updatedBoardState = JSON.parse(JSON.stringify(state.state))
      updatedBoardState[action.payload.x][action.payload.y] = 'finished'
      legalMoves = getLegalMoves(action.payload.x, action.payload.y, numberOfBoardSquares)
      console.log('legal moves', legalMoves)
      // Clear legal move fields
      for (let x = 0; x < numberOfBoardSquares; x++) {
        for (let y = 0; y < numberOfBoardSquares; y++) {
          if (updatedBoardState[x][y] === 'legalMove') updatedBoardState[x][y] = 'unfinished'
        }
      }
      // Add new legal moves
      legalMoves.forEach(field => {
        if (updatedBoardState[field[0]][field[1]] === 'unfinished') {
          updatedBoardState[field[0]][field[1]] = 'legalMove'
          numberOfLegalMoves++
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
