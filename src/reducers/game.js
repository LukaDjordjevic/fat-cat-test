import constants from '../constants'

const initialState = {
  levels: [],
  currentLevel: 1,
  currentMove: 1,
  lives: 1,
  leftToClick: 0,
  selectingInitialSquare: true,
  moveTime: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_LIVES:
      return {
        ...state,
        lives: action.payload,
      }

    case constants.SET_TIME:
      return {
        ...state,
        moveTime: action.payload,
      }

    case constants.SET_SELECTING_INITIAL_SQUARE:
      return {
        ...state,
        selectingInitialSquare: action.payload,
      }

    case constants.SET_CURRENT_MOVE:
      return {
        ...state,
        currentMove: action.payload,
      }
  
    case constants.SET_CURRENT_LEVEL:
      return {
        ...state,
        currentLevel: action.payload,
      }
  
    case constants.SET_LEFT_TO_CLICK:
      return {
        ...state,
        leftToClick: action.payload,
      }

    default:
      return state
  }
}
