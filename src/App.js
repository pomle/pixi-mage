import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store';
import Document from './Document';
import ImageDrop from './ImageDrop';
import Info from './Info';

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
          <ImageDrop>
            <Info/>
            <Document/>
          </ImageDrop>
        </div>
      </Provider>
    );
  }
}

export default App;
