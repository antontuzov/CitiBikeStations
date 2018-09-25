import React, { Component } from 'react'
import { View, 
         FlatList, 
         Text, 
         StyleSheet } from 'react-native'

// import 3rd party libraries 
import { SearchBar } from 'react-native-elements'

// import function 
import { bikeStationInformation } from '../helpers/CitiBikeAPI'

// The navigationOptions is where further customization can be done for the screen component 
// Here the Navigation screen title is being set.
export default class BikeStationsListScreen extends Component {

  // A stations array is declared as part of our state variables 
  constructor(props) {
    super(props) 
    this.state = {
      stations: [], 
    }
  }

  // The componentDidMount view cycle makes a call to fetch all the Citibike stations in New York City. 
  // The stations array is then set with the result of the promise 
  // A filteredStations temp array is used for search filtering
  // The query variable here is used to clear the searchBar when the clear button is pressed 
  componentDidMount() {
    super.componentDidMount
    bikeStationInformation()
      .then((results) => {
        let objects = []
        for(let index in results) {
          objects.push(results[index].station)
        }
        this.setState({
          stations: objects,
          filteredStations: objects, 
          query: '', 
        })
      }) 
  }

  static navigationOptions = {
    title: 'CitiBike Locations', 
  }

  // The renderItemSeperator returns a View component to the ItemSeparatorComponent to render a line between items in the
  // FlatList
  renderItemSeperator() {
    return <View style={{backgroundColor:'lightgray', height:0.5}} />
  }

  // The filterSearch function takes a single String argument and does a filter on the stations and updates the FlatList
  filterSearch = (word ) => {
    this.setState({
      query: word, 
      filteredStations: this.state.stations.filter((station) => station.name.toLowerCase().includes(word.toLowerCase()))
    })
  }

  render() {
    return (
      <View>
        {/* Since react-native does not have a native SearchBar component we will use react-native-elements SearchBar.  */}
        <SearchBar
          lightTheme
          round
          clearIcon={{color: 'gray'}}
          placeholder='search for bike location'
          onChangeText={(searchText) => this.filterSearch(searchText)}
          autoCapitalize='none'
          autoCorrect={false}
          onClear={() => this.setState({query: ''})}
          value={this.state.query}
        />
        {/* The FlatList gets its data from the fetch API to get all Citibike stations */}
        {/* <View style={{backgroundColor:'red', height:'100%', width:'100%'}}></View> */}
        <FlatList 
          data={this.state.filteredStations}
          renderItem={({item}) => <Text 
                                    style={styles.item}
                                    onPress={() => this.props.navigation.navigate('Details', {
                                      station: item
                                    })}
                                  >
                                      {item.name}
                                  </Text>}

          // A unique key is needed here we will use the station_id
          keyExtractor={item => item.station_id}
          
          // Expects a component that will render between items in the FlatList
          ItemSeparatorComponent={this.renderItemSeperator}
        />
      </View>   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  item: {
    padding: 10, 
    fontSize: 20, 
  } 
})