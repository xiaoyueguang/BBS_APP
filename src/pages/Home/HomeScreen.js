import React, {Component} from 'react'
import {
  Text,
  View,
  ScrollView,
  RefreshControl
} from 'react-native'

import Banner from './Banner'
import Card from './Card'


export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      isRefreshing: false,
      bannerShow: false
    }
    this.getInfo = this.getInfo.bind(this)
    this.getInfo()
  }

  static navigationOptions = {
    title: '首页',
  };

  getInfo () {
    return new Promise(resolve => {
      fetch('https://sq2.wsloan.com/api/bbsAPi.ashx?q=gethomedata')
        .then(data => data.json())
        .then(data => {
          this.setState({
            items: data.content.Banners[0].ItemList,
            bannerShow: true
          })
          console.log(data.content.Banners[0].ItemList)
          resolve()
        })
    })
  }

  async onRefresh () {
    await this.getInfo()
    this.setState({
      isRefreshing: false
    })
  }

  render () {
    return (
      
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            title='加载中'
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      >
        {this.state.bannerShow && <Banner items={this.state.items}/>}
        <View
          style={{flexDirection: 'column'}}
        >
          {[1, 2, 3, 4, 5, 6].map(item => 
            <Card key={item}></Card>
          )}
        </View>
      </ScrollView>
    )
  }
}