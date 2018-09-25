import React, { Component } from 'react';

// import 3rd Party libraries 
import { createStackNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

// import our cutom functions 
import { bikeStationInformation, bikeStationStatus } from './helpers/CitiBikeAPI'

// import screen components 
import BikeStationsListScreen from './screens/BikeStationsListScreen';
import BikeStationsMapScreen from './screens/BikeStationsMapScreen';
import StationDetailsScreen from './screens/StationDetailsScreen';

const ListStack = createStackNavigator({
  List: BikeStationsListScreen, 
  Details: StationDetailsScreen
})

// RootStack is setting up a Tab Bar Style Architecture. 
// The List route holds a ListStack which is a Navigation Stack
// There are two tab bars: the List tab bar and the Map tab bar. 
const RootStack = createBottomTabNavigator(
  {
  List: ListStack, 
  Map: BikeStationsMapScreen
  }, 
  {
    // Setting up the tab bar icons for the List and Map Screens 
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'List') {
          iconName = `ios-list${focused ? '' : '-outline'}`
        } else if (routeName === 'Map') {
          iconName = `ios-map${focused ? '' : '-outline'}`
        }
        return <Ionicons name={iconName} size={27} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
)

// The one component our App returns is the RootStack component which we have defined to be a bottom tab navigator
export default class App extends Component {
  render() {
    return(
      <RootStack />
    )
  }
}

