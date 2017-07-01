import React, {Component} from 'react'

import {
  Text,
  View,
  WebView,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  webview: {
    backgroundColor:'#fff'
  }
})


export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    const {params} = this.props.navigation.state
    this.state = {
      content: {
        detail: {
          cNr: '<div></div>'
        }
      }
    }
    this.getInfo = this.getInfo.bind(this)
    this.getInfo(params.id)
  }

  getInfo (id) {
    fetch(`https://sq2.wsloan.com/api/bbsAPi.ashx?q=getpostsdetail&id=${id}`)
      .then(data => data.json())
      .then(data => {
        this.setState({
          content: data.content
        })
      })
  }

  static navigationOptions = {
    title: '帖子详情'
  }


  render () {
    return (
      <View style={{flex: 1}}>
        <WebView
          domStorageEnabled={true}
          style={styles.webview}
          source={{
            html: this.state.content.detail.cNr
          }}
        />
      </View>
    )
  }
}