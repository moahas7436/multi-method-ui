import React from "react";
import logo from './logo.svg'; 
import { Home } from './components/Home';
import './App.css';
import { Login } from './components/Login';
import { Register } from './components/Register';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 'login'
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Multi-Method Study Assistant</h1>
        <Home />
      </div>
    );
  }
}

export default App;
