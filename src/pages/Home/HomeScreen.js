import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';

import Banner from './Banner'

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
    this.getInfo = this.getInfo.bind(this)
    this.getInfo()
  }

  static navigationOptions = {
    title: '首页',
  };

  getInfo () {
    fetch('https://sq2.wsloan.com/api/bbsAPi.ashx?q=gethomedata')
      .then(data => data.json())
      .then(data => {
        this.setState({
          items: data.content.Banners[0].ItemList
        })
        console.log(data.content.Banners[0].ItemList)
      })
  }
  render () {
    return (
      <View>
        <Banner items={this.state.items}/>
        <Text>HOME</Text>
      </View>
    )
  }
}