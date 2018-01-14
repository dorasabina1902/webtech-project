import React,{Component} from 'react'

class LocationForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      locationName : '',
      locationCity : '',
      locationCountry: ''
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  render(){
    return (<div>
      Name : <input type="text" name="locationName" onChange={this.handleChange}/>
      City : <input type="text" name="locationCity" onChange={this.handleChange} />
      Country : <input type="text" name="locationCountry" onChange={this.handleChange} />

      <input type="button" value="add" onClick={() => this.props.onAdd({name : this.state.locationName, city : this.state.locationCity, country:this.state.locationCountry})} />
    </div>)
  }
}

export default LocationForm


