import { Renderer, Triangle, Program, Mesh, Texture } from "ogl";
// import Tweakpane from "tweakpane";
import gsap from "gsap";
import fragment from "../shaders/slideshow/fragment.glsl";
import vertex from "../shaders/slideshow/vertex.glsl";
import transparentPixelSrc from "../img/transparent-pixel.png";

const PARAMS = {
  offsetAmount: 2.25,
  columnsCount: 3,
};

class GL {
  constructor(options) {
    this.transitionProgress = 0;
    this.currentSlideIndex = 0;
    this.nextSlideIndex = 0;

    this.render = this.render.bind(this);

    this.initRenderer(options.canvas);
    this.initGl();
    this.initTransparentTexture();
    this.initProgram();
    this.initGeometry();
    this.initMesh();
    this.initTextures(options.slidesCount);
    // this.initGUI();

    requestAnimationFrame(this.render);
  }

  initRenderer(canvas) {
    this.renderer = new Renderer({
      canvas,
      alpha: true,
    });
  }

  initGl() {
    this.gl = this.renderer.gl;
    this.gl.clearColor(0.0666, 0.098, 0.1686, 1);
  }

  initGeometry() {
    // Rather than using a plane (two triangles) to cover the viewport here is a
    // triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
    // Excess will be out of the viewport.

    //         position                uv
    //      (-1, 3)                  (0, 2)
    //         |\                      |\
    //         |__\(1, 1)              |__\(1, 1)
    //         |__|_\                  |__|_\
    //   (-1, -1)   (3, -1)        (0, 0)   (2, 0)
    this.geometry = new Triangle(this.gl);
  }

  initTransparentTexture() {
    this.transparentPixelTexture = new Texture(this.gl);
    const img = new Image();
    img.src = transparentPixelSrc;
    img.onload = () => (this.transparentPixelTexture.image = img);
  }

  initTextures(count) {
    this.textures = [];

    for (let i = 0; i < count; i++) {
      // Init empty texture while source loading
      this.textures.push(
        new Texture(this.gl, {
          generateMipmaps: false,
          width: 1920, // @TODO Dynamically set size based on video actual size
          height: 1080, // @TODO Dynamically set size based on video actual size
        })
      );
    }
  }

  initProgram() {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        uTexture1: { value: this.transparentPixelTexture },
        uTexture2: { value: this.transparentPixelTexture },
        uOffsetAmount: { value: PARAMS.offsetAmount },
        uColumnsCount: { value: PARAMS.columnsCount },
        uTransitionProgress: { value: this.transitionProgress },
        uInputResolution: { value: [16, 9] }, // @TODO dynamically retrieve real slide dimensions
        uOutputResolution: { value: [0, 0] }, // Will be set from the updateSize method
        uAngle: { value: (45 * Math.PI) / 180 },
        uScale: { value: 3 },
      },
    });
  }

  initMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
  }

  /*
  initGUI() {
    this.tweakpane = new Tweakpane();

    this.tweakpane
      .addInput(PARAMS, "columnsCount", {
        min: 1,
        max: 10,
        step: 1,
      })
      .on("change", (value) => {
        this.program.uniforms.uColumnsCount.value = value;
      });

    this.tweakpane
      .addInput(PARAMS, "offsetAmount", {
        min: 0,
        max: 10,
      })
      .on("change", (value) => {
        this.program.uniforms.uOffsetAmount.value = value;
      });

    this.tweakpane
      .addInput(this, "transitionProgress", {
        min: 0,
        max: 1,
      })
      .on("change", (value) => {
        this.program.uniforms.uTransitionProgress.value = value;
      });
  }
  */

  updateSize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.program.uniforms.uOutputResolution.value = [
      window.innerWidth,
      window.innerHeight,
    ];
  }

  attachVideosToEmptyTextures(videos) {
    videos.forEach((video, i) => {
      this.textures[i].image = video;
    });
  }

  isTransitionRunning() {
    return this.transitionProgress !== 0;
  }

  goToSlide(index) {
    this.nextSlideIndex = index;

    this.program.uniforms.uTexture2.value = this.textures[index];
    gsap.killTweensOf(this);
    gsap.to(this, {
      transitionProgress: 1,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        this.updateTransitionProgressUniform();
      },
      onComplete: () => {
        this.transitionProgress = 0;
        this.currentSlideIndex = index;
        this.program.uniforms.uTexture1.value = this.textures[index];
        this.updateTransitionProgressUniform();
      },
    });
  }

  updateTransitionProgressUniform() {
    this.program.uniforms.uTransitionProgress.value = this.transitionProgress;
  }

  dispose() {
    this.program.remove();
    this.geometry.remove();
  }

  render() {
    requestAnimationFrame(this.render);

    if (this.textures && this.textures[this.currentSlideIndex].image) {
      this.textures[this.currentSlideIndex].needsUpdate = true;
    }

    if (
      this.textures &&
      this.isTransitionRunning() &&
      this.textures[this.nextSlideIndex].image
    ) {
      this.textures[this.nextSlideIndex].needsUpdate = true;
    }

    this.renderer.render({ scene: this.mesh });
  }
}

export default GL;
