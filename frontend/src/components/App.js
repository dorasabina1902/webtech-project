import React, { Component } from 'react'
import '../styles/App.css'
import UserList from './UserList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to our app</h1>
        </header>
        <UserList />
      </div>
    )
  }
}

export default App
