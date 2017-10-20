import React, { Component } from 'react';
import {connect} from 'react-redux';
import {deleteSprite} from '../store';

export default connect(state => ({
  selectedSprite: state.selectedSprite,
}),{
  deleteSprite,
})(class KeyboardInput extends Component {
  constructor(props) {
    super(props);

    this.mappings = new Map();

    this.mappings.set('Delete', () => {
      if (this.props.selectedSprite) {
        this.props.deleteSprite(this.props.selectedSprite);
      }
    });
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKey);
  }

  onKey = (event) => {
    if (this.mappings.has(event.code)) {
      event.preventDefault();
      this.mappings.get(event.code)();
    }
  }

  render() {
    return (
      <div
        className="KeyboardInput"
      />
    );
  }
});
