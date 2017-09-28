import React, { Component } from 'react';
import {connect} from 'react-redux';

export default connect(state => ({
    areas: state.areas,
})
)(class AreaPainter extends Component {
  render() {
    console.log(this.props.areas);
    return (
      <div className="AreaPainter">
        { this.props.areas.map(area => {
          const style = {
            top: area.x1,
            left: area.y1,
            width: area.x2 - area.x1,
            height: area.y2 - area.y1,
          };

          return <div className="area" style={style}/>;
        }) }
      </div>
    );
  }
});
