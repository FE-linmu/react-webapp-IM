import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends React.Component {
  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render () {
    const navList = this.props.navList.filter(nav => !nav.hide)

    const { pathname } = this.props.location
    return (
      <TabBar>
        {
          navList.map((nav, index) => (
            <Item
              key={nav.path}
              title={nav.text}
              icon={{ uri: require(`./imgs/${nav.icon}.png`) }}
              selectedIcon={{ uri: require(`./imgs/${nav.icon}-selected.png`) }}
              onPress={() => {
                this.props.history.replace(nav.path)
              }}
            ></Item>
          ))
        }
      </TabBar>
    )
  }
}

export default withRouter(NavFooter)