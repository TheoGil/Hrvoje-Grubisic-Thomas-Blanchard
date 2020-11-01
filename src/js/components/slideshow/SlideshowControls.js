function Button(props) {
  return (
    <button className="slideshow-controls__button" onClick={props.onClick}>
      <svg className="slideshow-controls__icon">
        <use xlinkHref={`#${props.icon}`} />
      </svg>
    </button>
  );
}

function SlideshowControls(props) {
  return (
    <div className="slideshow-controls">
      <Button icon="arrow-left" onClick={props.previous} />
      <Button icon="arrow-right" onClick={props.next} />
    </div>
  );
}

export default SlideshowControls;
