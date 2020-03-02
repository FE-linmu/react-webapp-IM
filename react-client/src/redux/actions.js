import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER
} from './action-types'
import {
  reqRegister,
  reqLogin,
  reqUpdateUser
} from '../api'

const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })  // 授权成功的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })  // 错误提示信息的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user }) // 同步接收用户
const resetUser = (msg) => ({ type: RESET_USER, data: msg }) // 同步重置用户
// 注册
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
// 登录
export const login = (user) => {
  return async dispatch => {
    try {
      const response = await reqLogin(user)
      const result = response.data
      if (result.code === 0) {
        dispatch(authSuccess(result.data))
      } else {
        dispatch(errorMsg(result.msg || '登录失败'))
      }
    } catch (error) {
      dispatch(errorMsg('api error'))
    }
  }
}
// 更新用户
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if (result.code === 0) { // 更新成功
      dispatch(receiveUser(result.data))
    } else { // 更新失败
      dispatch(resetUser(result.msg))
    }
  }
}
