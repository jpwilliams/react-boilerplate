import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import './firebase'
import Root from './components/Root/index'
import './assets/styles/index.scss'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root)

if (module.hot) {
  module.hot.accept('./components/Root/index', () => { render(Root) })
}
