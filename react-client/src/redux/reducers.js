/*
  包含n个reducer函数：根据老的state和指定的action返回一个新的state
*/

import { combineReducers } from 'redux'
import { AUTH_SUCCESS } from './action-types'

const initUser = {
  username: '',
  type: '',
  msg: ''
}

function user (state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      break
    default:
      return state
  }
}

export default combineReducers({
  user
})