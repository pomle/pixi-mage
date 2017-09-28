import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createSprite} from '../sprite';
import {replaceSprite, setScale} from '../store';

import './InfoPane.css';

const ZOOM_LEVELS = [
  0.5,
  1,
  2,
  4,
];

function getZoomIndex(scale) {
  return ZOOM_LEVELS.indexOf(scale);
}

export default connect(state => ({
    point: state.point,
    image: state.image,
    sprite: state.selectedSprite,
    scale: state.scale,
}), {
  replaceSprite,
  setScale,
})(class InfoPane extends Component {
  zoomIn = () => {
    this.zoom(getZoomIndex(this.props.scale) + 1);
  }

  contractUp = () => {
    this.updateArea(area => {
      area.h -= 1;
      return area;
    });
  }

  contractDown = () => {
    this.updateArea(area => {
      area.y += 1;
      area.h -= 1;
      return area;
    });
  }

  contractLeft = () => {
    this.updateArea(area => {
      area.w -= 1;
      return area;
    });
  }

  contractRight = () => {
    this.updateArea(area => {
      area.x += 1;
      area.w -= 1;
      return area;
    });
  }

  expandUp = () => {
    this.updateArea(area => {
      area.y -= 1;
      area.h += 1;
      return area;
    });
  }

  expandDown = () => {
    this.updateArea(area => {
      area.h += 1;
      return area;
    });
  }

  expandLeft = () => {
    this.updateArea(area => {
      area.x -= 1;
      area.w += 1;
      return area;
    });
  }

  expandRight = () => {
    this.updateArea(area => {
      area.w += 1;
      return area;
    });
  }

  transposeUp = () => {
    this.updateArea(area => {
      area.y -= 1;
      return area;
    });
  }

  transposeDown = () => {
    this.updateArea(area => {
      area.y += 1;
      return area;
    });
  }

  transposeLeft = () => {
    this.updateArea(area => {
      area.x -= 1;
      return area;
    });
  }

  transposeRight = () => {
    this.updateArea(area => {
      area.x += 1;
      return area;
    });
  }

  zoom(level) {
    const scale = ZOOM_LEVELS[level];
    if (scale) {
      this.props.setScale(scale)
    }
  }

  zoomOut = () => {
    this.zoom(getZoomIndex(this.props.scale) - 1);
  }

  quantize = () => {
    this.updateArea(sprite => ({
      x: Math.round(sprite.x),
      y: Math.round(sprite.y),
      w: Math.round(sprite.w),
      h: Math.round(sprite.h),
    }));
  }

  updateArea(fn) {
    if (!this.props.image || !this.props.sprite) {
      return;
    }

    createSprite(this.props.image, fn(Object.assign({}, this.props.sprite)))
    .then(newSprite => {
      this.props.replaceSprite(this.props.sprite, newSprite);
    });
  }

  render() {
    const {point, scale, sprite} = this.props;

    return (
      <div className="InfoPane">
        <ul>
          <li>X: {point ? point.x : '-'}</li>
          <li>Y: {point ? point.y : '-'}</li>

          <li>X1: {sprite ? sprite.x : '-'}</li>
          <li>Y1: {sprite ? sprite.y : '-'}</li>
          <li>X2: {sprite ? sprite.x + sprite.w : '-'}</li>
          <li>Y2: {sprite ? sprite.y + sprite.h : '-'}</li>
          <li>W:  {sprite ? sprite.w : '-'}</li>
          <li>H:  {sprite ? sprite.h : '-'}</li>
        </ul>

        <ul>
          <li>Zoom ({scale}x): <a onClick={this.zoomOut}>Out</a> / <a onClick={this.zoomIn}>In</a> </li>
          <li><a onClick={this.quantize}>Quantize</a></li>

          <li>
            Transpose: <br/>
            <a onClick={this.transposeLeft}>&larr;</a>|<a onClick={this.transposeRight}>&rarr;</a>|<a onClick={this.transposeUp}>&uarr;</a>|<a onClick={this.transposeDown}>&darr;</a>
          </li>

          <li>
            Expand: <br/>
            <a onClick={this.expandLeft}>&larr;</a>|<a onClick={this.expandRight}>&rarr;</a>|<a onClick={this.expandUp}>&uarr;</a>|<a onClick={this.expandDown}>&darr;</a>
          </li>

          <li>
            Contract: <br/>
            <a onClick={this.contractRight}>&rarr;</a>|<a onClick={this.contractLeft}>&larr;</a>|<a onClick={this.contractDown}>&darr;</a>|<a onClick={this.contractUp}>&uarr;</a>
          </li>
        </ul>
      </div>
    );
  }
});
