# single-shader-loader
Glsl shader loader from webpack. You can combine vertex and fragment in a single file.

## Install
```node
npm install single-shader-loader --save-dev
```

Config webpack:
```json
module: [
  rules: [
    {
      test: /\.(shader|glsl)$/,
      loader: 'single-shader-loader',
    },
  ]
]
```

## Example
You can code `./shader/example.shader` as:
```C++
varying vec3 vAlpha; // It's going to be filled in both vertex and fragment.

vertex:
attribute float aAlpha;
void main() {
  vAlpha = aAlpha;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

fragment:
void main() {
  gl_FragColor = vec4(color, vAlpha);
}
```

You can now require your glsl file:
```javascript
import { vertex, fragment } from './shader/example.shader';
const material = new THREE.ShaderMaterial({
  vertexShader:   vertex,
  fragmentShader: fragment,
});
```
