import axios from 'axios'
const SERVER = 'https://webtech-project-teodoragheorghe1902.c9users.io/'

class LocationStore{
  constructor(ee){
    this.ee = ee
    this.content = []
  }
  getAll(userId){
    axios(SERVER + '/users/' + userId + '/location')
      .then((response) => {
        this.content = response.data
        this.ee.emit('LOCATION_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(userId, location){
    axios.post(SERVER + '/users/' + userId + '/location', location)
      .then(() => this.getAll(userId))
      .catch((error) => console.warn(error))
  }
  deleteOne(userId, locationId){
    axios.delete(SERVER + '/users/' + userId + '/location/' + locationId)
      .then(() => this.getAll(userId))
      .catch((error) => console.warn(error))
  }
  saveOne(userId, locationId, location){
    axios.put(SERVER + '/users/' + userId + '/location/' + locationId, location)
      .then(() => this.getAll(userId))
      .catch((error) => console.warn(error))
  }
}

export default LocationStore
