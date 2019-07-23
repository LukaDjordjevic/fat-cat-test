import { combineReducers } from 'redux'
import appReducer from './store/app/reducer'
import boardReducer from './store/board/reducer'
import gameReducer from './store/game/reducer'

export default () => combineReducers({
  app: appReducer,
  board: boardReducer,
  game: gameReducer,
})
