uniform sampler2D uSampler;
uniform float height;
uniform float width;

uniform float edgeIntensity;
uniform float rIntensity;
uniform float gIntensity;
uniform float bIntensity;
uniform bool useColors;
void main(void)
{   
    const mat3 Gx = mat3(-1, 0, 1, -2, 0, 2, -1, 0, 1);
    const mat3 Gy = mat3(-1, -2, -1, 0, 0, 0, 1, 2, 1);
    vec2 dim = vec2(width, height);
    vec2 p = vec2(gl_FragCoord.x, gl_FragCoord.y);
    vec2 x0y0 = (p + vec2(-1, -1)) / dim;
    vec2 x0y1 = (p + vec2(-1,  0)) / dim;
    vec2 x0y2 = (p + vec2(-1,  1)) / dim;
    vec2 x1y0 = (p + vec2(0, -1)) / dim;
    vec2 x1y1 = (p + vec2(0,  0)) / dim;
    vec2 x1y2 = (p + vec2(0,  1)) / dim;
    vec2 x2y0 = (p + vec2(1, -1)) / dim;
    vec2 x2y1 = (p + vec2(1,  0)) / dim;
    vec2 x2y2 = (p + vec2(1,  1)) / dim;
    vec4 tx0y0 = texture2D(uSampler, x0y0);
    vec4 tx0y1 = texture2D(uSampler, x0y1);
    vec4 tx0y2 = texture2D(uSampler, x0y2);
    vec4 tx1y0 = texture2D(uSampler, x1y0);
    vec4 tx1y1 = texture2D(uSampler, x1y1);
    vec4 tx1y2 = texture2D(uSampler, x1y2);
    vec4 tx2y0 = texture2D(uSampler, x2y0);
    vec4 tx2y1 = texture2D(uSampler, x2y1);
    vec4 tx2y2 = texture2D(uSampler, x2y2);
    mat3 id = Gx;
    vec4 colorGx = id[0][0] * tx0y0 + id[0][1] * tx1y0 + id[0][2] * tx2y0 +
                    id[1][0] * tx0y1 + id[1][1] * tx1y1 + id[1][2] * tx2y1 +
                    id[2][0] * tx0y2 + id[2][1] * tx1y2 + id[2][2] * tx2y2;
    id = Gy;
    vec4 colorGy = id[0][0] * tx0y0 + id[0][1] * tx1y0 + id[0][2] * tx2y0 +
                    id[1][0] * tx0y1 + id[1][1] * tx1y1 + id[1][2] * tx2y1 +
                    id[2][0] * tx0y2 + id[2][1] * tx1y2 + id[2][2] * tx2y2;
    if (useColors) {
        float fR = sqrt(colorGx.r * colorGx.r + colorGy.r * colorGy.r) * rIntensity;
        float fG = sqrt(colorGx.g * colorGx.g + colorGy.g * colorGy.g) * gIntensity;
        float fB = sqrt(colorGx.b * colorGx.b + colorGy.b * colorGy.b) * bIntensity;
        gl_FragColor = vec4(fR * edgeIntensity + tx0y0.r * (1.0 - edgeIntensity), fG * edgeIntensity + tx0y0.g * (1.0 - edgeIntensity), fB * edgeIntensity + tx0y0.b * (1.0 - edgeIntensity), 1);
    }
    else {
        float fGray = sqrt(colorGx.r * colorGx.r + colorGy.r * colorGy.r) * edgeIntensity;
        gl_FragColor = vec4(fGray + (1.0 - edgeIntensity) * tx0y0.r, fGray + (1.0 - edgeIntensity) * tx0y0.g, fGray + (1.0 - edgeIntensity) * tx0y0.b, 1);
    }
//  gl_FragColor = vec4(edgeIntensity * 1.0,0.0,0.0,1.0);
}