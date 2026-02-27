export const snoiseChunk = `
vec3 mod289v3(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289v4(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289v4(((x*34.0)+10.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289v3(i);
  vec4 p=permute(permute(permute(
    i.z+vec4(0.0,i1.z,i2.z,1.0))
    +i.y+vec4(0.0,i1.y,i2.y,1.0))
    +i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 xp=floor(j*ns.z);
  vec4 yp=floor(j-7.0*xp);
  vec4 xg=xp*ns.x+ns.yyyy;
  vec4 yg=yp*ns.x+ns.yyyy;
  vec4 h=1.0-abs(xg)-abs(yg);
  vec4 b0=vec4(xg.xy,yg.xy);
  vec4 b1=vec4(xg.zw,yg.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

export const displacePosChunk = `
vec3 displacePos(vec3 pos, float uTime, vec2 uCursor) {
  float n1 = snoise(vec3(
    pos.x * 0.38 + uTime * 0.08,
    pos.z * 0.38 + uTime * 0.06,
    uTime * 0.04
  ));
  float n2 = snoise(vec3(
    pos.x * 0.85 - uTime * 0.06,
    pos.z * 0.85 + 3.0,
    uTime * 0.05
  )) * 0.35;
  float n3 = snoise(vec3(
    pos.x * 1.7 + uTime * 0.03,
    pos.z * 1.7 - 2.5,
    uTime * 0.04
  )) * 0.15;

  vec2 cw = uCursor * 6.0;
  float cd = length(pos.xz - cw);
  float ci = exp(-cd * cd * 0.08) * 1.8;

  pos.y += (n1 + n2 + n3 + ci) * 0.65;
  return pos;
}`;

export const brainVertexShader = `
${snoiseChunk}
${displacePosChunk}
uniform float uTime;
uniform vec2 uCursor;
attribute float aBrainMask;
varying float vDisplacement;
varying float vBrainMask;
varying vec2 vUv;

void main(){
  vUv=uv;
  vBrainMask=aBrainMask;
  vec3 pos = displacePos(position, uTime, uCursor);
  vDisplacement = pos.y - position.y;
  gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);
}`;

export const brainFragmentShader = `
uniform float uDark;
uniform vec3 uAccent;
varying float vDisplacement;
varying float vBrainMask;
varying vec2 vUv;

void main(){
  float baseLum=mix(0.62,0.20,uDark);
  vec3 base=vec3(baseLum);

  float glow=smoothstep(0.4,1.8,abs(vDisplacement));
  vec3 color=mix(base,uAccent,glow*0.25);

  float edge=smoothstep(0.0,0.2,vBrainMask);

  gl_FragColor=vec4(color,edge*mix(0.28,0.35,uDark));
}`;

export const signalVertexShader = `
${snoiseChunk}
${displacePosChunk}
uniform float uTime;
uniform vec2 uCursor;
attribute float aProgress;
attribute float aLineId;
varying float vProgress;
varying float vLineId;
varying vec3 vWorldPos;

