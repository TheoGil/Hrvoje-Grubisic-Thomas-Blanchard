import React, { Component, createRef } from "react";
import Preload from "preload-it";
import gsap from "gsap";

import SVGSpritesheet from "./SVGSpritesheet";
import Header from "./Header";
import Menu from "./Menu/Menu";
import Column from "./Column";
import Slideshow from "./slideshow/Slideshow";
import Loader from "./Loader";
import SlideshowCounter from "./slideshow/SlideshowCounter";
import SlideshowControls from "./slideshow/SlideshowControls";
import slides from "../slides";

class App extends Component {
  constructor(props) {
    super(props);

    this.menuRef = createRef();
    this.loaderRef = createRef();
    this.slideshowRef = createRef();
    this.counterRef = createRef();
    this.line1Ref = createRef();
    this.line2Ref = createRef();
    this.headerRef = createRef();
    this.slideshowControlsRef = createRef();
    this.infosRef = createRef();

    this.onLoadProgress = this.onLoadProgress.bind(this);
    this.onLoadComplete = this.onLoadComplete.bind(this);
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.goToPreviousSlide = this.goToPreviousSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);
    this.updateCounter = this.updateCounter.bind(this);

    this.state = {
      menuOpen: false,
      slidesLoaded: false,
    };

    this.slides = slides;
    this.entriesReverseAnimationsCompletedCount = 0;

    this.preloader = Preload();
  }

  componentDidMount() {
    this.preloadSlides();
  }

  preloadSlides() {
    this.preloader.fetch(this.slides.map((slide) => slide.src));

    this.preloader.oncomplete = () => {
      const canPlayPromises = [];

      this.slides.forEach((slide) => {
        slide.video = document.createElement("video");
        slide.video.src = this.preloader.getItemByUrl(slide.src).blobUrl;

        // Disclaimer: video autoplay is a confusing, constantly-changing browser feature.
        // The best approach is to never assume that it will work, and therefore prepare for a fallback.
        // Tested on mac: Chrome, Safari, Firefox; android: chrome
        slide.video.loop = true;
        slide.video.muted = true;
        slide.video.play();
        // TODO: test ios. Possible add following
        // slide.video.setAttribute('crossorigin', 'anonymous');
        // slide.video.setAttribute('webkit-playsinline', true);
        // slide.video.setAttribute('playsinline', true);

        canPlayPromises.push(
          new Promise((resolve) => {
            slide.video.addEventListener("canplay", resolve);
          })
        );
      });

      this.slideshowRef.current.gl.attachVideosToEmptyTextures(
        this.slides.map((slide) => slide.video)
      );

      Promise.all(canPlayPromises).then(() => {
        this.setState(
          {
            slidesLoaded: true,
          },
          this.onLoadComplete
        );
      });
    };

    this.preloader.onprogress = (event) => {
      this.onLoadProgress(event.progress);
    };
  }

  onLoadProgress(progress) {
    this.loaderRef.current.updatePercentLoaded(progress);
  }

  onLoadComplete() {
    this.loaderRef.current.animateOut();
    this.slideshowRef.current.goToSlide(0);

    const TL = gsap.timeline();

    TL.to([this.line1Ref.current, this.line2Ref.current], {
      scaleY: 1,
      duration: 1.5,
      stagger: 0.225,
      ease: "power2.out",
    });

    TL.to(
      [
        this.headerRef.current.logoRef.current,
        this.headerRef.current.menuTriggerRef.current.ref.current,
        this.headerRef.current.buttonRef.current,
        this.counterRef.current.ref.current,
        this.slideshowControlsRef.current,
        this.infosRef.current,
      ],
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }

  onToggleMenu(index) {
    this.setState({ menuOpen: !this.state.menuOpen });
    if (this.state.menuOpen) {
      this.menuRef.current.close();

      if (typeof index === "number") {
        // Yes it is ugly but I could not come up with a better way
        // to waity for all the menu entries to fire the reverseComplete event...
        window.setTimeout(() => {
          this.slideshowRef.current.goToSlide(index);
        }, 800);
      }
    } else {
      this.menuRef.current.open();
    }
  }

  goToNextSlide() {
    this.slideshowRef.current.goToNextSlide();
  }

  goToPreviousSlide() {
    this.slideshowRef.current.goToPreviousSlide();
  }

  updateCounter(index) {
    this.counterRef.current.goToSlide(index);
  }

  render() {
    return (
      <div className="app">
        <SVGSpritesheet />

        <Header
          onToggleMenu={this.onToggleMenu}
          menuOpen={this.state.menuOpen}
          ref={this.headerRef}
        />

        <Loader ref={this.loaderRef} />

        <Slideshow
          onLoadProgress={this.onLoadProgress}
          onLoadComplete={this.onLoadComplete}
          updateCounter={this.updateCounter}
          ref={this.slideshowRef}
          slides={this.slides}
          slidesLoaded={this.state.slidesLoaded}
        />

        <div className="line" ref={this.line1Ref}></div>
        <div className="line line-last" ref={this.line2Ref}></div>

        <Menu
          ref={this.menuRef}
          active={this.state.menuOpen}
          onToggle={this.onToggleMenu}
          slides={this.slides}
        />

        <footer className="footer">
          <Column>
            <div className="slideshow-ui">
              <SlideshowCounter
                ref={this.counterRef}
                slidesCount={this.slides.length}
              />
              <SlideshowControls
                ref={this.slideshowControlsRef}
                previous={this.goToPreviousSlide}
                next={this.goToNextSlide}
              />
            </div>
          </Column>
          <Column>
            <div className="infos" ref={this.infosRef}>
              <p>
                UI experiment based on dribbble shots designed by{" "}
                <a
                  href="https://dribbble.com/hrvoje-grubisic"
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Hrvoje Grubisic
                </a>
                .
              </p>
              <p>
                Visuals belong to{" "}
                <a
                  href="https://thomas-blanchard.com/"
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Thomas Blanchard
                </a>
                .
              </p>
            </div>
          </Column>
        </footer>
      </div>
    );
  }
}

export default App;
