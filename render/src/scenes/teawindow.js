// The teahouse window (shots 2.5 and 3.1): the view across West Lake behind the glass, drawn live as a multi-plane camera.
// The roto layer shows a flat take, so everything in it scales rigidly with the wall when the shot pulls back. Here the
// view outside is four painted planes plus snow, each with a depth weight d (0 = on the wall, 1 = at infinity), laid over
// the redrawn take inside the glass on every film frame (on ones):
//     p(t) = c(t) + (p0 - c0) * (z0 / z(t))^d + (1 - d) * (c0 - c(t))        screen = (p - c) * z + 0.5
// in fractions of the take's key plate; c, z = the roto layer's own view (eased from -> to, centre clamped, exactly as in
// roto/index.js and roto/shader.js), (c0, z0) = REF. d = 0 keeps p = p0 (the wall); d = 1 keeps its place on screen.
// The same view is also baked into the take (media/gen/P_3.1/take_6, work/rev8/WALL2/build_take.py), but the redraw works
// from flow-stabilised colour guides and a view sliding slowly inside a still frame comes out smeared; this pass is crisp
// and what is left of the baked view under the glass edge is the same picture.
//   teaWindow(ctx, t)   from a shot's type hook, BEFORE its lyric; the shot lists TEA_WINDOW_KEYS in `needs`. It reads
//                       the push from the shot's own roto layer, and draws nothing when the shot shows no roto layer.
// One shader pass (like scenes/earthview.js), not a 2D layer: the picture is laid on the shot's paper the way the roto
// layer lays the painted keyframe (colour x paper texture at 0.55), which pipe.layer cannot do; the post pass (grain,
// vignette) falls over it with the rest of the frame.
// Planes: media/keyframes/W31_{A,B,G,D}.png (straight alpha, painted size, toned as the redraw showed the baked view) and
// the matte of the glass W31_glass.png, written with the constants below by work/rev8/WALL3/export_planes.py from WALL2's
// cut of the painting media/keyframes_public/3.1/w8_1. The take's camera is locked (meta.T is the identity) and the take
// is 16:9. If P_3.1 gets another take or is prepped again, run that script again (it places the glass by the key plate).
// Deterministic: a pure function of film time (the snow is a fixed table of flakes falling on the film clock).
import { PAPER_GLSL } from '../paper.js';
import { easeInOutSine } from '../util.js';

