import React, { Component } from 'react';
import {connect} from 'react-redux';
import {prettify} from '../json';

import './Output.css';

export default connect(state => ({
    sprites: state.sprites,
})
)(class Output extends Component {
  render() {
    const jsonObject = this.props.sprites.map(sprite => {
      return {
        name: sprite.name,
        x: sprite.x,
        y: sprite.y,
        w: sprite.w,
        h: sprite.h
      };
    }).toArray();

    return (
      <div className="Output">
        { prettify(JSON.stringify(jsonObject), '  ') }
      </div>
    );
  }
});
