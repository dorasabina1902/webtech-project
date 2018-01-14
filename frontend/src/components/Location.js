import React,{Component} from 'react'

class Location extends Component{
  render(){
    return (
      <div>
        <h5>{this.props.location.name}: [ City: {this.props.location.city}] [ Country: {this.props.location.country}]</h5>
        
      </div>
    )
  }
}

export default Location