// ---- written by work/rev8/WALL3/export_planes.py (also in media/keyframes/W31_planes.json): do not edit by hand ----
const REF = { x: 0.5, y: 0.5, zoom: 1.12 };   // the state the planes were painted for: the cut from 2.5 to 3.1
const PLANES = [   // back to front. rect: x0, y0, x1, y1 in key-plate fractions at REF; d: depth weight (0 = wall, 1 = infinity)
  { key: 'W31_A', rect: [0.086085, 0.081412, 0.465172, 0.455346], d: 0.9 },   // sky and the Wulin towers
  { key: 'W31_B', rect: [0.086085, 0.200427, 0.284031, 0.455316], d: 0.7 },   // Precious Stone Hill and its pagoda
  { key: 'W31_G', rect: [0.086085, 0.290046, 0.465172, 0.455346], d: 0.6, dNear: 0.25, yFar: 0.325818, yNear: 0.455486 },   // the shore (Bai Causeway, Broken Bridge, low roofs) and the lake, a ground plane
  { key: 'W31_D', rect: [0.086085, 0.252038, 0.283205, 0.400297], d: 0.45 },   // the wooded point of Solitary Hill
];
// the matte of the glass (the opening minus frame and mullions; panes x 0.1197-0.4403, y 0.1312-0.3804). The roto layer draws the
// window frame partly from its key plate and partly from the redrawn take, and prep registered the key plate of roto/take_6
// -0.41, -0.49 take px from the take's own frame: the matte sits 0.5 of the way between the two
const GLASS = { key: 'W31_glass', rect: [0.116101, 0.124750, 0.443918, 0.386838] };
const SNOW = { y0: 55, h: 260, t0: 44.375000, white: [0.9490, 0.9490, 0.9412],   // take px of a 1280 x 720 frame; t0: film time of take frame 0
  // d, x, y, radius, fall px/s, drift px/s, sway phase, alpha
  flakes: [
    [0.3, 561.586, 17.596, 1.269, 29.78, -0.226, 0.249, 0.42],
    [0.3, 198.265, 254.454, 1.121, 30.722, 2.838, 4.428, 0.441],
    [0.3, 322.196, 26.973, 1.114, 28.418, -6.807, 5.291, 0.536],
    [0.3, 368.801, 165.206, 1.238, 31.29, 2.944, 3.628, 0.432],
    [0.3, 456.414, 179.527, 1.342, 31.439, -3.765, 0.256, 0.474],
    [0.3, 424.11, 190.879, 1.268, 30.784, -0.953, 1.465, 0.466],
    [0.3, 318.866, 10.83, 1.381, 26.669, 2.703, 4.977, 0.443],
    [0.3, 291.401, 64.454, 1.248, 26.25, -2.752, 4.732, 0.475],
    [0.3, 423.843, 111.308, 1.251, 32.914, -0.245, 5.636, 0.528],
    [0.3, 361.031, 108.198, 1.28, 31.457, -3.827, 3.92, 0.466],
    [0.3, 599.856, 60.547, 1.168, 32.808, -2.262, 1.643, 0.444],
    [0.3, 472.849, 173.222, 1.127, 28.485, -1.789, 5.455, 0.503],
    [0.3, 138.757, 163.02, 1.377, 29.331, 1.712, 5.655, 0.443],
    [0.3, 286.719, 57.609, 1.197, 31.457, 0.71, 0.404, 0.54],
    [0.3, 144.408, 239.242, 1.19, 26.548, -6.875, 0.836, 0.414],
    [0.1, 582.616, 152.545, 1.844, 49.193, -1.444, 2.449, 0.673],
    [0.1, 254.928, 196.674, 1.721, 59.324, 2.147, 5.486, 0.663],
    [0.1, 510.378, 181.061, 1.735, 50.03, -3.121, 2.734, 0.779],
    [0.1, 420.981, 156.758, 1.843, 61.709, 1.952, 1.671, 0.829],
    [0.1, 510.313, 84.203, 2.204, 57.113, -1.076, 2.177, 0.643],
    [0.1, 566.338, 234.73, 2.029, 56.873, 0.897, 0.029, 0.684],
    [0.1, 147.161, 252.775, 1.981, 53.37, 0.875, 3.071, 0.752],
    [0.1, 589.893, 160.186, 1.936, 53.722, -0.723, 2.582, 0.747],
  ] };
// ---- end of the exported block ----
const TAKE = [1280, 720];   // the take's frame (px): snow units, and the cover fit of roto/shader.js
const NF = SNOW.flakes.length;
// the shot's paper, as core.js and roto/index.js name it (kind for paperColor, ground colour the texture is taken against)
const PAPER_KIND = { xuan: 0, silk: 1, indigo: 2, silknight: 3, rubbing: 4 };
const GROUND = { silk: [0.886, 0.816, 0.675], silknight: [0.337, 0.326, 0.351], xuan: [0.949, 0.937, 0.910], indigo: [0.09, 0.13, 0.245], rubbing: [0.075, 0.072, 0.07] };

export const TEA_WINDOW_KEYS = [...PLANES.map((p) => p.key), GLASS.key];

