import React from "react";

function SVGSpritesheet() {
  return (
    <svg
      style={{
        display: "none",
      }}
    >
      <defs>
        <symbol id="arrow-left" viewBox="0 0 241 241">
          <desc>Arrow pointing to the left</desc>
          <path d="M58 129l108 108c5 5 12 5 17 0 5-4 5-12 0-17L83 120l100-99a12 12 0 10-17-17L58 112c-5 5-5 12 0 17z" />
        </symbol>

        <symbol id="arrow-right" viewBox="0 0 241 241">
          <desc>Arrow pointing to the right</desc>
          <path d="M183 112L75 4c-5-5-13-5-17 0-5 4-5 12 0 17l99 99-99 100a12 12 0 1017 17l108-108c5-5 5-13 0-17z" />
        </symbol>

        <symbol id="arrow-down" viewBox="0 0 241 241">
          <desc>Arrow pointing down</desc>
          <path d="M220 58l-100 99-99-99A12 12 0 104 75l108 108c5 5 12 5 17 0L237 75c5-5 5-13 0-17-4-5-12-5-17 0z" />
        </symbol>
      </defs>
    </svg>
  );
}

export default SVGSpritesheet;
