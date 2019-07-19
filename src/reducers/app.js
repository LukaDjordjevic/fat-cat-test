import constants from '../constants'

const initialState = {
  currentUser: {},
  users: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      }

    case constants.SET_USERS:
      return {
        ...state,
        users: action.payload,
      }

    default:
      return state
  }
}
