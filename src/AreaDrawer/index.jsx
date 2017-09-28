import React, { Component } from 'react';

function createRect(x1, y1, x2, y2) {
  return {
    x: x1,
    y: y1,
    w: x2 - x1,
    h: y2 - y1,
  };
}

function createArea(startEvent, endEvent) {
  return createRect(
    startEvent.offsetX,
    startEvent.offsetY,
    endEvent.offsetX,
    endEvent.offsetY);
}

export default class AreaDrawer extends Component {
  handleStart = ({nativeEvent}) => {
    this.startEvent = nativeEvent;
  }

  handleMove = ({nativeEvent}) => {
    if (this.startEvent) {
      const area = createArea(this.startEvent, nativeEvent);
      this.props.onDrawing(area);
    }
  }

  handleEnd = ({nativeEvent}) => {
    if (this.startEvent) {
      const area = createArea(this.startEvent, nativeEvent);
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
}
