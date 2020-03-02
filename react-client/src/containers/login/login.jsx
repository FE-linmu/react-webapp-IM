// 用户登录路由组件

import React, { Component } from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button,
  Toast
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/actions'

import Logo from '../../components/logo/logo'

class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
    this.props.user.msg = ''
  }

  toRegister = () => {
    this.props.history.push('/register')
  }

  login = () => {
    // console.log(this.state)
    this.props.login(this.state)
  }

  render () {
    const { type } = this.state
    const { msg, redirectTo } = this.props.user
    if (redirectTo) {
      return <Redirect to={redirectTo}></Redirect>
    }
    return (
      <div>
        <NavBar>Boss直聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ? Toast.info(msg) : null}
            <InputItem
              placeholder="请输入用户名"
              onChange={val => this.handleChange('username', val)}
            >
              用户名：
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              placeholder="请输入密码"
              onChange={val => this.handleChange('password', val)}
            >
              密&nbsp;&nbsp;&nbsp;码：
            </InputItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
            <WhiteSpace />
            <Button onClick={this.toRegister}>还没有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { login }
)(Login)