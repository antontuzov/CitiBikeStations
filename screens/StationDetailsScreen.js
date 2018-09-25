import React, { Component } from 'react'

// import 3rd party libraries 
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps';

// import our custom functions 
import { bikeStationStatus } from '../helpers/CitiBikeAPI'

export default class StationDetailsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // staion is passed in as a prop from the parent component 
      station: {},

      // stationStatusArray gets populated from the Ciitbike API request
      stationStatusArray: [], 
    }
  }

  componentDidMount() {
    super.componentDidMount

    // helper function to get the real time bike station status information from the CitiBike API
    bikeStationStatus() 
    .then(results => {
      this.setState({
        stationStatusArray: results
      }) 
    })
  }

  // Gets the real time status information for this particular Station 
  fetchStationStatus = () => {
    const { navigation } = this.props
    const stationInfo = navigation.getParam('station', 'no station info')
    const results = this.state.stationStatusArray.filter((station) => station.station_id === stationInfo.station_id)
    if(results.length === 1) {
      return results[0]
    } 
    return {}
  }

  // Set the title for the Navigation Bar
  static navigationOptions = {
    title: 'Station Details',
  }

  render() {
    // Retrieve the station prop from the navigation params
    const { navigation } = this.props
    const stationInfo = navigation.getParam('station', 'no station info')

    // The Marker component needs a coordinate so here we are creating one from the lat and lon of the station
    const coordinate = {
      latitude: stationInfo.lat, 
      longitude: stationInfo.lon, 
    }

    // Constructing a description for the Marker callout
    const station = this.fetchStationStatus()
    const description = 'Bikes Available: ' + station.num_bikes_available + ' '
                        + 'Docks Available: ' + station.num_docks_available

    // Our main component in a MapView with the Marker representing the bike station's location
    return(
      <MapView style={{flex: 1}}
        initialRegion={{
          latitude: stationInfo.lat, 
          longitude: stationInfo.lon, 
          latitudeDelta: 0.0922, 
          longitudeDelta: 0.0421,
        }}
      >
        <Marker 
          coordinate={coordinate}
          title={stationInfo.name}
          description={description}
        />
      </MapView>
    )
  }
}