// 用户登录路由组件

import React, { Component } from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'

import Logo from '../../components/logo/logo'

export default class Login extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  toRegister = () => {
    this.props.history.push('/register')
  }

  login = () => {
    console.log(this.state)
  }

  render () {
    return (
      <div>
        <NavBar>Boss直聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
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