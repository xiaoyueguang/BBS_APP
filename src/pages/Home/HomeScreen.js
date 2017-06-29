import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';

import Banner from './Banner'

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: '首页',
  };
  render () {
    return (
      <View>
        <Banner/>
        <Text>HOME</Text>
      </View>
    )
  }
}