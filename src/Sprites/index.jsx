import React, { Component } from 'react';
import Sprite from './Sprite';
import {connect} from 'react-redux';

import './Sprites.css';

export default connect(state => ({
  sprites: state.sprites,
})
)(class Sprites extends Component {
  render() {
    const {sprites} = this.props;

    return (
      <div
        className="Sprites"
      >
        { sprites.map(sprite => {
          return <Sprite key={sprite.url} sprite={sprite}/>;
        }) }
      </div>
    );
  }
});
