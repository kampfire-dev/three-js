void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float kernel[9];
    vec2 offset[9];

    // Define Sobel kernel
    kernel[0] = -1.0; kernel[1] = -2.0; kernel[2] = -1.0;
    kernel[3] =  0.0; kernel[4] =  0.0; kernel[5] =  0.0;
    kernel[6] =  1.0; kernel[7] =  2.0; kernel[8] =  1.0;

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
        Gx += kernel[i] * sampleTex[i];
        Gy += kernel[i] * sampleTex[i];
    }

    float edge = length(Gx + Gy);

    // Output the Sobel-filtered edge as grayscale
    outputColor = vec4(vec3(edge), inputColor.a);
}