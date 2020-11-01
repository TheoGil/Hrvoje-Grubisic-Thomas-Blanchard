function SlideshowCounter() {
  return (
    <div className="slideshow-counter">
      <div className="current-slide-number-container">
        <div className="slideshow-counter__number current-slide-number--current js-current-slide-index">
          01
        </div>
        <div className="slideshow-counter__number current-slide-number--next js-next-slide-index">
          01
        </div>
      </div>
      <div className="total-slides-number slideshow-counter__number">04</div>
    </div>
  );
}

export default SlideshowCounter;
