import constants, { numberOfBoardSquares } from '../constants'

const initialState = {
  state: new Array(numberOfBoardSquares).fill(new Array(numberOfBoardSquares).fill('blank')),
  levels: [],
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
  switch (action.type) {
    case constants.SET_PIECE_STATE:
    const newBoardState = JSON.parse(JSON.stringify(state.state))  // Do i need this?
    newBoardState[action.payload.x][action.payload.y] = action.payload.state
    return {
      ...state,
      state: newBoardState
    }

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
        } else {
          boardState[field[0]][field[1]] = 'unfinished'
        }
      });
      boardState[x][y] = 'finished'


      return {
        ...state,
        state: boardState
      }

    default:
      return state
  }
}
