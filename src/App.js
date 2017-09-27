import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store';
import Canvas from './Canvas';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.store = createStore(reducer);
  }

  render() {
    return (
      <Provider store={this.store}>
        <div className="App">
          <Canvas/>
        </div>
      </Provider>
    );
  }
}

export default App;