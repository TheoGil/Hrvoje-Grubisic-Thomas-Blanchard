import React, { Component, createRef } from "react";
import gsap from "gsap";

class SlideshowCounter extends Component {
  constructor(props) {
    super(props);

    this.onTransitionComplete = this.onTransitionComplete.bind(this);
    this.format = this.format.bind(this);

    this.ref = createRef();
    this.containerRef = createRef();

    this.state = {
      currentSlideIndex: 0,
      nextSlideIndex: 0,
    };
  }

  goToSlide(index) {
    this.setState({
      nextSlideIndex: index,
    });

    gsap.killTweensOf(this.containerRef.current);
    gsap.to(this.containerRef.current, {
      y: "-100%",
      duration: 1,
      ease: "power2.out",
      onComplete: this.onTransitionComplete,
      onCompleteParams: [index],
    });
  }

  onTransitionComplete(index) {
    this.setState({
      currentSlideIndex: index,
    });

    gsap.set(this.containerRef.current, {
      y: "0%",
    });
  }

  format(number) {
    return ("0" + number).slice(-2);
  }

  render() {
    return (
      <div className="slideshow-counter" ref={this.ref}>
        <div className="current-slide-number-container" ref={this.containerRef}>
          <div className="slideshow-counter-number current-slide-number-current">
            {this.format(this.state.currentSlideIndex)}
          </div>
          <div className="slideshow-counter-number current-slide-number-next">
            {this.format(this.state.nextSlideIndex)}
          </div>
        </div>
        <div className="total-slides-number slideshow-counter-number">
          {this.format(this.props.slidesCount)}
        </div>
      </div>
    );
  }
}

export default SlideshowCounter;
