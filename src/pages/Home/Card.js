import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  card: {
    height: 200,
    marginBottom: 12,
    backgroundColor: '#f23b66'
  }
})


export default class Card extends Component {
  render () {
    return (
      <View
        style={styles.card}
      >
        <Text>测试</Text>
      </View>
    )
  }
}

