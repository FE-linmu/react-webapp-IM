import {
  AUTH_SUCCESS,
  ERROR_MSG
} from './action-types'
import { reqRegister, reqLogin } from '../api'

const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })

export const register = (user) => {

  const { username, password, type, password2 } = user

  console.log(user)
  // 表单前台验证
  if (!username) {
    return errorMsg('请输入用户名')
  }
  if (!password) {
    return errorMsg('请输入密码')
  }
  if (password !== password2) {
    return errorMsg('密码不一致')
  }
  if (!type) {
    return errorMsg('请选择用户类型')
  }
  // 表单数据合法，返回一个发异步请求的方法
  return async dispatch => {
    await reqRegister({ username, password, type }).then(res => {
      const result = res.data
      if (result.code === 0) {
        dispatch(authSuccess(result.data))
      } else {
        dispatch(errorMsg(result.msg || 'api error'))
      }
    }).catch(e => {
      dispatch(errorMsg('api error'))
    })
  }
}

export const login = (user) => {
  return async dispatch => {
    try {
      const response = await reqLogin(user)
      const result = response.data
      if (result.code === 0) {
        dispatch(authSuccess(result.data))
      } else {
        dispatch(errorMsg(result.msg))
      }
    } catch (error) {
      dispatch(errorMsg('api error'))
    }
  }
}
