import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Board from './containers/Board'
import { AppContainer } from 'react-hot-loader' /* react-hot-loader v3 */
import configureStore from './store'
import './styles/app.css'

export const store = configureStore()
const RootComponent = (
  <AppContainer>
    <Provider store={store}>
      <Board />
    </Provider>
  </AppContainer>
)
export default function initApplication() {
  ReactDOM.render(RootComponent, document.getElementById('root'))
}
