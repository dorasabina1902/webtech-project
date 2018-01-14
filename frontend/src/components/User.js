import React,{Component} from 'react'

class User extends Component{
  constructor(props){
    super(props)
    this.state = {
      isEditing : false,
      user : this.props.user,
      userName : this.props.user.username,
      userPassword : this.props.user.password
    }
    this.handleChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      user : nextProps,
      userName : this.props.user.username,
      userPassword : this.props.user.password,
      isEditing : false
    })
  }
  render(){
    if(this.state.isEditing){
      return (<div>
       Username: <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange}/> 
     
        <input type="button" value="save" onClick={() => this.props.onSave(this.props.user.id, {username : this.state.userName, password : this.state.userPassword})}/>
        <input type="button" value="cancel" onClick={() => this.setState({isEditing : false})} />
      </div>)            
    }
    else{
      return (<div>
        Username: <b>{this.state.userName}</b> 
        <input type="button" value="delete" onClick={() => this.props.onDelete(this.state.user.id)}/>
        <input type="button" value="edit" onClick={() => this.setState({isEditing : true})} />
        <input type="button" value="details" onClick={() => this.props.onSelect(this.props.user.id)}/> 
      </div>)
    }
  }
}

export default User