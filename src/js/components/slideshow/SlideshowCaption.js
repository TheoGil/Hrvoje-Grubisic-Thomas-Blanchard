import { forwardRef } from "react";

const SlideshowCaption = forwardRef((props, ref) => (
  <p ref={ref} className="slideshow-caption">
    {props.caption}
  </p>
));

export default SlideshowCaption;
