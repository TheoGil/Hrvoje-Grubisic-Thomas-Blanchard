![Preview](./preview.gif)

# Hrvoje Grubisic × Thomas Blanchard

<a href="https://theogil.github.io/Hrvoje-Grubisic-Thomas-Blanchard/" target="_blank">Check out the live version in your browser!</a>

## What

This UI experiment is an attempt to reproduce the (awesome) <a href="https://dribbble.com/shots/14243284-Cargo-Logistics-Website-Branding" target="_blank">"Cargo Logistics Website & Branding"</a> and the <a href="https://dribbble.com/shots/14250770-Cargo-Logistics-Website-Navigation" target="_blank">"Cargo Logistics Website Navigation"</a> dribbble shots by <a href="https://dribbble.com/hrvoje-grubisic" target="_blank">Hrvoje Grubisic</a>.

The video and images used are <a href="https://thomas-blanchard.com/" target="_blank">Thomas Blanchard</a>'s work.

This is not production-ready code but a technical challenge/proof of concept.

## Technical insights

This experiment is built using the `create-react-app` utility. I "ejected" it later on to customize the Webpack conf so it could load `.glsl` files.

To reproduce the "sliced" effect on the video, I went the shader way and used OGL as a framework.
Here's a little breakdown:
- Apply an "background-cover" effect to the texture, based on the texture aspect ratio and the canvas aspect ratio, we are able to resize the texture in such a way that it covers the whole canvas while keeping its original aspect ratio (ie resize but not strech).
- Slice the texture into N columns (`float currentColumnIndex = floor(vUv.x * uColumnsCount) / uColumnsCount`), apply rotation and a vertical offset based on `currentColumnIndex` 
I have tried to write the fragment shader in the most comprehensive way i could, feel free to check it out -> [src/shaders/slideshow/fragment.glsl](https://github.com/TheoGil/Hrvoje-Grubisic-Thomas-Blanchard/blob/master/src/shaders/slideshow/fragment.glsl#L39)

preload-it is used to preload all videos and display the loading progress.

can-autoplay used to check the device ability to autoplay video and provide a fallback if necessary. 

GSAP Is used to create and run animations.
