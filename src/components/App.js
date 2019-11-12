import React from 'react'
import 'normalize.css/normalize.css'
import '../styles/base.css'
import { Provider } from 'react-redux'
import store from '../redux/store'
import HomePage from './HomePage'

export default props => {
  return (
    <Provider store={store}>
      <div>
        <HomePage />
      </div>
    </Provider>
  )
}