import React, { Component } from 'react';
import './App.css';
import TodosContainer from './components/TodosContainer'
import SignIn from './components/SignIn'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import JavascriptTimeAgo from 'javascript-time-ago'
 
// The desired locales.
import en from 'javascript-time-ago/locale/en'
 
// Initialize the desired locales.
JavascriptTimeAgo.locale(en)

class App extends Component{
  render() {
    return (
      // <SignIn />
      <div className="App">
        <div className="container">
          <h1> Todo Lists</h1>
          <TodosContainer />
        </div>
      </div>
    );
  }
}

export default App;
