import React, { Component } from 'react';
import {connect} from 'react-redux';

function createRect(x1, y1, x2, y2) {
  return {
    x: x1,
    y: y1,
    w: x2 - x1,
    h: y2 - y1,
  };
}

export default connect(state => ({
  scale: state.scale,
})
)(class AreaDrawer extends Component {
  createArea(startEvent, endEvent) {
    const {scale} = this.props;
    return createRect(
      startEvent.offsetX / scale,
      startEvent.offsetY / scale,
      endEvent.offsetX / scale,
      endEvent.offsetY / scale);
  }

  handleStart = ({nativeEvent}) => {
    this.startEvent = nativeEvent;
  }

  handleMove = ({nativeEvent}) => {
    if (this.startEvent) {
      const area = this.createArea(this.startEvent, nativeEvent);
      this.props.onDrawing(area);
    }
  }

  handleEnd = ({nativeEvent}) => {
    if (this.startEvent) {
      const area = this.createArea(this.startEvent, nativeEvent);
      this.props.onArea(area);
      this.props.onDrawing(null);
      this.startEvent = undefined;
    }
  }

  render() {
    return (
      <div
        className="AreaDrawer"
        onMouseDown={this.handleStart}
        onMouseMove={this.handleMove}
        onMouseUp={this.handleEnd}
      >
        {this.props.children}
      </div>
    );
  }
});
