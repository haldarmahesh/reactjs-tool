import React, { Component } from 'react';
import Plate from './Plate';
import Position from './helper/Position.js';
import ReactDOM from 'react-dom';

export default class ToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseIsOver: false,
      float: false,
      pos: {x: 0, y: 0}
    }
  }
  render() {
    const { mouseIsOver } = this.state;
    const style = {
      display: 'table'
    }
    return (
      <span>
        <Plate
          visible={this.state.mouseIsOver}
          ref={'plateComp'}
          pos={this.state.pos}/>
        <span style={style}
          onMouseEnter={event => ::this.handleMouseEnter(event)}
          onMouseLeave={::this.handleMouseLeave}
          onMouseMove={event => ::this.handleMouseMove(event)}>
          { this.props.children }
        </span>
      </span>
    );
  }

  handleMouseEnter(event) {
    this.setState({
      mouseIsOver: true
    });
    const position = new Position(event);
    const fixedXY = position.getFixed();
    const plateDimensions = this.getDomDimensionsions(this.getPlateDOM());
    this.setState({
      pos: {
        x: fixedXY.x - plateDimensions.width/2,
        y: fixedXY.y - plateDimensions.height - 10
      }
    });
  }

  handleMouseLeave() {
    this.setState({
      mouseIsOver: false
    });
  }

  handleMouseMove(event) {
    if (!this.state.float) {
      return;
    }
    const position = new Position(event);
    const mousePosition = position.getFloatCoordinates();
    const plateDimensions = this.getDomDimensionsions(this.getPlateDOM());
    this.setState({
      pos: {
        x: mousePosition.x - plateDimensions.width/2,
        y: mousePosition.y - plateDimensions.height - 10
      }
    })
  }
  getPlateDOM() {
    return ReactDOM.findDOMNode(this.refs.plateComp);
  }
  getDomDimensionsions(dom){
    return {
      width: dom.offsetWidth,
      height: dom.offsetHeight
    }
  }
}
