import React, { Component, createRef } from "react";
import MenuToggle from "./Menu/MenuToggle";

class Header extends Component {
  constructor(props) {
    super(props);

    this.logoRef = createRef();
    this.menuTriggerRef = createRef();
    this.buttonRef = createRef();
  }

  render() {
    return (
      <header className="header">
        <div className="header-column">
          <button href="#" className="logo" ref={this.logoRef}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="logo-svg"
            >
              <path d="M12 2a10 10 0 110 20 10 10 0 010-20zm0-2a12 12 0 100 24 12 12 0 000-24zm5.5 14a8.4 8.4 0 01-5.5 1.9c-2.3 0-4-.8-5.5-2l-.5.5c1.1 1.8 3.2 3.6 6 3.6s4.9-1.8 6-3.6l-.5-.5zm-9-6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm7 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            </svg>
          </button>

          <MenuToggle
            ref={this.menuTriggerRef}
            onToggle={this.props.onToggleMenu}
            active={this.props.menuOpen}
            focusable={true}
          />
        </div>
        <div className="header-column">
          <button className="button right" ref={this.buttonRef}>
            Button
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
