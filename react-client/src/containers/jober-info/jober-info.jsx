// 老板信息完善的路由容器组件

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  NavBar,
  InputItem,
  Button,
  TextareaItem
} from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { updateUser } from '../../redux/actions'
import HeaderSelector from '../../components/header-selector/header-selector'

class JoberInfo extends Component {
  state = {
    header: '',
    info: '',
    post: ''
  }
  setHeader = (header) => {
    // this.setState({ header })
  }
  handleChange = (name, val) => {
    this.setState({ [name]: val })
  }
  render () {
    const { user } = this.props
    if (user.header) {
      return <Redirect to='/jober' />
    }
    return (
      <div>
        <NavBar>求职信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
        <InputItem placeholder="请输入求职岗位" onChange={val => this.handleChange('post', val)}>求职岗位：</InputItem>
        <TextareaItem
          title="个人介绍："
          rows={3}
          onChange={val => this.handleChange('info', val)}
        ></TextareaItem>
        <Button type="primary" onClick={() => { this.props.updateUser(this.state) }}>保&nbsp;&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { updateUser }
)(JoberInfo)