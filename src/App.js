import React, { Component } from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer} from './store';

import KeyboardInput from './KeyboardInput';
import Sprites from './Sprites';
import InfoPane from './InfoPane';
import Document from './Document';
import ImageDrop from './ImageDrop';

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
          <KeyboardInput/>
          <ImageDrop>
            <div className='Workspace'>
              <Sprites/>
              <InfoPane/>
              <Document/>
            </div>
          </ImageDrop>
        </div>
      </Provider>
    );
  }
}

export default App;
