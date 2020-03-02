/*
  包含n个reducer函数：根据老的state和指定的action返回一个新的state
*/

import { combineReducers } from 'redux'
import { AUTH_SUCCESS, ERROR_MSG } from './action-types'

const initUser = {
  username: '',
  type: '',
  msg: '',
  redirectTo: ''
}

function user (state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...action.data, redirectTo: '/' }
    case ERROR_MSG:
      return { ...state, msg: action.data }
    default:
      return state
  }
}

export default combineReducers({
  user
})