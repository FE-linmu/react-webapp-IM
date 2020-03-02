// 注册路由组件

import React, { Component } from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  Radio,
  Button,
  WhiteSpace,
  Toast
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/actions'

import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: ''
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
    this.props.user.msg = ''
  }

  register = () => {
    // console.log(JSON.stringify(this.state))
    this.props.register(this.state)
  }

  toLogin = () => {
    this.props.history.push('/login')
  }

  render () {
    const { type } = this.state
    const { msg, redirectTo } = this.props.user
    if (redirectTo) {
      return <Redirect to={redirectTo}></Redirect>
    }
    return (
      <div>
        <NavBar>Boss&nbsp;直&nbsp;聘</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ? Toast.info(msg) : null}
            <WhiteSpace />
            <InputItem
              placeholder="请输入用户名"
              onChange={val => this.handleChange('username', val)}
            >用户名：</InputItem>
            <WhiteSpace />
            <InputItem
              placeholder="请输入密码"
              type="password"
              onChange={val => this.handleChange('password', val)}
            >密&nbsp;&nbsp;&nbsp;码：</InputItem>
            <WhiteSpace />
            <InputItem
              placeholder="请确认密码"
              type="password"
              onChange={val => this.handleChange('password2', val)}
            >确认密码：</InputItem>
            <WhiteSpace />
            <ListItem>
              <span>用户类型：</span>
              <Radio
                checked={this.state.type === '求职者'}
                onClick={() => { this.handleChange('type', '求职者') }}
              >&nbsp;求职者</Radio>
              &nbsp;&nbsp;&nbsp;
              <Radio
                checked={this.state.type === 'Boss'}
                onClick={() => { this.handleChange('type', 'Boss') }}
              >&nbsp;Boss</Radio>
            </ListItem>
            <WhiteSpace />
            <Button onClick={this.register} type="primary">注&nbsp;&nbsp;&nbsp;册</Button>
            <WhiteSpace />
            <Button onClick={this.toLogin}>已经有账号</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { register }
)(Register)