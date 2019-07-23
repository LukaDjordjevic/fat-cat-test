import types from './types'

const initialState = {
  currentUser: {},
  users: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      }

    case types.SET_USERS:
      return {
        ...state,
        users: action.payload,
      }

    default:
      return state
  }
}
