import React, {Component} from 'react'
import Location from './Location'
import LocationForm from './LocationForm'
import LocationStore from '../stores/LocationStore'
import {EventEmitter} from 'fbemitter'

const ee = new EventEmitter()
const store = new LocationStore(ee)

class UserDetails extends Component{
  constructor(props){
    super(props)
    this.state = {
      locations : []
    }
    this.addLocation = (location) => {
      store.addOne(this.props.user.id, location)
    }
    this.deleteLocation = (location) => {
      store.deleteOne(this.props.user.id,location)
    }
    this.saveLocation = () => {}
  }
  componentDidMount(){
    store.getAll(this.props.user.id)
    ee.addListener('LOCATION_LOAD', () => {
      this.setState({
        locations : store.content
      })
    })
  }
  render(){
    return (
      <div>
        <h2>User <b>{this.props.user.username}</b> </h2>
        <h3>List of locations:</h3>
        {
          this.state.locations.map((p) => <Location location={p} onDelete={this.deleteLocation} key={p.id} onSave={this.saveLocation} />)
        }
        <h3>Add another one.</h3>
        <LocationForm onAdd={this.addLocation}/>
      </div>  
    )
  }
}

export default UserDetails





