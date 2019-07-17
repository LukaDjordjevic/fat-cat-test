import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Layout from './containers/Layout'
// import { AppContainer } from 'react-hot-loader' /* react-hot-loader v3 */
import configureStore from './store'
import './styles/app.css'
import './styles/board.css'

export const store = configureStore()
const RootComponent = (
    // <AppContainer>
    <Provider store={store}>
      <div className="layout">
        <Layout />
      </div>
    </Provider>
    // </AppContainer>
)
export default function initApplication() {
  ReactDOM.render(RootComponent, document.getElementById('root'))
}