// Coordinates: P design px -> q (0..1 screen) -> p (key-plate fraction on the wall, the roto layer's view) -> p0 (the
// same point of a plane at REF, the formula above solved for p0) -> the plane's own uv through its rect.
// Each pixel is 4 x 4 samples of the planes at their painted size, composited back to front per sample.
const FS = /* glsl */`${PAPER_GLSL}
uniform vec4 uCam;
vec2 toPaper(vec2 P){ vec2 c = vec2(960., 540.); return rot(-uCam.w) * ((P - c) / uCam.z) + c + uCam.xy; }
uniform sampler2D uPrev, uA, uB, uG, uD, uGlass;
uniform vec4 uRa, uRb, uRg, uRd, uRgl;   // the planes' and the matte's rects at REF (key-plate fractions)
uniform vec3 uView, uRef;                // centre + zoom: the shot's view now (centre already clamped), and REF
uniform vec2 uSpan;                      // cover fit of the take in the frame (roto/shader.js)
uniform vec3 uDepth;                     // d of A, B, D
uniform vec4 uGround;                    // G: d at the far waterline, d at the painting's lower edge, their y at REF
uniform vec4 uFlake[${NF}];              // x, y (take px on the wall, now), radius (take px), alpha
uniform vec2 uTake;
uniform vec3 uWhite, uPm;
uniform int uKind; uniform float uSeed;
out vec4 o;

vec2 back(vec2 p, float d){              // where the plane point seen at p sat at REF
  return uRef.xy + (p - uView.xy - (1. - d) * (uRef.xy - uView.xy)) / pow(uRef.z / uView.z, d);
}
// the ground: d falls linearly with the reference row from the far waterline to the painting's lower edge, so the row
// is found by Newton steps on the (monotone, nearly linear) map row -> screen; returns p0 and 1 / scale
vec3 backGround(vec2 p){
  float L = log(uRef.z / uView.z), k = (uGround.y - uGround.x) / (uGround.w - uGround.z), cy = uRef.y - uView.y;
  float y = uRef.y + (p.y - uView.y - (1. - uGround.x) * cy) / exp(L * uGround.x), d = uGround.x, e = 1.;
  for (int i = 0; i < 6; i++) {
    float tt = (y - uGround.z) / (uGround.w - uGround.z), dd = tt > 0. && tt < 1. ? k : 0.;
    d = mix(uGround.x, uGround.y, clamp(tt, 0., 1.)); e = exp(L * d);
    y -= (uView.y + (y - uRef.y) * e + (1. - d) * cy - p.y) / (e * (1. + (y - uRef.y) * L * dd) - dd * cy);
  }
  d = mix(uGround.x, uGround.y, clamp((y - uGround.z) / (uGround.w - uGround.z), 0., 1.)); e = exp(L * d);
  return vec3(uRef.x + (p.x - uView.x - (1. - d) * (uRef.x - uView.x)) / e, y, 1. / e);
}
// uv of a plane at p0, the uv step of one sample, and the mip level one sample covers
vec2 uvOf(vec4 r, vec2 p0){ return (p0 - r.xy) / (r.zw - r.xy); }
float lodOf(sampler2D s, vec2 duv){ vec2 t = vec2(textureSize(s, 0)) * duv; return max(0., log2(max(t.x, t.y))); }

void main(){
  vec2 P = PX();
  vec3 prev = texelFetch(uPrev, ivec2(gl_FragCoord.xy), 0).rgb;   // the frame so far, texel for texel: outside the glass this pass changes nothing
  vec2 p = uView.xy + (P / vec2(1920., 1080.) - .5) * uSpan / uView.z;
  if (any(lessThan(p, uRgl.xy)) || any(greaterThan(p, uRgl.zw))) { o = vec4(prev, 1.); return; }
  vec2 st = uSpan / (uRes * uView.z) * 0.25;                  // one sample step (a quarter of a device px) on the wall
  vec2 gu = uvOf(uRgl, p), gs = st / (uRgl.zw - uRgl.xy);
  float lgl = lodOf(uGlass, gs), g = 0.;
  for (int j = 0; j < 4; j++) for (int i = 0; i < 4; i++) g += textureLod(uGlass, gu + (vec2(float(i), float(j)) - 1.5) * gs, lgl).r;
  g /= 16.;
  if (g <= 0.) { o = vec4(prev, 1.); return; }
  float sr = uRef.z / uView.z;
  vec3 g0 = backGround(p);
  vec2 ua = uvOf(uRa, back(p, uDepth.x)), ub = uvOf(uRb, back(p, uDepth.y)), ug = uvOf(uRg, g0.xy), ud = uvOf(uRd, back(p, uDepth.z));
  vec2 sa = st / pow(sr, uDepth.x) / (uRa.zw - uRa.xy), sb = st / pow(sr, uDepth.y) / (uRb.zw - uRb.xy);
  vec2 sg = st * g0.z / (uRg.zw - uRg.xy), sd = st / pow(sr, uDepth.z) / (uRd.zw - uRd.xy);
  float la = lodOf(uA, sa), lb = lodOf(uB, sb), lg = lodOf(uG, sg), ld = lodOf(uD, sd);
  vec3 acc = vec3(0.);
  for (int j = 0; j < 4; j++) for (int i = 0; i < 4; i++) {
    vec2 k = vec2(float(i), float(j)) - 1.5;
    vec3 c = textureLod(uA, ua + k * sa, la).rgb;
    vec4 b = textureLod(uB, ub + k * sb, lb); c = mix(c, b.rgb, b.a);
    vec4 gr = textureLod(uG, ug + k * sg, lg); c = mix(c, gr.rgb, gr.a);
    vec4 dn = textureLod(uD, ud + k * sd, ld); c = mix(c, dn.rgb, dn.a);
    acc += c;
  }
  vec3 col = acc / 16.;
  // falling snow behind the glass: soft discs, the nearer flakes larger
  vec2 pt = p * uTake; float sn = 0.;
  for (int i = 0; i < ${NF}; i++) sn = max(sn, uFlake[i].w * clamp((1.15 - length(pt - uFlake[i].xy) / uFlake[i].z) / 0.5, 0., 1.));
  col = mix(col, uWhite, sn);
  // on our paper, as the roto layer lays the painted keyframe (roto/shader.js: keyN)
  col *= mix(vec3(1.), paperColor(uKind, toPaper(P), uSeed) / uPm, 0.55);
  o = vec4(mix(prev, col, g), 1.);
}`;

