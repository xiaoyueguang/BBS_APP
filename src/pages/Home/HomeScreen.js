import React, {Component} from 'react'
import {
  Text,
  View,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import Banner from './Banner'
import Card from './Card'

const styles = StyleSheet.create({
  load: {
    textAlign: 'center',
    paddingTop: 8,
    paddingBottom: 8
  }
})

export default class HomeScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      banners: [],
      isRefreshing: false,
      bannerShow: false,
      lists: [],
      page: 1,
      maxPage: 1,
      loading: false
    }
    this.getBanner = this.getBanner.bind(this)
    this.getArticles = this.getArticles.bind(this)
    this.getBanner()
    this.getArticles()

  }

  static navigationOptions = {
    title: '首页'
  };

  getArticles () {
    return new Promise(resolve => {
      fetch(`https://sq2.wsloan.com/api/bbsAPi.ashx?q=getpostslist&page=${this.state.page}&pagesize=10`)
        .then(data => data.json())
        .then(data => {
          this.setState({
            lists: this.state.lists.concat(data.content.list),
            maxPage: data.content.pagecount
          })
          resolve()
        })
    })
  }

  getBanner () {
    return new Promise(resolve => {
      fetch('https://sq2.wsloan.com/api/bbsAPi.ashx?q=gethomedata')
        .then(data => data.json())
        .then(data => {
          this.setState({
            banners: data.content.Banners[0].ItemList,
            bannerShow: true
          })
          resolve()
        })
    })
  }

  async onRefresh () {
    await this.getBanner()
    this.state.page = 1
    this.state.lists = []
    await this.getArticles()
    this.setState({
      isRefreshing: false
    })
  }

  async loadMore () {
    if (this.state.loading) return
    this.state.page = this.state.page + 1
    this.setState({
      loading: true
    })
    await this.getArticles()
    this.setState({
      loading: false
    })
  }

  render () {
    const {navigate} = this.props.navigation

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
        <View>
          {this.state.bannerShow && <Banner items={this.state.banners}/>}
          <View
            style={{flexDirection: 'column'}}
          >
            {this.state.lists.map(list => 
              <Card navigate={navigate} list={list} key={list.id}></Card>
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={this.loadMore.bind(this)}
        >
          <Text style={styles.load}>{this.state.loading ? '加载中...' : '点击加载更多'}</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }
}