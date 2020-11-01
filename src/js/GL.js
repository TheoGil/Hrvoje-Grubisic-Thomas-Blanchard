import { Renderer, Triangle, Program, Mesh, Texture } from "ogl";
// import Tweakpane from "tweakpane";
import gsap from "gsap";
import fragment from "../shaders/slideshow/fragment.glsl";
import vertex from "../shaders/slideshow/vertex.glsl";
import transparentPixelSrc from "../img/transparent-pixel.png";

console.log(fragment, vertex);

const PARAMS = {
  offsetAmount: 2.25,
  columnsCount: 3,
};

class GL {
  constructor(options) {
    this.transitionProgress = 0;
    this.currentSlideIndex = 0;
    this.nextSlideIndex = 0;

    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);

    this.initRenderer(options.canvas);
    this.initGl();
    this.initTransparentTexture();
    this.initSlides(options.slides);
    this.initProgram();
    this.initGeometry();
    this.initMesh();
    // this.initGUI();

    this.resize(); // Trigger resize right away to set the initial size of our plane
    window.addEventListener("resize", this.resize);

    // requestAnimationFrame(this.render);
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

  initSlides(slides) {
    this.slides = slides;
    this.slides.forEach((slide) => {
      // Init empty texture while source loading
      const texture = new Texture(this.gl, {
        generateMipmaps: false,
        width: 1920, // @TODO Dynamically set size based on video actual size
        height: 1080, // @TODO Dynamically set size based on video actual size
      });

      // Create video with attributes that let it autoplay
      // Check update loop to see when video is attached to texture
      const video = document.createElement("video");
      video.src = slide.src;

      // Disclaimer: video autoplay is a confusing, constantly-changing browser feature.
      // The best approach is to never assume that it will work, and therefore prepare for a fallback.
      // Tested on mac: Chrome, Safari, Firefox; android: chrome
      video.loop = true;
      video.muted = true;
      video.play();
      // TODO: test ios. Possible add following
      // video.setAttribute('crossorigin', 'anonymous');
      // video.setAttribute('webkit-playsinline', true);
      // video.setAttribute('playsinline', true);

      slide.texture = texture;
      slide.video = video;
    });
  }

  initProgram() {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        uTexture1: { value: this.transparentPixelTexture },
        uTexture2: { value: this.slides[this.nextSlideIndex].texture },
        uOffsetAmount: { value: PARAMS.offsetAmount },
        uColumnsCount: { value: PARAMS.columnsCount },
        uTransitionProgress: { value: this.transitionProgress },
        uInputAspect: { value: 1920 / 1080 }, // @TODO dynamically retrieve real slide dimensions
        uInputResolution: { value: [1920, 1080] }, // @TODO dynamically retrieve real slide dimensions
        uOutputAspect: { value: window.innerWidth / window.innerHeight }, // @TODO update on resize
        uOutputResolution: { value: [window.innerWidth, window.innerHeight] },
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

  resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.program.uniforms.uOutputResolution.value = [
      window.innerWidth,
      window.innerHeight,
    ];
  }

  updateTexture(slide) {
    if (slide) {
      // Attach video and/or update texture when video is ready
      if (slide.video.readyState >= slide.video.HAVE_ENOUGH_DATA) {
        if (!slide.texture.image) {
          slide.texture.image = slide.video;
        }
        slide.texture.needsUpdate = true;
      }
    }
  }

  isTransitionRunning() {
    return this.transitionProgress !== 0;
  }

  render() {
    requestAnimationFrame(this.render);

    this.updateTexture(this.slides[this.currentSlideIndex]);

    if (this.isTransitionRunning()) {
      this.updateTexture(this.slides[this.nextSlideIndex]);
    }

    this.renderer.render({ scene: this.mesh });
  }

  goToSlide(index) {
    this.nextSlideIndex = index;

    this.program.uniforms.uTexture2.value = this.slides[index].texture;
    gsap.killTweensOf(this);
    gsap.to(this, {
      transitionProgress: 1,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        this.program.uniforms.uTransitionProgress.value = this.transitionProgress;
      },
      onComplete: () => {
        this.transitionProgress = 0;
        this.currentSlideIndex = index;
        this.program.uniforms.uTexture1.value = this.slides[index].texture;
      },
    });
  }
}

export default GL;
