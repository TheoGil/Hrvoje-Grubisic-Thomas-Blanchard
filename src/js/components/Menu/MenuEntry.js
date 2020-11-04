import React, { Component, createRef } from "react";
import gsap from "gsap";

class MenuEntry extends Component {
  constructor(props) {
    super(props);

    this.ref = createRef();
    this.labelRef = createRef();
  }

  componentDidMount() {
    this.TL = gsap.timeline({
      paused: true,
      delay: this.props.delay,
    });

    this.TL.to(this.ref.current, {
      clipPath: "inset(0 0% 0 0)",
      ease: "power4.out",
      duration: 1,
    });

    this.TL.to(
      this.labelRef.current,
      {
        y: "0%",
        ease: "power2.out",
        duration: 1,
      },
      "-=.75"
    );
  }

  animateIn() {
    this.TL.timeScale(1).restart(true);
  }

  animateOut() {
    this.TL.timeScale(2).reverse();
  }

  render() {
    return (
      <li className="menu-entry" ref={this.ref}>
        <button
          className="menu-entry-link"
          tabIndex={this.props.focusable ? 0 : -1}
          onClick={this.props.onClick}
        >
          <img
            className="menu-entry-picture"
            src={this.props.src}
            alt={this.props.alt}
          />
          <div className="menu-entry-label-container">
            <div className="menu-entry-label" ref={this.labelRef}>
              {this.props.label}
            </div>
          </div>
        </button>
      </li>
    );
  }
}

export default MenuEntry;
