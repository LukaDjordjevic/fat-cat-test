import constants, { numberOfBoardSquares } from '../constants'
import { getLegalMoves } from '../util'


const initialState = {
  state: new Array(numberOfBoardSquares).fill(new Array(numberOfBoardSquares).fill('blank')),
  numberOfLegalMoves: 0,
}

export default (state = initialState, action) => {
  // switch (action.type) {
  //   case constants.SET_PIECE_STATE:
  //   const newBoardState = JSON.parse(JSON.stringify(state.state))
  //   newBoardState[action.payload.x][action.payload.y] = {
    //     ...newBoardState[action.payload.x][action.payload.y],
    //     ...action.payload.options,
    //   } 
    //     return {
      //       ...state,
      //       state: newBoardState
      //     }
  let numberOfLegalMoves = 0
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
      const surroundingFields = [[x, y - 3], [x + 2, y - 2], [x + 3, y], [x + 2, y + 2], [x, y + 3], [x - 2, y + 2], [x - 3, y], [x - 2, y - 2]]
      const stringifiedLevelFields = surroundingFields.map(field => `${field[0]},${field[1]}`)
      action.payload.forEach(field => {
        console.log('seetting to unfinished', field, boardState[field[0]][field[1]])
        if (stringifiedLevelFields.includes(`${field[0]},${field[1]}`)) {
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
      // numberOfLegalMoves = 0
      const updatedBoardState = JSON.parse(JSON.stringify(state.state))
      updatedBoardState[action.payload.x][action.payload.y] = 'finished'
      // this.props.dispatch({ type: constants.SET_PIECE_STATE, payload: { x, y, state: 'finished' }})
      const legalMoves = getLegalMoves(action.payload.x, action.payload.y, numberOfBoardSquares)
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
          // this.props.dispatch({ type: constants.SET_PIECE_STATE, payload: { x: field[0], y: field[1], state: 'legalMove' }})
          updatedBoardState[field[0]][field[1]] = 'legalMove'
          numberOfLegalMoves++
        }
      })
      // if (this.props.leftToClick === 1) { // Game end
      //   console.log('Wiiiii!!!!')
      // }
      // this.props.dispatch({ type: constants.SET_LEFT_TO_CLICK, payload: this.props.leftToClick - 1 })
      // this.props.dispatch({ type: constants.SET_TIME, payload: 0 })
      return {
        ...state,
        numberOfLegalMoves,
        state: updatedBoardState,
      }

    default:
      return state
  }
}
