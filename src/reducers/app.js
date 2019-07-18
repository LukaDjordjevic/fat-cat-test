import constants from '../constants'

const initialState = {
  currentUser: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      }

    default:
      return state
  }
}
