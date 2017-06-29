import React, {Component} from 'react'
import Dimensions from 'Dimensions'

const {width, height} = Dimensions.get('window')

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    height: width / 2
  },
  items: {
    width
  },
  banner: {
    width, height: width / 2
  }
})


export default class Banner extends Component {

  constructor (props) {
    super(props)
    this.getInfo = this.getInfo.bind(this)
    this.state = {
      items: []
    }

    this.getInfo()
  }
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
      <ScrollView
        style={styles.container}
        horizontal={true}
      >
        {this.state.items.map(item => 
          <View
            style={styles.items}
            key={item.fItemNo}
          >
            <Image
              style={styles.banner}
              source={{uri: item.cPic.replace('http:', 'https:')}}
            />
          </View>
        )}
      </ScrollView>
    )
  }
}