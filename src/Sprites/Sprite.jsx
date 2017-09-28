import React, { Component } from 'react';
import {connect} from 'react-redux';
import {selectSprite, setActiveArea} from '../store';

export default connect(state => ({
  sprites: state.sprites,
  selectedSprite: state.selectedSprite,
}), {
    selectSprite,
    setActiveArea,
})(class Sprite extends Component {
  selectSprite(sprite) {
    this.props.selectSprite(sprite);
    this.props.setActiveArea(sprite);
  }

  render() {
    const {sprite, selectedSprite} = this.props;

    return (
      <div
        className={`Sprite ${sprite === selectedSprite ? 'selected' : ''}`}
        style={{
        backgroundImage: `url(${sprite.url})`,
      }}
        onClick={() => this.selectSprite(sprite)}
        />
    );
  }
});