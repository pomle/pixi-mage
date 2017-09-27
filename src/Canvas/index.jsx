import React, { Component } from 'react';
import {connect} from 'react-redux';
import FileDrop from '../FileDrop';

import {setLocation} from '../store';

function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = url;
  });
}

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', event => {
        resolve(event.target.result);
    });
    reader.readAsDataURL(file);
  });
}

export default connect(
  null,
  {
    setLocation,
  }
)(class Canvas extends Component {
  constructor(props) {
    super(props);

    this.layers = [
      document.createElement('canvas'),
      document.createElement('canvas'),
    ];

    this.state = {
      image: null,
    };
  }

  onDrop = (files) => {
    const file = files[0];
    readFile(file)
    .then(loadImage)
    .then(image => this.setImage(image));
  }

  handleClick = ({nativeEvent}) => {
    this.props.setLocation(nativeEvent.offsetX, nativeEvent.offsetY);
  }

  setImage(image) {
    this.setState({image});
    this.layers[0].getContext('2d').drawImage(image, 0, 0);
    this.redraw();
  }

  redraw() {
    const context = this.canvas.getContext('2d');
    this.layers.forEach(buffer => {
      context.drawImage(buffer, 0, 0);
    });
  }

  render() {
    return (
      <div className="Canvas" ref={node => this.node = node}>
        <FileDrop onDrop={this.onDrop}>
          <canvas
            width="640"
            height="640"
            ref={canvas => this.canvas = canvas}
            onClick={this.handleClick}/>
        </FileDrop>
      </div>
    );
  }
});