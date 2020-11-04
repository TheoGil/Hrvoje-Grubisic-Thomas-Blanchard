import React, { Component, createRef } from "react";
import gsap from "gsap";

class Loader extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.state = {
      percentLoaded: 0,
    };
  }

  updatePercentLoaded(percentLoaded) {
    this.setState({ percentLoaded });
  }

  displayPercent() {
    return `${this.state.percentLoaded}%`;
  }

  animateOut() {
    gsap.to(this.ref.current, {
      y: "-100%",
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }

  render() {
    return (
      <div className="loader" ref={this.ref}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 513.6 513.6"
          className="loader-svg"
        >
          <g transform="translate(-162.95 -200.47)">
            <circle cx="419.75" cy="457.27" r="249.3" strokeWidth="1.4" />
            <path
              style={{
                strokeDashoffset: 100 - this.state.percentLoaded,
              }}
              className="loader-svg-path"
              pathLength="100"
              strokeWidth="15"
              d="M170.45 457.27a249.3 249.3 0 01249.3-249.3 249.3 249.3 0 01249.3 249.3 249.3 249.3 0 01-249.3 249.3 249.3 249.3 0 01-249.3-249.3z"
            />
          </g>
        </svg>
        <div className="loader-percent">{this.displayPercent()}</div>
      </div>
    );
  }
}

export default Loader;
