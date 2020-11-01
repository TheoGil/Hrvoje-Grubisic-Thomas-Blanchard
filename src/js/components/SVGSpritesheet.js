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

        <symbol id="close" viewBox="0 0 241 241">
          <desc>Close icon</desc>
          <path d="M138 121l99-99c5-5 5-12 0-17-4-5-12-5-17 0l-99 99L21 4C16-1 9-1 4 4c-5 4-5 12 0 17l100 100L4 220c-5 5-5 13 0 18 4 4 12 4 17 0l100-100 99 99c5 5 13 5 18 0 4-4 4-12 0-17l-100-99z" />
        </symbol>

        <symbol id="burger-menu" viewBox="0 0 512 512">
          <desc>Menu icon</desc>
          <path d="M492 236H20a20 20 0 100 40h472a20 20 0 100-40z" />
          <path d="M492 76H20a20 20 0 100 40h472a20 20 0 100-40z" />
          <path d="M492 396H20a20 20 0 100 40h472a20 20 0 100-40z" />
        </symbol>
      </defs>
    </svg>
  );
}

export default SVGSpritesheet;
