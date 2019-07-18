import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Layout from './containers/Layout'
import configureStore from './store'
import './styles/app.css'
import './styles/board.css'
import './styles/game-stats.css'
import './styles/dialogue-boxes.css'

export const store = configureStore()
const RootComponent = (
  <Provider store={store}>
    <div className="layout">
      <Layout />
    </div>
  </Provider>
)

export default function initApplication() {
  ReactDOM.render(RootComponent, document.getElementById('root'))
}
