import constants, { boardSize } from '../constants'

const initialState = {
  state: new Array(boardSize).fill(new Array(boardSize).fill('blank')),
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
    default:
      return state
  }
}
