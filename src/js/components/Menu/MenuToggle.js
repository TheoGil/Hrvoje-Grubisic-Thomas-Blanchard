import React, { Component, createRef } from "react";

class MenuToggle extends Component {
  constructor(props) {
    super(props);

    this.ref = createRef();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onToggle();
  }

  render() {
    return (
      <button
        className={`burger-button ${this.props.active ? "active" : ""}`}
        onClick={this.onClick}
        tabIndex={this.props.focusable ? 0 : -1}
        ref={this.ref}
      >
        <div className="slices-container">
          <div className="slice top"></div>
          <div className="slice middle"></div>
          <div className="slice bottom"></div>
        </div>
      </button>
    );
  }
}

export default MenuToggle;
