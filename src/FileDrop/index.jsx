import React, { Component } from 'react';

export default class FileDrop extends Component {
  componentDidMount() {
    this.node.addEventListener('dragover', this.onDragOver);
    this.node.addEventListener('drop', this.onDrop);
  }

  componentWillUnmount() {
    this.node.removeEventListener('dragover', this.onDragOver);
    this.node.removeEventListener('drop', this.onDrop);
  }

  onDragOver = (event) => {
    event.preventDefault();
  }

  onDrop = (event) => {
    event.preventDefault();
    this.props.onDrop(event.dataTransfer.files);
  }

  render() {
    return (
      <div className="FileDrop" ref={node => this.node = node}>
        {this.props.children}
      </div>
    );
  }
}