void main(){
  vProgress = aProgress;
  vLineId = aLineId;
  vec3 pos = displacePos(position, uTime, uCursor);
  vWorldPos = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`;

export const signalFragmentShader = `
uniform float uDark;
uniform vec3 uAccent;
uniform float uTime;
varying float vProgress;
varying float vLineId;
varying vec3 vWorldPos;

void main(){
  float speed = 0.12 + fract(vLineId * 7.31) * 0.18;
  float phase = fract(vLineId * 13.73);
  float rawCycle = fract(uTime * speed + phase);

  float firing = smoothstep(0.0, 0.04, rawCycle) * smoothstep(0.35, 0.3, rawCycle);
  float signalPos = rawCycle / 0.3;

  float dist = abs(vProgress - clamp(signalPos, 0.0, 1.0));
  float core = exp(-dist * dist * 120.0);
  float glow = exp(-dist * dist * 15.0);
  float trail = exp(-max(vProgress - signalPos, 0.0) * 8.0) * 0.4;

  float signal = (core + glow * 0.5 + trail) * firing;

  float baseAlpha = mix(0.12, 0.14, uDark);
  vec3 baseColor = vec3(mix(0.38, 0.25, uDark));

  vec3 coreColor = mix(vec3(0.92, 0.22, 0.32), vec3(0.75, 0.88, 1.0), uDark);
  vec3 glowColor = mix(vec3(0.72, 0.08, 0.18), vec3(0.25, 0.45, 0.9), uDark);
  vec3 electricColor = mix(glowColor, coreColor, core);

  vec3 color = mix(baseColor, electricColor, clamp(signal, 0.0, 1.0));
  float alpha = baseAlpha + signal * mix(0.55, 0.5, uDark);
  alpha = clamp(alpha, 0.0, 1.0);

  float endFade = smoothstep(0.0, 0.08, vProgress) * smoothstep(0.0, 0.08, 1.0 - vProgress);
  alpha *= endFade;

  float lineR = length(vWorldPos.xz) / 9.0;
  float lineFade = 1.0 - smoothstep(0.65, 0.95, lineR);
  alpha *= lineFade;

  gl_FragColor = vec4(color, alpha);
}`;

export const fiberVertexShader = `
${snoiseChunk}
${displacePosChunk}
uniform float uTime;
uniform vec2 uCursor;
attribute float aProgress;
attribute float aLineId;
varying float vProgress;
varying float vLineId;
varying vec3 vWorldPos;

void main(){
  vProgress = aProgress;
  vLineId = aLineId;

  vec3 brainPos = displacePos(position, uTime, uCursor);
  float sway = snoise(vec3(position.x * 0.12, position.z * 0.12, uTime * 0.05)) * 0.35;
  vec3 outerPos = position;
  outerPos.y += sway;
  float blend = smoothstep(0.0, 0.3, aProgress);
  vec3 pos = mix(brainPos, outerPos, blend);

  vWorldPos = pos;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`;

export const fiberFragmentShader = `
uniform float uDark;
uniform vec3 uAccent;
uniform float uTime;
varying float vProgress;
varying float vLineId;
varying vec3 vWorldPos;

void main(){
  float speed = 0.06 + fract(vLineId * 7.31) * 0.10;
  float phase = fract(vLineId * 13.73);
  float rawCycle = fract(uTime * speed + phase);

  float firing = smoothstep(0.0, 0.04, rawCycle) * smoothstep(0.4, 0.35, rawCycle);
  float signalPos = rawCycle / 0.35;

  float dist = abs(vProgress - clamp(signalPos, 0.0, 1.0));
  float core = exp(-dist * dist * 80.0);
  float glow = exp(-dist * dist * 12.0);
  float trail = exp(-max(vProgress - signalPos, 0.0) * 5.0) * 0.3;
  float signal = (core + glow * 0.4 + trail) * firing;

  float baseAlpha = mix(0.05, 0.07, uDark);
  vec3 baseColor = vec3(mix(0.5, 0.32, uDark));

  vec3 coreColor = mix(vec3(0.92, 0.22, 0.32), vec3(0.75, 0.88, 1.0), uDark);
  vec3 glowColor = mix(vec3(0.72, 0.08, 0.18), vec3(0.25, 0.45, 0.9), uDark);
  vec3 electricColor = mix(glowColor, coreColor, core);

  vec3 color = mix(baseColor, electricColor, clamp(signal, 0.0, 1.0));
  float alpha = baseAlpha + signal * mix(0.4, 0.3, uDark);
  alpha = clamp(alpha, 0.0, 1.0);

  float tipFade = 1.0 - smoothstep(0.4, 1.0, vProgress);
  float startFade = smoothstep(0.0, 0.08, vProgress);
  alpha *= tipFade * startFade;

  gl_FragColor = vec4(color, alpha);
}`;
