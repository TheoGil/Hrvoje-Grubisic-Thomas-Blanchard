import React, { forwardRef } from "react";

function Button(props) {
  return (
    <button className="slideshow-controls-button" onClick={props.onClick}>
      <svg className="slideshow-controls-icon">
        <use xlinkHref={`#${props.icon}`} />
      </svg>
    </button>
  );
}

const SlideshowControls = forwardRef((props, ref) => {
  return (
    <div className="slideshow-controls" ref={ref}>
      <Button icon="arrow-left" onClick={props.previous} />
      <Button icon="arrow-right" onClick={props.next} />
    </div>
  );
});

export default SlideshowControls;
