import React, { Component } from 'react'

// import 3rd party libraries 
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'

// import our custom functions 
import { bikeStationInformation, bikeStationStatus } from '../helpers/CitiBikeAPI'

export default class BikeStationsMapScreen extends Component {
  constructor() {
    super() 
    this.state = {

      // an array of stations from the Citibike API 
      stations: [], 

      stationStatusArray: [],

      // region defaults to be centered in New York City
      region: {
        latitude: 40.6974881,
        longitude: -73.979681,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }

  componentDidMount() {
    super.componentDidMount

    // helper function to get the bike station information from the Citibike API 
    bikeStationInformation()
      .then((results) => {
        this.setState({
          stations: results, 
        })
      })

    bikeStationStatus() 
      .then((results) => {
        this.setState({
          stationStatusArray: results, 
        })
      })
  }

  // Gets the real time status information for this particular Station 
  fetchStationStatus = (item) => {
    const results = this.state.stationStatusArray.filter((station) => station.station_id === item.station_id)
    if(results.length === 1) {
      return results[0]
    } 
    return {}
  }

  render() {
    return(
      // Using the MapView component from react-native-maps to render the Map 
      <MapView 
        style={{flex:1}}
        region={this.state.region}
      >
        {/* Iterates through our stations to create Marker annotations for the map using the coordinate we constructed for our station object*/}
        {this.state.stations.map((stationObject) => {

          // Using the results of the Bike Station Status date create a description to show the real time station data for the Marker annotation
          const stationStatus = this.fetchStationStatus(stationObject.station)
          const description = 'Bikes Available: ' + stationStatus.num_bikes_available + ' '
          + 'Docks Available: ' + stationStatus.num_docks_available

          return <Marker 
            coordinate={stationObject.coordinate}
            title={stationObject.station.name}
            // description={'Bike Capacity: ' + stationObject.station.capacity}
            description={description}
           
            // Here we need to use a unique key when iterating through our collection
            key={stationObject.station.station_id}
          />
        })}

      </MapView>
    )
  }
} 