import React, { Component, createRef, Fragment } from "react";
import MenuEntry from "./MenuEntry";
import MenuToggle from "./MenuToggle";
import FocusTrap from "focus-trap-react";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.ref = createRef();

    this.entriesRefs = this.props.slides.map(() => createRef());

    this.entriesReverseAnimationsCompletedCount = 0;
  }

  open() {
    this.entriesRefs.forEach((ref) => {
      ref.current.animateIn();
    });
  }

  close() {
    this.setState({
      open: false,
    });

    this.entriesRefs.forEach((ref) => {
      ref.current.animateOut();
    });
  }

  render() {
    const staggerAmount = 0.1;
    const initialDelay = 0.1;

    return (
      <Fragment>
        <FocusTrap
          active={this.props.active}
          focusTrapOptions={{
            escapeDeactivates: false,
            clickOutsideDeactivates: false, // We are handling the "click outside to close" on our end
            allowOutsideClick: true,
            returnFocusOnDeactivate: true,
          }}
        >
          <nav
            className={`menu ${this.props.active ? "active" : ""}`}
            ref={this.ref}
          >
            <MenuToggle
              onToggle={this.props.onToggle}
              active={this.props.active}
              focusable={this.props.active}
            />

            <ul className="menu-entries-list">
              {this.props.slides.map((slide, i) => (
                <MenuEntry
                  label={slide.caption}
                  src={slide.poster}
                  alt=""
                  key={i}
                  ref={this.entriesRefs[i]}
                  focusable={this.props.active}
                  delay={i * staggerAmount + initialDelay}
                  onClick={() => {
                    this.props.onToggle(i);
                  }}
                />
              ))}
            </ul>
          </nav>
        </FocusTrap>
        <div className="menu-overlay" onClick={this.props.onToggle}></div>
      </Fragment>
    );
  }
}

export default Menu;
