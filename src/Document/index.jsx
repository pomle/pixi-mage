import React, { Component } from 'react';
import {connect} from 'react-redux';
import AreaDrawer from '../AreaDrawer';

import {drawArea} from '../drawing';
import {addArea, setCurrentArea, setLocation} from '../store';

import './Document.css';

export default connect(state => ({
    activeArea: state.currentArea,
    image: state.image,
    areas: state.areas,
  }),
  {
    addArea,
    setLocation,
    setCurrentArea,
  }
)(class Document extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentDidUpdate() {
    this.redraw();
  }

  onResize = (event) => {
    this.canvas.width = this.node.offsetWidth;
    this.canvas.height = this.node.offsetHeight;
    this.redraw();
  }

  handleArea = (area) => {
    this.props.addArea(area);
  }

  handleDrawing = (area) => {
    console.log(area);
    this.props.setCurrentArea(area);
  }

  handleMouse = ({nativeEvent}) => {
    this.props.setLocation(nativeEvent.offsetX, nativeEvent.offsetY);
  }

  redraw() {
    const {activeArea, areas, image} = this.props;
    const context = this.canvas.getContext('2d');

    if (image) {
      context.drawImage(image, 0, 0);
    }

    areas.forEach(area => {
      drawArea(context, area, '#000');
    });

    if (activeArea) {
      drawArea(context, activeArea, '#f00');
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