import React, {Component} from 'react'
import UserStore from '../stores/UserStore'
import {EventEmitter} from 'fbemitter'
import User from './User'
import UserForm from './UserForm'
import UserDetails from './UserDetails'

const ee = new EventEmitter()
const store = new UserStore(ee)

function addUser(user){
  store.addOne(user)
}

function deleteUser(id){
  store.deleteOne(id)
}

function saveUser(id, user){
  store.saveOne(id, user)
}

class UserList extends Component{
  constructor(props){
    super(props)
    this.state = {
      users : [],
      detailsFor : -1,
      selected : null
    }
    this.cancelSelection = () => {
      this.setState({
        detailsFor : -1
      })
    }
    this.selectUser = (id) => {
      store.getOne(id)
      ee.addListener('SINGLE_USER_LOAD', () => {
        this.setState({
          detailsFor : store.selected.id,
          selected : store.selected
        })
      })
    }
  }
  componentDidMount(){
    store.getAll()
    ee.addListener('USER_LOAD', () => {
      this.setState({
        users : store.content
      })
    })
  }
  render(){
    if (this.state.detailsFor === -1){
      return (<div>
        {
          this.state.users.map((c) => <User user={c} onDelete={deleteUser()} key={c.id} onSave={saveUser()} onSelect={this.selectUser} />)
        }
        <UserForm handleAdd={addUser}/>
      </div>)      
    }
    else{
      return (
        <div>
          <UserDetails user={this.state.selected} />
          <input type="button" value="back" onClick={() => this.cancelSelection()}/>
        </div>  
      )
    }
  }
}

export default UserList



