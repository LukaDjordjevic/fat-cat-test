import constants from '../constants'

const initialState = {
  state: [],
  levels: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_BOARD_STATE:
      return {
        ...state,
        state: action.payload,
      }

    default:
      return state
  }
}
