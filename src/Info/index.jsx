import React, { Component } from 'react';
import {connect} from 'react-redux';

export default connect(state => ({
    point: state.point,
})
)(class Info extends Component {
  render() {
    const {point} = this.props;

    return (
      <div className="info">
        X: {point ? point.x : '-'}
        Y: {point ? point.y : '-'}
      </div>
    );
  }
});
