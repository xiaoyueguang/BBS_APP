import {StackNavigator} from 'react-navigation'


import HomeScreen from './pages/Home/HomeScreen.js'
import DetailScreen from './pages/Detail/DetailScreen'

export default StackNavigator({
  Home: {screen: HomeScreen},
  Detail: {screen: DetailScreen}
})
