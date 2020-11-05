import React, { Component, createRef } from "react";
import Preload from "preload-it";
import gsap from "gsap";

import SlideshowCaption from "./SlideshowCaption";

import GL from "../../GL";

class Slideshow extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = createRef();
    this.ref = createRef();
    this.captionsRefs = this.props.slides.map(() => createRef());

    this.goToPreviousSlide = this.goToPreviousSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.onResize = this.onResize.bind(this);

    this.preload = Preload();
    this.currentSlideIndex = 0;
    this.nextSlideIndex = 0;
  }

  componentDidMount() {
    this.gl = new GL({
      canvas: this.canvasRef.current,
      slidesCount: this.props.slides.length,
    });
    this.onResize(); // Trigger resize right away to set the initial size of the plane
    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
    this.preload.cancel();
    this.gl.dispose();
  }

  goToNextSlide() {
    let index =
      this.currentSlideIndex === this.props.slides.length - 1
        ? 0
        : this.currentSlideIndex + 1;
    this.goToSlide(index);
  }

  goToPreviousSlide() {
    let index =
      this.currentSlideIndex === 0
        ? this.props.slides.length - 1
        : this.currentSlideIndex - 1;
    this.goToSlide(index);
  }

  goToSlide(index) {
    if (this.props.slidesLoaded && !this.gl.isTransitionRunning()) {
      const previousSlideIndex = this.currentSlideIndex;
      this.currentSlideIndex = index;

      this.animateCaptions(previousSlideIndex, this.currentSlideIndex);

      // Add 1 to the displayed index because we want to start at index 1
      // this.counterRef.current.goToSlide();
      this.props.updateCounter(this.currentSlideIndex + 1);

      this.gl.goToSlide(this.currentSlideIndex);
    }
  }

  animateCaptions(prev, next) {
    this.animateOutPreviousCaptions(prev, next);
    this.animateInNextCaption(next);
  }

  animateOutPreviousCaptions(prev, next) {
    // When calling goToSlide for the very first time, prev === next ===0
    // As every caption is hidden by default, no need to try to hide caption
    if (prev !== next) {
      const captionEl = this.captionsRefs[prev].current.ref.current;
      const chars = captionEl.querySelectorAll(".char");

      // To prevent tween from colliding, kill previous tweens affecting previous caption's .char
      gsap.killTweensOf(chars);

      gsap.fromTo(
        chars,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            // Set the display to none and prevent pointer interactions
            captionEl.classList.remove("active");
          },
        }
      );
    }
  }

  animateInNextCaption(next) {
    const captionEl = this.captionsRefs[next].current.ref.current;

    // Set display to block and allow pointer interactions
    captionEl.classList.add("active");

    const chars = captionEl.querySelectorAll(".char");

    // To prevent tween from colliding, kill previous tweens affecting next caption's .char
    gsap.killTweensOf(chars);

    gsap.fromTo(
      chars,
      {
        y: "100%",
        opacity: 1,
      },
      {
        y: "0%",
        stagger: 0.025,
        duration: 1,
        ease: "power2.out",
      }
    );
  }

  onResize() {
    this.gl.updateSize();
  }

  render() {
    return (
      <div className="slideshow" ref={this.ref}>
        <canvas ref={this.canvasRef} className="gl" />
        <div className="slideshow-captions-container">
          {this.props.slides.map((slide, i) => (
            <SlideshowCaption
              caption={slide.caption}
              key={i}
              ref={this.captionsRefs[i]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Slideshow;
