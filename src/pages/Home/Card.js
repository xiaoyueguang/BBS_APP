import React, {Component} from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'

import Dimensions from 'Dimensions'

const {width} = Dimensions.get('window')

const imagePadding = 8
const imageWidth = (width - 8 * 4) / 3

const styles = StyleSheet.create({
  card: {
    // height: 200,
    marginTop: 8,
    backgroundColor: '#fff',
    padding: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    color: '#999',
    paddingTop: 8,
    paddingBottom: 8
  },
  img: {
    marginRight: imagePadding,
    width: imageWidth,
    height: imageWidth,
    borderRadius: 8
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  avatarRow: {
    marginTop: 12
  },
  author: {
    lineHeight: 32,
    marginLeft: 12
  }
})

const avatarSrc = src => 'https://bbsstatic.wsloan.com/picfile/yhtx/' + src

const imagesInit = src => {
  let images = src.split('|')
  return images.map((image, index) => {
    <Image
      key={index}
      style={styles.img}
      source={{uri: `https://bbsstatic.wsloan.com/picfile/${image}`}}
    />
  })
}

export default class Card extends Component {
  render () {
    const {cBt, cNr, cYhtx, cNichen, cSpic, id} = this.props.list
    const navigate = this.props.navigate
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('Detail', {id})
        }}
        activeOpacity={1}
      >
        <View
          style={styles.card}
        >
          <Text
            style={styles.title}
            numberOfLines={1}
          >{cBt}</Text>
          <Text
            style={styles.text}
            numberOfLines={1}
          >{cNr}</Text>
          {cSpic !== '' &&
            <View style={styles.row}>
              {cSpic.split('|').map((src, index) => 
                <Image
                  key={index}
                  style={styles.img}
                  source={{uri: `https://bbsstatic.wsloan.com/picfile/${src}`}}
                />
              )}
            </View>
          }

          <View style={[styles.row, styles.avatarRow]}>
            <Image
              style={styles.avatar}
              source={{uri: avatarSrc(cYhtx)}}
            />
            <Text style={styles.author}>{cNichen}</Text>
          </View>

        </View>
      </TouchableOpacity>
    )
  }
}

