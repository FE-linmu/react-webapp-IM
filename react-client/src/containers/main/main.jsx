// 应用主界面路由组件

import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'

import BossInfo from '../boss-info/boss-info'
import JoberInfo from '../jober-info/jober-info'
import Boss from '../boss/boss'
import Jober from '../jober/jober'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'

import { getRedirectPath } from '../../utils'
import { getUser } from '../../redux/actions'


class Main extends Component {

  navList = [
    {
      path: '/boss',
      component: Boss,
      title: '大神列表',
      icon: 'jober',
      text: '求职者'
    },
    {
      path: '/jober',
      component: Jober,
      title: 'Boss 列表',
      icon: 'boss',
      text: 'Boss'
    },
    {
      path: '/message',
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息'
    },
    {
      path: '/personal',
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人'
    }
  ]

  componentDidMount () {
    const userid = Cookies.get('userid')
    const { user } = this.props
    if (userid && !user._id) {
      this.props.getUser()
    }
  }

  render () {
    const pathname = this.props.location.pathname
    const userid = Cookies.get('userid')
    const user = this.props.user
    if (!userid) {
      return <Redirect to='/login' />
    }
    if (!user.id) {
      return null
    } else {
      if (pathname === '/') {
        const path = getRedirectPath(user.type, user.header)
        return <Redirect to={path} />
      }
      if (user.type === 'boss') {
        this.navList[1].hide = true
      } else {
        this.navList[0].hide = true
      }
    }

    const currentNav = this.navList.find(nav => nav.path === pathname)
    return (
      <div>
        {currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
        <Switch>
          <Route path='/bossinfo' component={BossInfo} />
          <Route path='/joberinfo' component={JoberInfo} />
          <Route path='/jober' component={Jober} />
          <Route path='/boss' component={Boss} />
          <Route component={NotFound} />
        </Switch>
        {currentNav ? <NavFooter unReadCount={this.props.unReadCount} navList={this.navList}></NavFooter> : null}
      </div>
    )
  }
}

export default connect(
  state => ({
    user: state.user
  }),
  { getUser }
)(Main)