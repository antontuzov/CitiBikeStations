// fetches the bike station infomation from Citibike API 
export function bikeStationInformation() {
  return fetch('https://gbfs.citibikenyc.com/gbfs/en/station_information.json') 
  .then(response => response.json()) 
  .then(jsonData => {
    const data = jsonData['data']
    const results = data['stations']

    let objects = []

    // Here we construct a station object which will hold a coordinate object needed by the Marker component of the MapView
    // and the station information 
    for(let index in results) {
      let object = {
        station: results[index], 
        coordinate: {
          latitude: results[index].lat, 
          longitude: results[index].lon, 
        }
      }
      objects.push(object)
    }    
    return objects 
  }) 
  .catch(err => console.error(err))
}

// fetches the real time bike status information from Citibike API
export function bikeStationStatus() {
  return fetch('https://gbfs.citibikenyc.com/gbfs/en/station_status.json') 
    .then(response => response.json()) 
    .then(jsonData => {
      const data = jsonData['data']
      const stationsStatus = data['stations']
      return stationsStatus
    }) 
    .catch(err => console.error(err)) 
}