let prog = null;
export function teaWindow(ctx, t) {
  const shot = ctx.shot, T = ctx.tex;
  const R = (Array.isArray(shot.scene) ? shot.scene : [shot.scene]).find((l) => l && l.type === 'roto');
  if (!R || R.rect || TEA_WINDOW_KEYS.some((k) => !T[k])) return;   // the still keyframe or a placeholder is on screen: its own painted view stays
  if (!prog) prog = ctx.gl.program(FS, 'teawindow');
  // the roto layer's view (roto/index.js: eased from -> to; roto/shader.js: cover fit, centre clamped)
  const lt = t - shot.t0, dur = Math.max(1e-3, shot.t1 - shot.t0);
  const a = R.from || { x: 0.5, y: 0.5, zoom: 1 }, b = R.to || a;
  const u = easeInOutSine(Math.min(1, Math.max(0, lt / dur)));
  const z = a.zoom + (b.zoom - a.zoom) * u;
  const ar = TAKE[0] / TAKE[1], rar = 1920 / 1080, span = ar > rar ? [rar / ar, 1] : [1, ar / rar];
  const hx = span[0] / z * 0.5, hy = span[1] / z * 0.5;
  const cx = Math.min(Math.max(a.x + (b.x - a.x) * u, hx), 1 - hx), cy = Math.min(Math.max(a.y + (b.y - a.y) * u, hy), 1 - hy);
  // snow: each flake falls on the film clock at REF and takes its plane's parallax (take px on the wall, now)
  const ts = t - SNOW.t0, fl = [];
  for (const [d, x, y, r, vy, vx, ph, al] of SNOW.flakes) {
    const x0 = (x + vx * ts + 2.5 * Math.sin(ph + 1.7 * ts) + 0.5) / TAKE[0], y0 = (SNOW.y0 + (((y + vy * ts) % SNOW.h) + SNOW.h) % SNOW.h + 0.5) / TAKE[1];
    const s = Math.pow(REF.zoom / z, d);
    fl.push((cx + (x0 - REF.x) * s + (1 - d) * (REF.x - cx)) * TAKE[0], (cy + (y0 - REF.y) * s + (1 - d) * (REF.y - cy)) * TAKE[1], r, al);
  }
  const [A, B, G, D] = PLANES;
  ctx.pipe.apply(prog, {
    uA: T[A.key], uB: T[B.key], uG: T[G.key], uD: T[D.key], uGlass: T[GLASS.key],
    uRa: A.rect, uRb: B.rect, uRg: G.rect, uRd: D.rect, uRgl: GLASS.rect,
    uView: [cx, cy, z], uRef: [REF.x, REF.y, REF.zoom], uSpan: span,
    uDepth: [A.d, B.d, D.d], uGround: [G.d, G.dNear, G.yFar, G.yNear],
    uFlake: fl, uTake: TAKE, uWhite: SNOW.white,
    uKind: { i: PAPER_KIND[shot.paper] ?? 1 }, uPm: GROUND[shot.paper] || GROUND.silk, uSeed: shot.paperSeed ?? (shot.grain ?? ctx.shotIndex) * 0.37,
  });
}
