uniform vec3 edgeColor;
uniform vec3 emissiveColor;
uniform float emissiveIntensity;

// Helper function to calculate luminance (for emissive and bloom)
float getLuminance(vec3 color) {
    // return dot(color, vec3(0.2126, 0.7152, 0.0722));
    // return average(color);
    return (color.r + color.g + color.b) / 3.0;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float kernelX[9];
    float kernelY[9];
    vec2 offset[9];

    // Define Sobel kernels for X and Y directions
    kernelX[0] = -1.0; kernelX[1] = -2.0; kernelX[2] = -1.0;
    kernelX[3] =  0.0; kernelX[4] =  0.0; kernelX[5] =  0.0;
    kernelX[6] =  1.0; kernelX[7] =  2.0; kernelX[8] =  1.0;

    kernelY[0] = -1.0; kernelY[1] =  0.0; kernelY[2] =  1.0;
    kernelY[3] = -2.0; kernelY[4] =  0.0; kernelY[5] =  2.0;
    kernelY[6] = -1.0; kernelY[7] =  0.0; kernelY[8] =  1.0;

    // Define offsets
    offset[0] = vec2(-1.0, -1.0);
    offset[1] = vec2( 0.0, -1.0);
    offset[2] = vec2( 1.0, -1.0);
    offset[3] = vec2(-1.0,  0.0);
    offset[4] = vec2( 0.0,  0.0);
    offset[5] = vec2( 1.0,  0.0);
    offset[6] = vec2(-1.0,  1.0);
    offset[7] = vec2( 0.0,  1.0);
    offset[8] = vec2( 1.0,  1.0);

    vec3 sampleTex[9];
    for (int i = 0; i < 9; i++) {
        sampleTex[i] = texture2D(inputBuffer, vUv + offset[i] / resolution.xy).rgb;
    }

    vec3 Gx = vec3(0.0);
    vec3 Gy = vec3(0.0);
    for (int i = 0; i < 9; i++) {
        Gx += kernelX[i] * sampleTex[i];
        Gy += kernelY[i] * sampleTex[i];
    }

    // Compute the gradient magnitude using both directions
    float edge = sqrt((Gx.r * Gx.r + Gx.g * Gx.g + Gx.b * Gx.b) + 
                     (Gy.r * Gy.r + Gy.g * Gy.g + Gy.b * Gy.b));

    // Calculate edge luminance
    float edgeLuminance = getLuminance(vec3(edge));

    // Base edge color
    vec3 baseColor = edgeColor * edge;
    
    // Add emission based on edge strength
    vec3 emission = emissiveColor * emissiveIntensity * edgeLuminance;
    
    // Combine base color with emission (additive)
    outputColor = vec4(baseColor + emission, inputColor.a);
}
