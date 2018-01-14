import axios from 'axios'
const SERVER = 'http://aaaalocation-klaw125.c9users.io'

class UserStore{
  constructor(ee){
    this.ee = ee
    this.content = []
    this.selected = null
  }
  getAll(){
    axios(SERVER + '/users')
      .then((response) => {
        this.content = response.data
        this.ee.emit('USER_LOAD')
      })
      .catch((error) => console.warn(error))
  }
  addOne(user){
    axios.post(SERVER + '/users', user)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  deleteOne(id){
    axios.delete(SERVER + '/users/' + id)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  saveOne(id, user){
    axios.put(SERVER + '/users/' + id, user)
      .then(() => this.getAll())
      .catch((error) => console.warn(error))
  }
  getOne(id){
    axios(SERVER + '/users/' + id)
      .then((response) => {
        this.selected = response.data
        this.ee.emit('SINGLE_USER_LOAD')
      })
      .catch((error) => console.warn(error))
  }
}

export default UserStore
