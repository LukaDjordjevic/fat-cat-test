import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import createRootReducer from './reducers'

export default function configureStore(preloadedState) {
  const logger = createLogger({ collapsed: true })
  const middlewares = [logger]
  return {
    ...createStore(
      createRootReducer(),
      preloadedState,
      compose(applyMiddleware(...middlewares)),
    ),
  }
}
