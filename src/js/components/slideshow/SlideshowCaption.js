import React, { Component, createRef } from "react";
import Splitting from "splitting";

class SlideshowCaption extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  componentDidMount() {
    Splitting({
      target: this.ref.current,
    });
  }

  render() {
    return (
      <p className="slideshow-caption" ref={this.ref}>
        {this.props.caption}
      </p>
    );
  }
}

export default SlideshowCaption;
