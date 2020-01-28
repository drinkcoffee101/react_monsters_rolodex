import React, { Component } from 'react';

import { CardList } from './components/card-list/card-list.component'
import { SearchBox } from './components/search-box/search-box.component'

import './App.css';

class App extends Component {

  //good practice to always include props in the constructor and super
  //if no props are being used you can just use state={}
  constructor(props) {
    super(props)

    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }))
  }

  //lexical scoping using arrow function to bind 'this'
  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  //if you are ever updating state and it requires the previous state to update the current state use the below format
  //this makes sure that you are actually affecting the previous state because due the function being astnc, other properties might be changing the state 
  /*----------  Examle function  ----------*/
  handleClick = () => {
    this.setState((prevState, prevProps) =>
      ({ meaningOfLife: prevState.meaningOfLife + 1 }))
  }


  render() {

    const { monsters, searchField } = this.state
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder='search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App;
