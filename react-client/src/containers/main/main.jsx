// 应用主界面路由组件

import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Cookies from 'js-cookie'

import BossInfo from '../boss-info/boss-info'
import JoberInfo from '../jober-info/jober-info'

export default class Main extends Component {
  render () {
    const userid = Cookies.get('userid')
    console.log('userid---', userid, Cookies.get('userid'))
    // if (!userid) {
    // this.props.history.replace('/login')
    //   return null
    // }

    return (
      <div>
        <Switch>
          <Route path='/bossinfo' component={BossInfo} />
          <Route path='/JoberInfo' component={JoberInfo} />
        </Switch>
      </div>
    )
  }
}