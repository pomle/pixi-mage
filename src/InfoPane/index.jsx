import React, { Component } from 'react';
import {connect} from 'react-redux';
import {copy} from 'microclip';
import {prettify} from '../json';
import {createSprite} from '../sprite';
import {updateSprite, setScale} from '../store';

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
    sprites: state.sprites,
    scale: state.scale,
}), {
  updateSprite,
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
      area.y += 1;
      return area;
    });
  }

  transposeDown = () => {
    this.updateArea(area => {
      area.y -= 1;
      return area;
    });
  }

  transposeLeft = () => {
    this.updateArea(area => {
      area.x += 1;
      return area;
    });
  }

  transposeRight = () => {
    this.updateArea(area => {
      area.x -= 1;
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

  export = (event) => {
    const jsonObject = this.props.sprites.map(sprite => {
      return {
        name: sprite.name,
        x: sprite.x,
        y: sprite.y,
        w: sprite.w,
        h: sprite.h
      };
    }).toArray();

    const text = prettify(JSON.stringify(jsonObject), '  ');
    copy(text);
    console.log(text);
  }

  quantize = () => {
    this.updateArea(sprite => ({
      x: Math.round(sprite.x),
      y: Math.round(sprite.y),
      w: Math.round(sprite.w),
      h: Math.round(sprite.h),
    }));
  }

  rename = (event) => {
    const oldSprite = this.props.sprite;
    const newSprite = oldSprite.set('name', event.target.value);
    this.props.updateSprite(oldSprite, newSprite);
  }

  updateArea(fn) {
    if (!this.props.image || !this.props.sprite) {
      return;
    }

    const {sprite} = this.props;
    createSprite(this.props.image, fn({
      x: sprite.x,
      y: sprite.y,
      w: sprite.w,
      h: sprite.h,
    }))
    .then(({x, y, w, h, url}) => {
      this.props.updateSprite(sprite, sprite
        .set('url', url)
        .set('x', x)
        .set('y', y)
        .set('w', w)
        .set('h', h));
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
          <li>Zoom ({scale}x): <button onClick={this.zoomOut}>Out</button> / <button onClick={this.zoomIn}>In</button> </li>
          <li><button onClick={this.quantize}>Quantize</button></li>

          <li>
            Transpose: <br/>
            <button onClick={this.transposeLeft}>&larr;</button>|<button onClick={this.transposeRight}>&rarr;</button>|<button onClick={this.transposeUp}>&uarr;</button>|<button onClick={this.transposeDown}>&darr;</button>
          </li>

          <li>
            Expand: <br/>
            <button onClick={this.expandLeft}>&larr;</button>|<button onClick={this.expandRight}>&rarr;</button>|<button onClick={this.expandUp}>&uarr;</button>|<button onClick={this.expandDown}>&darr;</button>
          </li>

          <li>
            Contract: <br/>
            <button onClick={this.contractRight}>&rarr;</button>|<button onClick={this.contractLeft}>&larr;</button>|<button onClick={this.contractDown}>&darr;</button>|<button onClick={this.contractUp}>&uarr;</button>
          </li>

          <li>
            Name: <br/>
            <input type="text" value={sprite ? sprite.name : ''} disabled={!sprite} onChange={this.rename}/>
          </li>

          <li>
            <button onClick={this.export}>Export</button>
          </li>
        </ul>
      </div>
    );
  }
});
