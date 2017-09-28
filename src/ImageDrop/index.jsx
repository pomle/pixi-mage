import React, { Component } from 'react';
import FileDrop from '../FileDrop';
import {connect} from 'react-redux';
import {setImage} from '../store';

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

export default connect(null,
  {
    setImage,
  }
)(class ImageDrop extends Component {
  onDrop = (files) => {
    const file = files[0];
    readFile(file)
    .then(loadImage)
    .then(data => {
      this.props.setImage({data});
    });
  }

  render() {
    return (
      <FileDrop onDrop={this.onDrop}>
        {this.props.children}
      </FileDrop>
    );
  }
});
