import { Component, createRef } from "react";

import Column from "../Column";
import ColumnFooter from "../ColumnFooter";
import SlideshowCounter from "./SlideshowCounter";
import SlideshowControls from "./SlideshowControls";
import GL from "../../GL";

import slideSrc1 from "../../../videos/coverr-mountain-river-1585313934979.mp4";
import slideSrc2 from "../../../videos/coverr-drone-shot-in-cordoba-argentina-2-1108.mp4";
import slideSrc3 from "../../../videos/coverr--07-20-friends-at-sunset-25-5167.mp4";
import slideSrc4 from "../../../videos/coverr-moving-forward-to-mountain-valley-1585567162220.mp4";
import SlideshowCaption from "./SlideshowCaption";

class Slideshow extends Component {
  constructor(props) {
    super(props);

    this.canvasRef = createRef();

    this.goToPreviousSlide = this.goToPreviousSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.slides = [
      {
        src: slideSrc1,
        caption: "World Largest Container Vessel",
        captionRef: createRef(),
      },
      {
        src: slideSrc2,
        caption: "Storage Demurrage And Detention",
        captionRef: createRef(),
      },
      {
        src: slideSrc3,
        caption: "Sailing the Seven Seas",
        captionRef: createRef(),
      },
      {
        src: slideSrc4,
        caption: "General Cargo Vessels Types",
        captionRef: createRef(),
      },
    ];
    this.currentSlideIndex = 0;
    this.nextSlideIndex = 0;
  }

  componentDidMount() {
    this.gl = new GL({
      canvas: this.canvasRef.current,
      slides: this.slides,
    });
  }

  goToNextSlide() {
    let index =
      this.currentSlideIndex === this.slides.length - 1
        ? 0
        : this.currentSlideIndex + 1;
    this.goToSlide(index);
  }

  goToPreviousSlide() {
    let index =
      this.currentSlideIndex === 0
        ? this.slides.length - 1
        : this.currentSlideIndex - 1;
    this.goToSlide(index);
  }

  goToSlide(index) {
    console.log(index);
    const previousSlideIndex = this.currentSlideIndex;
    this.currentSlideIndex = index;
    // this.animateCaptions(previousSlideIndex, this.currentSlideIndex);

    // this.counter.animateTo(this.currentSlideIndex);

    this.gl.goToSlide(this.currentSlideIndex);
  }

  render() {
    return (
      <div className="slideshow">
        <canvas ref={this.canvasRef} className="video-canvas" />
        <Column>
          {this.slides.map((slide, i) => (
            <SlideshowCaption
              aption={slide.caption}
              key={i}
              ref={slide.captionRef}
            />
          ))}

          <ColumnFooter>
            <div className="slideshow-ui">
              <SlideshowCounter />
              <SlideshowControls
                previous={this.goToPreviousSlide}
                next={this.goToNextSlide}
              />
            </div>
          </ColumnFooter>
        </Column>
      </div>
    );
  }
}

export default Slideshow;
