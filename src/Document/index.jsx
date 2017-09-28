import React, { Component } from 'react';
import {connect} from 'react-redux';
import AreaDrawer from '../AreaDrawer';

import {drawArea} from '../drawing';
import {createSprite} from '../sprite';
import {addSprite, setActiveArea, setLocation} from '../store';

import './Document.css';

export default connect(state => ({
    activeArea: state.activeArea,
    image: state.image,
    scale: state.scale,
    sprites: state.sprites,
    selectedSprite: state.selectedSprite,
  }),
  {
    addSprite,
    setLocation,
    setActiveArea,
  }
)(class Document extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
    };

    this.currentScale = 1;
  }

  componentDidMount() {
    this.canvas.imageSmoothingEnabled = false;
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentDidUpdate() {
    this.redraw();
  }

  componentWillReceiveProps({scale}) {
    this.updateScale(scale);
  }

  updateScale(scale) {
    if (scale !== this.currentScale) {
      const multiplier = scale / this.currentScale;
      const context = this.canvas.getContext('2d');
      context.scale(multiplier, multiplier);
      this.currentScale = scale;
    }
  }

  onResize = (event) => {
    this.canvas.width = this.node.offsetWidth;
    this.canvas.height = this.node.offsetHeight;
    this.currentScale = 1;
    this.updateScale(this.props.scale);
    this.redraw();
  }

  handleArea = (area) => {
    const {image} = this.props;
    if (!image) {
      return;
    }

    createSprite(image, area)
    .then(sprite => {
      if (sprite) {
        this.props.addSprite(sprite);
      }
    });
  }

  handleDrawing = (area) => {
    this.props.setActiveArea(area);
  }

  handleMouse = ({nativeEvent}) => {
    this.props.setLocation(nativeEvent.offsetX, nativeEvent.offsetY);
  }

  redraw() {
    const {activeArea, sprites, image} = this.props;
    const context = this.canvas.getContext('2d');

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (image) {
      context.drawImage(image.data, 0, 0);
    }

    sprites.forEach(area => {
      drawArea(context, area, '#000');
    });

    if (activeArea) {
      drawArea(context, activeArea, '#fff');
    }
  }

  render() {
    return (
      <div className="Document" ref={node => this.node = node} onMouseMove={this.handleMouse}>
        <AreaDrawer onArea={this.handleArea} onDrawing={this.handleDrawing}>
          <canvas ref={canvas => this.canvas = canvas}/>
        </AreaDrawer>
      </div>
    );
  }
});