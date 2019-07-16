import { combineReducers } from 'redux'
import appReducer from './app'
import boardReducer from './board'

export default () =>
  combineReducers({
    app: appReducer,
    board: boardReducer,
  })
