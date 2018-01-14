import React,{Component} from 'react'

class UserForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      userName : '',
      userPassword : ''
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  render(){
    return (<div>
      Username : <input type="text" name="userName" onChange={this.handleChange}/>
      Password : <input type="password" name="userPassword" onChange={this.handleChange} />
      <input type="button" value="add" onClick={() => this.props.handleAdd({username : this.state.userName, password : this.state.userPassword})} />
    </div>)
  }
}

export default UserForm