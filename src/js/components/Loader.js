import React, { Component, createRef } from "react";
import gsap from "gsap";

class Loader extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.buttonRef = createRef();
    this.state = {
      buttonActive: false,
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

  displayPlayButton() {
    const TL = gsap.timeline();

    TL.to(this.ref.current, {
      "--beforeScaleY": 1,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        this.setState({
          buttonActive: true,
        });
      },
    });
    TL.to(
      this.buttonRef.current,
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      "-=.5"
    );
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
        <button
          className={`loader-play-button ${
            this.state.buttonActive ? "active" : ""
          }`}
          ref={this.buttonRef}
          onClick={this.props.onClickButton}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
            <path d="M296 146L40 2a16 16 0 00-24 14v288a16 16 0 0024 14l256-144a16 16 0 000-28z" />
          </svg>
        </button>
      </div>
    );
  }
}

export default Loader;
