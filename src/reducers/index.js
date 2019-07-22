import { combineReducers } from 'redux'
import appReducer from './app'
import boardReducer from './board'
import gameReducer from './game'

export default () => combineReducers({
  app: appReducer,
  board: boardReducer,
  game: gameReducer,
})
