import types from './types'

export function setUser(user) {
  return {
    type: types.SET_USER,
    payload: user,
  }
}

export function setUsers(users) {
  return {
    type: types.SET_USERS,
    payload: users,
  }
}
