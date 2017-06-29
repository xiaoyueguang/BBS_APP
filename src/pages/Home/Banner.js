import React, {Component} from 'react'
import Dimensions from 'Dimensions'
import Swiper from 'react-native-swiper'

const {width} = Dimensions.get('window')

import {
  View,
  Image,
  StyleSheet
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

  render () {
    return (
      <Swiper
        horizontal={true}
        height={width / 2}
      >
      {this.props.items.map(item => 
          <View
            style={styles.items}
            key={item.fItemNo}
            showsButtons={true}
          >
            <Image
              style={styles.banner}
              source={{uri: item.cPic.replace('http:', 'https:')}}
            />
          </View>
        )}
      </Swiper>
    )
  }
}