precision mediump float;
varying vec2 vUv;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uOffsetAmount;
uniform float uColumnsCount;
uniform float uTransitionProgress;
uniform float uAngle;
uniform float uScale;
uniform vec2 uInputResolution;
uniform vec2 uOutputResolution;

// Rewritten version of this snippet ->
// https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
vec2 backgroundCover(vec2 coords) {
    // Aliases for readability
    vec2 inRes = uInputResolution;
    vec2 outRes = uOutputResolution;

    vec2 new = vec2(inRes.x * outRes.y / inRes.y, outRes.y);
    vec2 offset = vec2((new.x - outRes.x) / 2.0, 0.0);
    
    float outputAspect = outRes.x / outRes.y;
    float inputAspect = inRes.x / inRes.y;
    if (outputAspect >= inputAspect) {
        new = vec2(outRes.x, inRes.y * outRes.x / inRes.x);
        offset = vec2(0.0, (new.y - outRes.y) / 2.0);
    }
    
    offset = offset / new;

    return coords * outRes / new + offset;
}

vec2 rotate2D(vec2 p, float theta) {
    return p * mat2(cos(theta), -sin(theta), sin(theta), cos(theta));
}

void main() {
    vec2 uv = backgroundCover(vUv);
    gl_FragColor = texture2D(uTexture1, uv);

    // Compute the index of the current column, based on the X position and the total number of columns
    // Make sure to use vUv and not the uv, otherwise the end stripes might be cropped
    float currentColumnIndex = floor(vUv.x * uColumnsCount) / uColumnsCount;

    float progress = 1. - uTransitionProgress;
    
    // Compute the columns vertical offset based on X position 
    float columnYOff = currentColumnIndex * uOffsetAmount;
    
    // Use the transition progress to modulate the amount of offset applied
    float yOff = progress + columnYOff * progress;
    
    vec2 coords = vec2(uv.x, uv.y + yOff);

    if (coords.y < 1.) {
        // Compute rotation angle based on transition progression
        float angle = uAngle * (1. - uTransitionProgress);
        float scale = (uScale - 1.) * (1. - uTransitionProgress) + 1.;
    
        // Move origin
        coords -= vec2(0.5);

        // Apply scale
        coords = coords / scale;

        // Apply rotation
        // Credits -> https://www.shadertoy.com/view/3dXBR7
	    coords.x *= uInputResolution.x / uInputResolution.y;
	    coords = rotate2D(coords, angle);
	    coords.x *= 1.0 / (uInputResolution.x / uInputResolution.y);
	
        // Reset origin
        coords += vec2(0.5);

        gl_FragColor = texture2D(uTexture2, coords);
    }
}