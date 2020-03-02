// 老板信息完善的路由容器组件

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import { updateUser } from '../../redux/actions'
import { Redirect } from 'react-router-dom'
class BossInfo extends Component {

  state = {
    header: '',
    info: '',
    post: '',
    component: '',
    salary: ''
  }

  handleChange = (name, val) => {
    this.setState({ [name]: val })
  }

  setHeader = (header) => {
    this.setState({ header })
  }

  save = () => {
    this.props.updateUser(this.state)
  }

  render () {
    const { user } = this.props
    if (user.header) {
      return <Redirect to='/boss' />
    }
    return (
      <div>
        <NavBar>Boss信息完善</NavBar>
        <HeaderSelector setHeader={this.setHeader}></HeaderSelector>
        <InputItem placeholder="请输入招聘职位" onChange={val => this.handleChange('post', val)}>招聘职位：</InputItem>
        <InputItem placeholder="请输入公司名称" onChange={val => this.handleChange('company', val)}>公司名称：</InputItem>
        <InputItem placeholder="请输入职位薪资" onChange={val => this.handleChange('salary', val)}>职位薪资：</InputItem>
        <TextareaItem title="职位要求："
          rows={3}
          onChange={val => this.handleChange('info', val)}
        ></TextareaItem>
        <Button type="primary" onClick={() => { this.save() }}>保&nbsp;&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { updateUser }
)(BossInfo)