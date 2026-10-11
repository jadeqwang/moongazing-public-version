// SECTION 7 · DROP — 122.77–189.86 — GOLD paper, glowing (instrumental, erhu lead). No lyrics: data type, counters,
// the call delay, the family chat, the livestream delay. K-pop cutting: every 2 beats in A (the speed-build) and E (the
// toast), every bar in B (the work) and C (the calls), one crew portrait per beat in the 7.C4 run.
import { recast, hud, kf, ph, bump, smooth, clamp } from './_lib.js';
import { CREW, CELLS, crewCell } from './05_interlude.js';
import { earthView, EARTH_KEYS } from '../scenes/earthview.js';
import { CUTS as BUILD } from '../scenes/buildsite.js';
import { lampView, lampNight, lampLight } from '../scenes/worklamps.js';

export const range = [120.96, 187.32];

// ---- overlays pinned to a painting -----------------------------------------------------------------------------
// the plate's image-uv → design-px map at local time lt (same maths as scenes/plate.js plateMap; overlay shots use
// dolly 0 and par 0 so the map is exact). Keyframes here are 2752×1536 unless given.
const ease = (x) => 0.5 - 0.5 * Math.cos(Math.PI * clamp(x));
function pmap(o, lt, dur, W = 2752, H = 1536, rect = [0, 0, 1920, 1080]) {
  const u = ease(lt / dur), a = o.from, b = o.to || o.from;
  const v = [a.x + (b.x - a.x) * u, a.y + (b.y - a.y) * u, a.zoom + (b.zoom - a.zoom) * u];
  const ar = W / H, rar = rect[2] / rect[3], span = ar > rar ? [rar / ar, 1] : [1, ar / rar];
  const half = [span[0] / v[2] * 0.5 + 0.004, span[1] / v[2] * 0.5 + 0.004];
  const c = [clamp(v[0], half[0], 1 - half[0]), clamp(v[1], half[1], 1 - half[1])];
  const ax = rect[2] * v[2] / span[0], ay = rect[3] * v[2] / span[1];
  return { s: ax / W, at: ([x, y]) => [rect[0] + rect[2] * 0.5 + (x - c[0]) * ax, rect[1] + rect[3] * 0.5 + (y - c[1]) * ay],
    px: ([x, y]) => [rect[0] + rect[2] * 0.5 + (x / W - c[0]) * ax, rect[1] + rect[3] * 0.5 + (y / H - c[1]) * ay] };
}
// a plain plate (no depth tricks) so overlays stay pinned
const flat = (img, from, to, o = {}) => ({ name: 'plate', params: { img, grade: 'native', from, to, dolly: 0, ...o } });

// 7.B4 — Kenji's film-strip dipoles, traced from K_7.B4 (image px), each unrolling from the rover
const STRIPS = [
  [[930, 1135], [800, 1125], [600, 1110], [400, 1095], [270, 1080], [215, 1060], [190, 1020], [220, 985], [300, 965], [400, 955], [550, 962], [650, 955], [750, 935], [812, 898], [828, 872], [812, 838], [780, 820], [700, 808], [600, 797], [500, 781], [440, 748], [405, 712]],
  [[1130, 853], [1000, 845], [900, 830], [800, 800], [720, 775], [660, 745], [620, 718]],
  [[1125, 918], [1000, 895], [900, 875], [800, 840], [700, 790], [620, 740], [575, 700], [540, 656]],
  [[1380, 885], [1500, 905], [1650, 915], [1750, 905], [1850, 885], [1900, 860], [1912, 848], [1893, 853]],
  [[1380, 963], [1500, 985], [1650, 1000], [1800, 1008], [1950, 1012], [2100, 1022], [2250, 1018], [2350, 1000], [2405, 982], [2412, 960], [2428, 952], [2452, 968]],
  [[1420, 1165], [1550, 1178], [1700, 1186], [1800, 1190], [1950, 1200], [2100, 1204], [2200, 1194], [2280, 1170], [2302, 1150], [2280, 1140], [2200, 1146], [2100, 1162], [2000, 1186], [1950, 1212], [1940, 1240]],
];
function polyLen(P) { const L = [0]; for (let i = 1; i < P.length; i++) L.push(L[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1])); return L; }
// the sub-path of P (screen px) from arclength a to b
function subPath(g, P, L, a, b) {
  g.beginPath(); let started = false;
  for (let i = 1; i < P.length; i++) {
    const l0 = L[i - 1], l1 = L[i]; if (l1 < a || l0 > b) continue;
    const f0 = clamp((a - l0) / (l1 - l0 || 1)), f1 = clamp((b - l0) / (l1 - l0 || 1));
    const p0 = [P[i - 1][0] + (P[i][0] - P[i - 1][0]) * f0, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * f0];
    const p1 = [P[i - 1][0] + (P[i][0] - P[i - 1][0]) * f1, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * f1];
    if (!started) { g.moveTo(p0[0], p0[1]); started = true; }
    g.lineTo(p1[0], p1[1]);
  }
}
function pointAt(P, L, a) {
  for (let i = 1; i < P.length; i++) if (L[i] >= a) { const f = (a - L[i - 1]) / (L[i] - L[i - 1] || 1); return [P[i - 1][0] + (P[i][0] - P[i - 1][0]) * f, P[i - 1][1] + (P[i][1] - P[i - 1][1]) * f]; }
  return P[P.length - 1];
}
function strips(ctx, M, lt) {
  const S = STRIPS.map((P) => P.map(M.px)), Ls = S.map(polyLen);
  const prog = S.map((P, i) => { const L = Ls[i][Ls[i].length - 1]; const u = smooth(0.12 + i * 0.07, 1.25 + i * 0.05, lt); return L * (1 - Math.pow(1 - u, 1.6)); });
  // the painted strips not yet unrolled sink back into the dark floor
  ctx.pipe.layer((g) => {
    g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = 'rgb(62,60,62)'; g.lineWidth = 10 * M.s + 3; g.filter = 'blur(1.5px)';
    S.forEach((P, i) => { const L = Ls[i]; if (prog[i] < L[L.length - 1] - 2) { subPath(g, P, L, prog[i] + 6, L[L.length - 1] + 20); g.stroke(); } });
  }, { mode: 'ink', opacity: 0.7, seed: 781 });
  // the deployed film: 泥金 line, with a lamp-glint running at each unrolling head
  ctx.pipe.layer((g) => {
    g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = 'rgb(255,226,170)'; g.lineWidth = 3.2;
    S.forEach((P, i) => { if (prog[i] > 1) { subPath(g, P, Ls[i], 0, prog[i]); g.stroke(); } });
  }, { mode: 'gold', seed: 782 });
  ctx.pipe.layer((g) => {
    g.lineCap = 'round'; g.lineJoin = 'round'; g.filter = 'blur(6px)'; g.strokeStyle = 'rgba(255,176,80,0.5)'; g.lineWidth = 9;
    S.forEach((P, i) => { if (prog[i] > 1) { subPath(g, P, Ls[i], 0, prog[i]); g.stroke(); } });
    g.filter = 'blur(3px)';
    S.forEach((P, i) => {
      const L = Ls[i][Ls[i].length - 1]; if (prog[i] < 2 || prog[i] > L - 1) return;
      const [x, y] = pointAt(P, Ls[i], prog[i]);
      const gr = g.createRadialGradient(x, y, 0, x, y, 16); gr.addColorStop(0, 'rgba(255,240,200,0.95)'); gr.addColorStop(1, 'rgba(255,170,60,0)');
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, 16, 0, Math.PI * 2); g.fill();
    });
  }, { mode: 'screen', seed: 783 });
  return prog.map((p, i) => p / Ls[i][Ls[i].length - 1]);
}
// a small gold spectrogram strip (data type): columns of noise-band energy, the quiet sky
function spectrogram(ctx, x, y, w, h, t, a) {
  if (a <= 0) return;
  ctx.pipe.layer((g) => {
    g.strokeStyle = `rgba(212,168,75,${0.6 * a})`; g.lineWidth = 1; g.strokeRect(x, y, w, h);
    const cols = 64, rows = 12, cw = w / cols, rh = h / rows, head = Math.floor(t * 24);
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      const k = head - (cols - c), s = Math.sin(k * 12.9898 + r * 78.233) * 43758.5453, n = s - Math.floor(s);
      const e = n * (0.35 + 0.65 * Math.exp(-r / 5)) * (c > cols - 3 ? 1 : 0.8);
      if (e < 0.42) continue;
      g.fillStyle = `rgba(232,190,110,${(e - 0.42) * 1.6 * a})`; g.fillRect(x + c * cw, y + h - (r + 1) * rh, cw - 0.6, rh - 0.6);
    }
  }, { mode: 'over', seed: 784 });
}

// 7.B6 — the lights of K_7.B6 (image uv, size in image px), lit one by one. Since the plate was repainted against the
// station model (rev 3, Oct 8: the regolith mounds have no windows) these are the lights the model has from this camera
// (media/guanghan/guides/7.B6_flat.png): the cupola's glass dome (DOME, first), then 3 arched hub windows, 5 portholes in
// the cupola's sill wall, 4 portholes on the west tunnel, 2 on the south tunnel, the south node's window and its hatch lamp.
const DOME = [0.5004, 0.4596, 75, 86];   // centre of the sill line (uv), half-width and height of the glass (image px)
const WINDOWS = [[DOME[0], 0.4342, 0], [0.4640, 0.4883, 16], [0.4793, 0.4902, 34], [0.4985, 0.4889, 34], [0.4742, 0.4609, 9], [0.4797, 0.4616, 9], [0.4902, 0.4622, 9], [0.5055, 0.4616, 9], [0.5174, 0.4603, 9], [0.3895, 0.5553, 22], [0.4037, 0.5514, 22], [0.4168, 0.5488, 22], [0.4295, 0.5449, 22], [0.6257, 0.5417, 20], [0.6628, 0.5482, 20], [0.6977, 0.5456, 22], [0.7213, 0.5677, 56, 0.3]];   // (the hatch lamp: a wide glow on the ground, a small lamp)
// lighting order: the dome, then outward from the hub (the node and its hatch last), one per eighth note
const WIN_ORDER = WINDOWS.map((w, i) => [i ? Math.abs(w[0] - DOME[0]) + Math.abs(w[1] - DOME[1]) * 0.5 : -1, i]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
// The work lamps are L.lamps of the station
// layout, seen through this shot's own model camera (scenes/worklamps.js): cut-off floods aimed down, so each shows only
// as a hard-edged pool on the regolith (no air, no halo), with the mast's pole and tripod throwing shadows across it.
// In frame from this camera: the near mast's lamp (M4) and the first three bollards of the pad road (R1 to R3), which
// run off to the right behind that mast. M3 and R4 are drawn too, but lie at or beyond the frame's right edge and are
// not counted; the other masts' pools are behind mounds or left of frame. A separate circuit from the habitat: the
// mast lamp strikes when the habitat is half lit, then the road runs outward, each on an off-eighth between two
// windows. (The layout's HATCH_S lamp is window 16 above, the hatch lamp this shot already had.)   [lamp id, eighths after the cut, counted]
const LAMPS = [['M4', 9.5, 1], ['M3', 9.5, 0], ['R1', 11.5, 1], ['R2', 12.5, 1], ['R3', 13.5, 1], ['R4', 14.5, 0]];
const N_LIGHTS = WINDOWS.length + LAMPS.filter((l) => l[2]).length;
let B6_LAMPS = null, B6_POLES = null;
function habitatLights(ctx, M, lt, step) {
  const on = (j) => smooth(0, 0.07, lt - 0.05 - WIN_ORDER.indexOf(j) * step);
  if (!B6_LAMPS) { const V = lampView('7.B6'); B6_LAMPS = LAMPS.map((l) => V[l[0]]).filter(Boolean); B6_POLES = [V.M4.pole, V.M3.pole];
    for (const v of B6_LAMPS) if (v.kind === 'road') v.gain = 1.7; }   // 180 to 250 m off and seen at 4 degrees, a road pool is a sliver two or three pixels deep: drawn brighter so it survives
  const lampOn = (id) => smooth(0, 0.05, lt - 0.05 - LAMPS.find((l) => l[0] === id)[1] * step);
  // night: the mounds sink into the terrain shadow; only the sunlit upper panels keep their paper white
  ctx.pipe.layer((g) => {
    const gr = g.createLinearGradient(0, 0, 0, 1080);
    gr.addColorStop(0, 'rgb(235,235,240)'); gr.addColorStop(0.27, 'rgb(225,225,232)'); gr.addColorStop(0.42, 'rgb(70,70,80)'); gr.addColorStop(0.6, 'rgb(52,52,60)'); gr.addColorStop(1, 'rgb(40,40,46)');
    g.fillStyle = gr; g.fillRect(0, 0, 1920, 1080);
    // the dome, lit from inside: the night is lifted off the glass and it takes the lamps' amber (the ribs stay ink)
    if (on(0) > 0) { const [dx, dy] = M.at(DOME), rx = DOME[2] * M.s, ry = DOME[3] * M.s;
      g.save(); g.beginPath(); g.rect(dx - rx - 8, dy - ry - 8, 2 * rx + 16, ry + 8); g.clip(); g.filter = 'blur(2px)'; g.globalAlpha = on(0);
      g.fillStyle = 'rgb(255,214,150)'; g.beginPath(); g.ellipse(dx, dy, rx, ry, 0, 0, Math.PI * 2); g.fill(); g.restore(); }
    g.filter = 'blur(4px)'; g.fillStyle = 'rgb(28,28,32)';
    WINDOWS.forEach((w, j) => { if (!w[2]) return; const [x, y] = M.at(w); const r = w[2] * M.s * 0.75 + 3; g.globalAlpha = 1 - on(j); g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); });
    g.globalAlpha = 1; g.filter = 'none'; lampNight(g, M, B6_LAMPS, lampOn, { night: 'rgb(47,47,54)', occluders: B6_POLES });   // the night lifted off the ground where a lamp's light lands
  }, { mode: 'ink', seed: 801 });
  ctx.pipe.layer((g) => { lampLight(g, M, B6_LAMPS, lampOn, { occluders: B6_POLES }); }, { mode: 'screen', seed: 803 });           // the lit regolith
  ctx.pipe.layer((g) => {
    WINDOWS.forEach((w, j) => {
      const a = on(j); if (a <= 0) return;
      if (!w[2]) { const [x, y] = M.at(w), R = DOME[2] * M.s * 1.7, g0 = g.createRadialGradient(x, y, 0, x, y, R);   // the dome's glow on the roof and the mounds beside it
        g0.addColorStop(0, `rgba(255,176,96,${0.28 * a})`); g0.addColorStop(1, 'rgba(255,140,50,0)'); g.fillStyle = g0; g.beginPath(); g.arc(x, y, R, 0, Math.PI * 2); g.fill(); return; }
      const [x, y] = M.at(w), r = w[2] * M.s;
      const fl = 0.92 + 0.08 * Math.sin(lt * 23 + j * 1.7) * Math.exp(-(lt - WIN_ORDER.indexOf(j) * step) * 3);
      const R = r * 1.5 + 6, g1 = g.createRadialGradient(x, y, 0, x, y, R);
      g1.addColorStop(0, `rgba(255,170,90,${0.45 * a * fl})`); g1.addColorStop(1, 'rgba(255,140,50,0)');
      g.fillStyle = g1; g.beginPath(); g.arc(x, y, R, 0, Math.PI * 2); g.fill();
      g.fillStyle = `rgba(255,205,135,${0.9 * a * fl})`; g.beginPath(); g.ellipse(x, y, r * 0.42 * (w[3] ?? 1) + 1, r * 0.5 * (w[3] ?? 1) + 1, 0, 0, Math.PI * 2); g.fill();
    });
  }, { mode: 'screen', seed: 802 });
  return WINDOWS.reduce((n, w, j) => n + (on(j) > 0.5 ? 1 : 0), 0) + LAMPS.reduce((n, l) => n + (l[2] && lampOn(l[0]) > 0.5 ? 1 : 0), 0);
}

// a chat window typed live (mono on indigo): lines [{ who, text, t }] — each line types at ~22 chars/s
function chat(ctx, lines, t, x = 1290, y = 640, w = 560) {
  ctx.pipe.layer((g) => {
    g.fillStyle = 'rgba(8,10,22,0.82)'; g.fillRect(x - 30, y - 70, w, 300);
    g.strokeStyle = 'rgba(212,168,75,0.7)'; g.lineWidth = 1; g.strokeRect(x - 30, y - 70, w, 300);
    g.font = '13px PlexMono'; g.fillStyle = 'rgba(212,168,75,0.85)'; g.letterSpacing = '2px'; g.fillText('HOME  ·  FAMILY THREAD', x, y - 40);
    lines.forEach((l, i) => {
      if (t < l.t) return;
      const n = Math.floor((t - l.t) * 22);
      const s = [...l.text].slice(0, n).join('');
      const yy = y + i * 64;
      g.font = '16px PlexMonoMedium'; g.letterSpacing = '1px'; g.fillStyle = 'rgba(212,168,75,1)'; g.fillText(l.who, x, yy);
      g.font = '26px PlexMono, "Noto Color Emoji"'; g.fillStyle = 'rgba(240,232,214,1)'; g.fillText(s + (n < [...l.text].length && Math.floor(t * 4) % 2 ? '▍' : ''), x + 90, yy + 2);
    });
  }, { mode: 'over', seed: 71 });
}

// ---- impacts and the build's line work -------------------------------------------------------------------------
// a downbeat HIT: a bloom of light from the centre (post 'open'), a paper shake (bump ringing + deflection)
const hit = (lt, color = [1.0, 0.86, 0.55]) => ({ open: 0.4 + 0.6 * smooth(0, 0.22, lt), openColor: color,
  bump: 0.032 * Math.exp(-lt / 0.17) * Math.cos(lt * 40), deflect: [960 + 60 * Math.sin(lt * 53), 540 + 40 * Math.cos(lt * 47), 30 * Math.exp(-lt / 0.14), 820] });
// the gold line of a jiehua plan as light: the plan image (pinned with plate map M) keyed to its line (indigo ground →
// black by brightness/contrast), tinted gold, optionally blurred into a halo — composited as screen
function glowLines(ctx, key, M, alpha, blur = 0, feather = false) {
  const img = ctx.assets && ctx.assets[key]; if (!img || alpha <= 0.002) return;
  const [x0, y0] = M.at([0, 0]), [x1, y1] = M.at([1, 1]);
  ctx.pipe.layer((g) => {
    g.filter = `saturate(0) brightness(1.4) contrast(4)${blur ? ` blur(${blur}px)` : ''}`;
    g.drawImage(img, x0, y0, x1 - x0, y1 - y0);
    g.filter = 'none'; g.globalCompositeOperation = 'source-atop'; g.globalAlpha = 1; g.fillStyle = 'rgb(255,196,110)';
    g.globalCompositeOperation = 'multiply'; g.fillRect(x0, y0, x1 - x0, y1 - y0);
    if (feather) { // lose the sheet's edge: keep an inset, soft-edged rectangle
      const w = x1 - x0, h = y1 - y0, m = Math.max(2, 0.06 * Math.min(w, h));
      g.globalCompositeOperation = 'destination-in'; g.filter = `blur(${(m * 0.6).toFixed(1)}px)`; g.fillStyle = '#000'; g.fillRect(x0 + m, y0 + m, w - 2 * m, h - 2 * m); g.filter = 'none';
    }
  }, { mode: 'screen', opacity: alpha, seed: 990 });
}
// the first frames of a hit: a flash of warm light over everything
const flashLight = (ctx, lt, rgb = '255,236,200') => { const a = 0.5 * Math.exp(-lt / 0.06); if (a > 0.01) ctx.pipe.layer((g) => { g.fillStyle = `rgba(${rgb},${a.toFixed(3)})`; g.fillRect(0, 0, 1920, 1080); }, { mode: 'screen', seed: 991 }); };
// jiehua survey line work that grows on every cut of the speed-build: rings, ruled rays with ticks, dimension callouts
const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const DIMS = ['Ø 50 M', '1.0 KM', 'R 55 M', '2.5 M SHELL', '20 M', '4.5 × 11 M', '89.5° S', '25 M', 'GRID 10 M', '100 kWe'];   // layout.js numbers
function blueprint(ctx, lt, seed, cx = 960, cy = 600, k = 1, burst = 0) {
  const grow = burst ? 1 : smooth(0, 0.6, lt), a0 = hsh(seed) * Math.PI * 2;
  ctx.pipe.layer((g) => {
    g.lineCap = 'round'; g.strokeStyle = 'rgb(255,226,170)'; g.fillStyle = 'rgb(255,226,170)';
    // survey rings (in the plan's oblique: y squashed)
    [300, 470, 700, 980].forEach((R, i) => {
      const r = R * k, e = smooth(i * 0.08, 0.45 + i * 0.08, burst ? 9 : lt);
      if (e <= 0) return;
      g.globalAlpha = 0.42 - i * 0.07; g.lineWidth = i === 3 ? 0.8 : 1.1; g.setLineDash(i % 2 ? [10, 9] : []);
      g.beginPath(); g.ellipse(cx, cy, r, r * 0.46, 0, a0 + i, a0 + i + Math.PI * 2 * e); g.stroke();
    });
    g.setLineDash([]);
    // ruled rays with ticks
    for (let j = 0; j < 10; j++) {
      const th = a0 + j * Math.PI / 5 + hsh(seed * 7 + j) * 0.2, L = (420 + 600 * hsh(seed * 3 + j)) * k * grow;
      const dx = Math.cos(th), dy = Math.sin(th) * 0.46, r0 = 120 * k;
      g.globalAlpha = 0.34; g.lineWidth = 1;
      g.beginPath(); g.moveTo(cx + dx * r0, cy + dy * r0); g.lineTo(cx + dx * (r0 + L), cy + dy * (r0 + L)); g.stroke();
      for (let d = r0 + 40 * k; d < r0 + L; d += 40 * k) { const px = cx + dx * d, py = cy + dy * d; g.beginPath(); g.moveTo(px - dy * 5, py + dx * 5); g.lineTo(px + dy * 5, py - dx * 5); g.stroke(); }
      // the growing tip glints
      if (!burst && grow < 1) { g.globalAlpha = 0.9; g.beginPath(); g.arc(cx + dx * (r0 + L), cy + dy * (r0 + L), 2.4, 0, Math.PI * 2); g.fill(); }
    }
    // two dimension callouts
    g.font = '12px PlexMonoMedium'; g.letterSpacing = '2px';
    for (let j = 0; j < 2; j++) {
      const e = smooth(0.15 + j * 0.15, 0.55 + j * 0.15, burst ? 9 : lt); if (e <= 0) continue;
      const th = a0 + 0.7 + j * 2.6, R = (560 + j * 260) * k, x0 = cx + Math.cos(th) * R, y0 = cy + Math.sin(th) * R * 0.46, w = 180 * e;
      g.globalAlpha = 0.6; g.lineWidth = 1;
      g.beginPath(); g.moveTo(x0, y0); g.lineTo(x0 + w, y0); g.moveTo(x0, y0 - 7); g.lineTo(x0, y0 + 7); if (e > 0.98) { g.moveTo(x0 + w, y0 - 7); g.lineTo(x0 + w, y0 + 7); } g.stroke();
      if (e > 0.6) { g.globalAlpha = 0.75 * smooth(0.6, 1, e); g.fillText(DIMS[(seed * 3 + j) % DIMS.length], x0 + 6, y0 - 9); }
    }
    g.globalAlpha = 1;
  }, { mode: 'gold', seed: 700 + seed });
}

// 7.B5 — a loping 1/6-g stride drives the dust. The body is a video take redrawn in ink (K_7.B5/take_1p = take_1
// retimed, its hop put back on a ballistic arc: media/gen/K_7.B5/retime_ballistic.py). The boot plants at clip frame 4
// and the regolith leaves the toe AT THAT FRAME: each grain is integrated here under 1.62 m/s² (no drag, no cloud),
// lands and stops. Scale from the painting: hip to sole 0.95 m -> 648 design px per metre at zoom 1.
const B5 = { clip: 'K_7.B5/take_1p', key: 'K_7.B5', from: { x: 0.52, y: 0.56, zoom: 1.1 }, to: { x: 0.56, y: 0.585, zoom: 1.18 },
  contact: 4 / 24, toe: [0.499, 0.716], heel: [0.392, 0.716], pxm: 648, g: 1.62 };
function bootDust(ctx, lt, dur) {
  const s0 = lt - B5.contact; if (s0 < 0) return;
  const M = pmap(B5, lt, dur, 1920, 1080), k = M.s * B5.pxm, G = B5.g;        // k: screen px per metre
  ctx.pipe.layer((g) => {
    g.fillStyle = '#121214'; g.strokeStyle = '#121214';
    for (let i = 0; i < 300; i++) {
      const r = (n) => hsh(i * 13.7 + n * 3.1);
      const back = r(7) < 0.16;                                              // a few grains spit back from the heel
      const [ox, oy] = M.at(back ? B5.heel : B5.toe);
      // a wide flat fan thrown forward off the toe: elevation 10-62°, 0.5-1.7 m/s, and a little sideways (toward / away
      // from the camera), which the low camera sees as a small drift down / up the frame
      const el = (back ? 0.25 + 0.6 * r(1) : 0.17 + 0.91 * Math.pow(r(1), 1.3)), v = back ? 0.35 + 0.6 * r(2) : 0.5 + 1.2 * Math.pow(r(2), 0.7);
      const vx = Math.cos(el) * v * (back ? -1 : 1), vy = Math.sin(el) * v, vz = (r(5) - 0.5) * 0.9;
      const s = s0 - r(3) * 0.06; if (s < 0) continue;                       // all within 1.5 frames of contact
      const T = 2 * vy / G, ss = Math.min(s, T), landed = s >= T;            // flight time on level ground: 2·v·sinθ / g
      const X = (q) => ox + (r(6) - 0.5) * 0.06 * k + vx * q * k, Y = (q) => oy - (vy * q - 0.5 * G * q * q) * k + vz * q * 0.2 * k;
      const sz = (0.9 + Math.pow(r(4), 2.4) * 3.2) * M.s;
      g.globalAlpha = landed ? 0.7 : 0.95;
      g.beginPath(); g.ellipse(X(ss), Y(ss), sz, sz * (landed ? 0.5 : 0.9), 0, 0, Math.PI * 2); g.fill();
      if (i % 7 === 0) {                                                     // the arc already flown, hair-thin
        g.globalAlpha = 0.13 * (1 - smooth(T + 0.15, T + 0.8, s)); g.lineWidth = 0.8; g.beginPath();
        for (let n = 0; n <= 24; n++) { const q = ss * n / 24; n ? g.lineTo(X(q), Y(q)) : g.moveTo(X(q), Y(q)); }
        g.stroke();
      }
    }
    g.globalAlpha = 1;
  }, { mode: 'ink', absorb: 0.5, seed: 791 });
}

// 7.E2 opening — the cosmos pull-back (scenes/cosmos.js) magnifies a 400 m/px mosaic for its first ~2 s. Until the
// mosaic is sharp at the current scale, the frame stays on sharp line: the complete gold plan K_7.A at the station,
// and a jiehua graticule round the pole (latitude rings, Shackleton's rim) — then the Moon comes up under it.
// Scale/centre mirror scenes/cosmos.js (km per design px; south pole at 0,0).
const CSCALE = [[178.66, 0.0022], [179.84, 0.035], [181.33, 2.4], [182.12, 14], [182.81, 250]];
function cScale(t) {
  if (t <= CSCALE[0][0]) return CSCALE[0][1];
  for (let i = 1; i < CSCALE.length; i++) { const [t0, s0] = CSCALE[i - 1], [t1, s1] = CSCALE[i]; if (t <= t1) { const u = (t - t0) / (t1 - t0); const e = u * u * (3 - 2 * u) * 0.6 + u * 0.4; return Math.exp(Math.log(s0) + (Math.log(s1) - Math.log(s0)) * e); } }
  return CSCALE[CSCALE.length - 1][1];
}
const CSTATION = [-38.0, 26.0];
const cCenter = (t) => { const a = smooth(179.54, 181.53, t); return [CSTATION[0] * (1 - a), CSTATION[1] * (1 - a)]; };
function pullbackOpening(ctx, t) {
  const v = 1 - smooth(180.29, 180.98, t); if (v <= 0) return;
  const s = cScale(t), c = cCenter(t), at = ([x, y]) => [960 + (x - c[0]) / s, 540 + (y - c[1]) / s];
  ctx.pipe.layer((g) => { g.fillStyle = 'rgb(22,31,60)'; g.fillRect(0, 0, 1920, 1080); }, { mode: 'over', opacity: 0.96 * v, absorb: 0.35, seed: 980 });
  const [sx, sy] = at(CSTATION), w = 3.6 / s, img = ctx.assets && ctx.assets['K_7.A'];
  if (img && w > 4) {
    const h = w * img.height / img.width, M = { at: ([u, q]) => [sx + (u - 0.5) * w, sy + (q - 0.5) * h] };
    glowLines(ctx, 'K_7.A', M, v, 0, true);
    glowLines(ctx, 'K_7.A', M, 0.5 * v, 4, true);
  }
  // the graticule: range rings round the station, rings of latitude round the pole, and Shackleton's rim (Ø 21 km)
  const [px, py] = at([0, 0]);
  ctx.pipe.layer((g) => {
    g.strokeStyle = 'rgb(255,226,170)'; g.fillStyle = 'rgb(255,226,170)'; g.font = '12px PlexMonoMedium'; g.letterSpacing = '2px';
    [[0.25, '250 M'], [0.5, '500 M'], [1, '1 KM'], [2, '2 KM'], [5, '5 KM'], [10, '10 KM'], [20, '20 KM'], [40, '40 KM']].forEach(([km, lab], i) => {
      const r = km / s; if (r < 20 || r > 2600) return;
      const a = Math.min(1, (r - 20) / 50) * Math.min(1, (2600 - r) / 900);
      g.globalAlpha = 0.75 * a * v; g.lineWidth = 1.2; g.setLineDash(i % 2 ? [4, 6] : []);
      g.beginPath(); g.arc(sx, sy, r, 0, Math.PI * 2); g.stroke();
      g.globalAlpha = 0.8 * a * v; g.fillText(lab, sx + r * 0.71 + 6, sy - r * 0.71 - 4);
    });
    g.setLineDash([]); g.globalAlpha = 1;
  }, { mode: 'gold', seed: 983 });
  ctx.pipe.layer((g) => {
    g.strokeStyle = 'rgb(255,226,170)'; g.fillStyle = 'rgb(255,226,170)'; g.font = '12px PlexMonoMedium'; g.letterSpacing = '2px';
    [[0.5, '89.98° S'], [2, '89.93° S'], [5, '89.8° S'], [10.5, 'SHACKLETON'], [15, '89.5° S'], [30, '89° S'], [60, '88° S'], [150, '85° S'], [300, '80° S']].forEach(([km, lab], i) => {
      const r = km / s; if (r < 24 || r > 4000) return;
      const a = Math.min(1, (r - 24) / 60) * Math.min(1, (4000 - r) / 1500);
      g.globalAlpha = (lab === 'SHACKLETON' ? 0.75 : 0.4) * a * v; g.lineWidth = lab === 'SHACKLETON' ? 1.6 : 1;
      g.setLineDash(lab === 'SHACKLETON' ? [] : [6, 7]); g.beginPath(); g.arc(px, py, r, 0, Math.PI * 2); g.stroke();
      const lx = px + r * Math.cos(-0.5 - i * 0.37), ly = py + r * Math.sin(-0.5 - i * 0.37);
      if (lx > 40 && lx < 1800 && ly > 40 && ly < 1040) { g.globalAlpha = 0.8 * a * v; g.fillText(lab, lx + 8, ly - 6); }
    });
    g.setLineDash([]); g.globalAlpha = 0.7 * v; g.beginPath(); g.moveTo(px - 10, py); g.lineTo(px + 10, py); g.moveTo(px, py - 10); g.lineTo(px, py + 10); g.stroke();
    g.globalAlpha = 1;
  }, { mode: 'gold', seed: 982 });
}

const CAP = { size: 15, rgb: '212,168,75', a: 0.95 };
// a generated take redrawn on our paper (render/src/roto): the clip is only a motion base
const rot = (clip, o = {}) => ({ type: 'roto', clip, ...o });
const cap = (ctx, s, y = 72) => hud(ctx, s, 64, y, CAP, 1);
// a clip PLAYING inside a painted screen (7.C3b): its frames are pre-warped into the screen's quad, matted with the
// painted screen itself and packed into one atlas by tools/screen_atlas.py; meta = that tool's json. `M` = pmap(view, …)
// with the atlas's target size, so the picture stays pinned to the redrawn shot. glow: the screen's light on what is
// around it, breathing with the picture.
function screenClip(ctx, key, meta, M, lt, o = {}) {
  const img = ctx.assets && ctx.assets[key]; if (!img) return;
  const i = Math.min(meta.n - 1, Math.max(0, Math.floor(lt * meta.fps))), cw = img.width / meta.cols, ch = img.height / meta.rows;
  const [x0, y0] = M.at([meta.bbox[0], meta.bbox[1]]), [x1, y1] = M.at([meta.bbox[2], meta.bbox[3]]);
  ctx.pipe.layer((g) => { g.drawImage(img, (i % meta.cols) * cw, Math.floor(i / meta.cols) * ch, cw, ch, x0, y0, x1 - x0, y1 - y0); }, { mode: 'over', seed: o.seed ?? 760 });
  if (o.glow) {
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, R = (x1 - x0) * 1.15, k = o.glow * (0.82 + 0.18 * Math.sin(lt * 9.0 + 1.3) * Math.sin(lt * 3.1));
    ctx.pipe.layer((g) => { const gr = g.createRadialGradient(cx, cy, (x1 - x0) * 0.25, cx, cy, R);
      gr.addColorStop(0, `rgba(${o.rgb || '150,170,255'},${(0.5 * k).toFixed(3)})`); gr.addColorStop(1, `rgba(${o.rgb || '150,170,255'},0)`);
      g.fillStyle = gr; g.fillRect(cx - R, cy - R, 2 * R, 2 * R); }, { mode: 'screen', seed: (o.seed ?? 760) + 1 });
  }
}

export default function shots(B, X, L) {
  const bar = (n, b = 1) => B.bar(n, b);
  const has = (k) => X.has(k);
  const A = (k, o) => (has(k) ? kf(k, o) : null);
  const dayCounter = (ctx, t, a, b, d0, d1, label = 'DAY') => {
    const d = Math.round(d0 + (d1 - d0) * clamp((t - a) / (b - a)));
    hud(ctx, `${label} ${d < 0 ? '−' : ''}${String(Math.abs(d)).padStart(3, '0')}`, 64, 1030, { size: 22, rgb: '255,255,255' }, 1);
  };
  const kick = (lt) => bump(lt, 0.010);
  const plan = (k, from, to, o = {}) => (has(k) ? flat(k, from, to, o) : ph('Guanghan Station speed-build in gold jiehua', k));

  // ---- A · SPEED-BUILD: twelve 2-beat cuts. 7.A0 is the painted plan; the eleven that follow are drawn live from the
  //      station's layout (scenes/buildsite.js): in every cut one thing is being built, and the Sun goes round ----------
  const a = (n, b) => bar(n, b);
  const SA = [a(67), a(67, 3), a(68), a(68, 3), a(69), a(69, 3), a(70), a(70, 3), a(71), a(71, 3), a(72), a(72, 3), a(73)];
  const A0V = { from: { x: 0.5, y: 0.5, zoom: 1.16 }, to: { x: 0.5, y: 0.5, zoom: 1.02 } };
  // the HUD of the build: day counter (bottom-left) and the tonnage ticker (bottom-right). Each cut is a few days of
  // time-lapse, so the counter jumps on the cuts; the Sun in the picture stands where it would on the counter's day
  const TONS = [[-640, 0], [-400, 9000], [-20, 36500], [1, 36500], [30, 39500], [97, 48000]];   // tonnes moved by day
  const tonsAt = (d) => { for (let i = 1; i < TONS.length; i++) if (d <= TONS[i][0]) return TONS[i - 1][1] + (TONS[i][1] - TONS[i - 1][1]) * clamp((d - TONS[i - 1][0]) / (TONS[i][0] - TONS[i - 1][0])); return 48000; };
  const buildHud = (ctx, t, i, cut) => {
    const [d0, d1] = BUILD[cut].days, tons = Math.round(tonsAt(d0 + (d1 - d0) * clamp((t - SA[i]) / (SA[i + 1] - SA[i]))) / 10) * 10;
    dayCounter(ctx, t, SA[i], SA[i + 1], d0, d1);
    hud(ctx, `REGOLITH MOVED  ${String(tons).replace(/\B(?=(\d{3})+(?!\d))/g, ' ').padStart(6, ' ')} t`, 1856, 1030, { size: 15, rgb: '212,168,75', a: 0.95, align: 'right' }, 1);
  };
  // [id, cut of scenes/buildsite.js, caption, second line]
  const BUILD_CUTS = [
    ['7.A1', 'survey', 'SITE SURVEY  ·  RIDGE 89.5° S  ·  SUN 0–1.5°'],
    ['7.A1b', 'masts', 'SOLAR MASTS  ·  20 M  ·  TRACKING THE SUN AROUND THE HORIZON'],
    ['7.A2', 'vessels', 'PRESSURE VESSELS LANDED  ·  4 MODULES'],
    ['7.A2b', 'shell', 'REGOLITH PRINTER  ·  SHIELD SHELL 2.5 M  ·  ONE 0.6 M COURSE A DAY'],
    ['7.A2c', 'comms', 'COMMS TOWER  ·  25 M  ·  DISH ON EARTH'],
    ['7.A3', 'landing', 'CREW LANDER DOWN  ·  BARE REGOLITH, 2.0 KM EAST'],
    ['7.A3b', 'radiator', 'FISSION SURFACE POWER  ·  100 kWe  ·  PRE-CRITICAL', 'ADAEZE OKAFOR  ·  1.0 KM OUT  ·  RADIATOR, 12 PANELS'],
    ['7.A3c', 'cable', 'POWER ON THE GRID  ·  1.0 KM CABLE'],
    ['7.A4', 'cupola', 'CUPOLA  ·  SHUTTERS OPEN  ·  DAY 030'],
    ['7.A4b', 'pad', 'LANDING PAD  ·  ⌀ 50 M  ·  LASER-SINTERED REGOLITH'],
    ['7.A5', 'lights', 'INTERNATIONAL MOONBASE  ·  89.5° S  ·  LIGHTS ON'],
  ];
  const A_SHOTS = [
    // the drop downbeat: the whole station plan detonates into glowing gold line in one frame
    { id: '7.A0', grain: 70, post: (t, lt) => hit(lt),
      scene: [has('K_7.A') ? flat('K_7.A', A0V.from, A0V.to, { glow: 1.4 }) : ph('The station plan detonates into gold line', 'K_7.A')],
      type(ctx, t, lt) {
        const M = pmap(A0V, lt, SA[1] - SA[0]);
        flashLight(ctx, lt);
        glowLines(ctx, 'K_7.A', M, 1.0 * Math.exp(-lt / 0.35), 7);      // halo, dying away over the two beats
        glowLines(ctx, 'K_7.A', M, 0.85 * Math.exp(-lt / 0.22), 0);     // the lines themselves white-hot on the hit
        blueprint(ctx, lt, 1, 960, 600, 1.2, 1); hud(ctx, 'INTERNATIONAL MOONBASE  ·  89.5° S  ·  THE PLAN', 64, 72, CAP, 1); hud(ctx, 'CONSTRUCTION DAY −640  ·  ROBOTIC PRE-BUILD', 64, 1030, { size: 20, rgb: '255,255,255' }, 1); } },
    ...BUILD_CUTS.map(([id, cut, c1, c2], j) => ({ id, scene: [{ name: 'buildsite', params: { cut } }], post: cut === 'radiator' ? (t, lt) => bump(lt, 0.02) : undefined,
      type(ctx, t) { buildHud(ctx, t, j + 1, cut); cap(ctx, c1); if (c2) hud(ctx, c2, 64, 98, { size: 13, rgb: '240,232,214' }, 1); } })),
  ].map((s, i) => ({ paper: 'indigo', grain: 71 + i, ...s, post: s.post || ((t, lt) => kick(lt)), t0: SA[i], t1: SA[i + 1] }));

  // ---- B · THE WORK — one crew member per bar ------------------------------------------------------------------
  const T = { B1: bar(73), B2: bar(74), B3: bar(75), B4: bar(76), B5: bar(77), B6: 141.36, C2: bar(81), C3: bar(82) };
  const B4V = { from: { x: 0.5, y: 0.56, zoom: 1.0 }, to: { x: 0.5, y: 0.57, zoom: 1.06 } };
  // the two Mission Control beats in the calls (7.Cm1, 7.Cm2): a small push each, and the vignettes' caption plate
  const CM1V = { from: { x: 0.5, y: 0.52, zoom: 1.03 }, to: { x: 0.5, y: 0.5, zoom: 1.08 } }, CM2V = { from: { x: 0.5, y: 0.5, zoom: 1.02 }, to: { x: 0.51, y: 0.5, zoom: 1.07 } };
  const mccCap = (ctx, cap) => { ctx.pipe.layer((g) => { g.fillStyle = 'rgba(8,10,20,0.55)'; g.fillRect(48, 50, 30 + cap.length * 17.5, 34); }, { mode: 'over' }); hud(ctx, cap, 64, 72, { size: 15, rgb: '240,232,214', a: 0.95 }, 1); };
  const B6V = { from: { x: 0.56, y: 0.5, zoom: 1.45 }, to: { x: 0.565, y: 0.5, zoom: 1.6 } };
  const BEAT = (bar(81) - bar(80)) / 4;
  const B_SHOTS = [
    // 7.B1 — after NASA's PRIME-1 / TRIDENT drill: wide, then the auger close on beat 3. Each uses its INK roto take
    //        when picks.json has one prepped after the keyframe (X.pick), else the painted still with parallax.
    //        rev_7B (Oct 7): the drill is a free-standing braced frame, Yutu 3.5 m off on one slack cable; cut in with
    //        the motion under way (offset 0.5, lock 0). The HUD is a fresh reading from this hole, not the LCROSS figure.
    ...[['7.B1', T.B1, bar(73, 3), 'K_7.B1', { x: 0.5, y: 0.55, zoom: 1.03 }, { x: 0.53, y: 0.56, zoom: 1.1 }],
      ['7.B1b', bar(73, 3), T.B2, 'K_7.B1_close', { x: 0.5, y: 0.5, zoom: 1.04 }, { x: 0.52, y: 0.56, zoom: 1.14 }]].map(([id, a, b, k, from, to], i) => ({
      id, t0: a, t1: b, paper: 'xuan', grain: 75 + i * 100, flash: i === 0, post: i ? (t, lt) => kick(lt) : undefined, focus: [1010, 740],
      scene: [X.pick(k) ? rot(X.pick(k).clip, { paper: 'ink', offset: 0.5, lock: 0, from, to, style: { boldA: 0.25, gran: 0.08, wet: 0.2 } })
        : has(k) ? kf(k, { from, to, dolly: 0.06, glow: 0.5, masks: { base: [0.1, 0.6] } }) : ph('Arjun drills into a permanently shadowed crater', k)],
      type(ctx) { cap(ctx, 'ARJUN RAMAN  ·  PSR'); cap(ctx, 'BITE 07  ·  0.70 m', 98); cap(ctx, 'H₂O 3.1 wt%', 124); } })),   // stacked: clear of the mast, stays and ribbon
    // 7.B2 / 7.B3 (rev_7B): silk redraw with a gold line on the indigo paper (as 3.8), lock 0, cut in at >= 0.5 s.
    //        7.B3 (rev3_base, Oct 8): K_7.B3/take_16 at rate 1 from 0.5 s: she leans in and down as the gauntlet slides
    //        the scale card to beside the rosette cup, glove and body in the same beat; no breath fog. Lúcia's painted
    //        face is carried by the take's meta.keep (tools/roto_keep.py), her roundel by meta.patch.
    // 7.B2 (rev3_base, Oct 8): K_7.B2/take_9 is ONE slow counter-clockwise (opening) turn in slow motion, drawn on twos,
    //        so it plays at rate 1 from an even frame (22/24 s in, the turn under way). The gauge's needle is not in
    //        the painting or the take: scenes/gauge.js draws it, pinned to the dial by the same push (B2 view below):
    //        it trembles from the first frame and begins a slow rise 0.3 s after the seat opens at 0.2 s, lagging it.
    { id: '7.B2', t0: T.B2, t1: T.B3, paper: 'indigo', grain: 76, post: (t, lt) => kick(lt), focus: [500, 590],
      scene: X.pick('K_7.B2') ? ((V) => [rot('K_7.B2/take_9', { paper: 'silk', style: { ink: [0.80, 0.66, 0.38], lineA: 0.8 }, offset: 22 / 24, lock: 0, glow: 0.5, ...V }),
          { name: 'gauge', params: { ...V, hub: [0.17625, 0.46], r: 0.031, p0: 0.10, k: 0.2, open: 0.2, lag: 0.3, tau: 0.35, tremble: 4 } }])({ from: { x: 0.42, y: 0.52, zoom: 1.12 }, to: { x: 0.385, y: 0.525, zoom: 1.28 } })   // the pipe loop stays below the HUD lines
        : [has('K_7.B2') ? kf('K_7.B2', { from: { x: 0.48, y: 0.52, zoom: 1.03 }, to: { x: 0.44, y: 0.55, zoom: 1.1 }, dolly: 0.05, grade: 'native' }) : ph('Claire at the ISRU reactor; molten regolith glows', 'K_7.B2')],
      type(ctx) { cap(ctx, 'CLAIRE SHEN  ·  ISRU  ·  MOLTEN REGOLITH ELECTROLYSIS'); cap(ctx, '1,600 °C  ·  3.6 kA  ·  O₂ 1.0 kg/h', 98); } },   // two lines: clear of the anode lift
    { id: '7.B3', t0: T.B3, t1: T.B4, paper: 'indigo', grain: 77, post: (t, lt) => kick(lt), focus: [980, 760],
      scene: [X.pick('K_7.B3') ? rot('K_7.B3/take_16', { paper: 'silk', style: { ink: [0.80, 0.66, 0.38], lineA: 0.8 }, offset: 0.5, lock: 0, from: { x: 0.52, y: 0.55, zoom: 1.05 }, to: { x: 0.54, y: 0.58, zoom: 1.16 } })
        : has('K_7.B3') ? kf('K_7.B3', { from: { x: 0.52, y: 0.55, zoom: 1.05 }, to: { x: 0.54, y: 0.58, zoom: 1.16 }, dolly: 0.05, grade: 'native' }) : ph('Lúcia: a purple-tinged rosette in a sealed growth chamber', 'K_7.B3', { dark: true })],
      type(ctx) { cap(ctx, 'LÚCIA FERREIRA  ·  ARABIDOPSIS IN LUNAR REGOLITH'); cap(ctx, 'FIRST ROSETTE', 98); } },   // two lines: clear of her hair
    { id: '7.B4', t0: T.B4, t1: T.B5, paper: 'indigo', grain: 78, post: (t, lt) => kick(lt), focus: [900, 700],
      // rev Oct 7 (glitch sweep): K_7.B4/take_1 (h3) under the JS strips, so Kenji works the control and shifts his weight
      scene: [X.pick('K_7.B4') ? rot(X.pick('K_7.B4').clip, { paper: 'silk', offset: 0.6, lock: 0, style: { lineA: 0, snapAmt: 0, gran: 0 }, ...B4V })
        : has('K_7.B4') ? flat('K_7.B4', B4V.from, B4V.to) : ph('Kenji’s radio array unrolls across the floor of Shackleton', 'K_7.B4', { dark: true })],
      type(ctx, t, lt) {
        if (has('K_7.B4')) strips(ctx, pmap(B4V, lt, T.B5 - T.B4), lt);
        cap(ctx, 'KENJI MORI  ·  FILM-DIPOLE ARRAY  ·  4 × 100 M  ·  1–50 MHz');
        hud(ctx, 'NO SUN  ·  NO EARTH  ·  THE QUIETEST SKY IN REACH', 64, 98, { size: 13, rgb: '240,232,214' }, 1);
        spectrogram(ctx, 64, 118, 300, 44, t, smooth(1.0, 1.4, lt));
      } },
    { id: '7.B5', t0: T.B5, t1: T.B6, paper: 'xuan', grain: 79, focus: [1000, 760], post: (t, lt) => kick(lt),
      // offset 0: take_1p already starts mid-stride (its frame 0 is the take's frame 1) and the boot plants at frame 4
      scene: [has(B5.key) ? rot(B5.clip, { paper: 'ink', offset: 0, lock: 0, from: B5.from, to: B5.to }) : { name: 'dust', params: {} }],
      type(ctx, t, lt) {
        if (has(B5.key)) bootDust(ctx, lt, T.B6 - T.B5);
        // the data line sits in the black sky and arrives once her body has left that corner, as the fan is in the air
        hud(ctx, '1.62 m/s²  ·  NO AIR  ·  NO CLOUD', 64, 72, { size: 15, rgb: '240,232,214', a: 0.9 }, smooth(0.5, 0.8, lt)); } },
    { id: '7.B6', t0: T.B6, t1: T.C2, paper: 'xuan', grain: 80, flash: true, post: (t, lt) => bump(lt, 0.012), focus: [1050, 560],
      scene: [has('K_7.B6') ? flat('K_7.B6', B6V.from, B6V.to) : has('K_1.5') ? kf('K_1.5', { flicker: 1.6, from: { x: 0.5, y: 0.55, zoom: 1.1 }, to: { x: 0.5, y: 0.5, zoom: 1.2 } }) : ph('The habitat lights come on, window by window', 'K_7.B6')],
      type(ctx, t, lt) {
        const n = has('K_7.B6') ? habitatLights(ctx, pmap(B6V, lt, T.C2 - T.B6), lt, BEAT / 2) : N_LIGHTS;
        hud(ctx, `STATION  ·  LIGHTS ${String(n).padStart(2, '0')} / ${N_LIGHTS}`, 64, 72, { size: 15, rgb: '240,214,170', a: 0.95 }, 1);
      } },
  ];

  // ---- C · THE CALLS ------------------------------------------------------------------------------------------
  // 7.C4 / 7.C5 — ALONE, ALONE, TOGETHER, four times over bars 83–86 (Oct 7 revision). Each sharing scene follows the
  // singles of the two people in it: the faces are seen in the singles, so a sharing scene may give the picture instead.
  //   bar 83  Adaeze · Anastasia · [a  the twins' lost tooth]      bar 84  Arjun · Chen Yu · [b  the newborn]
  //   bar 85  Kenji · Lúcia · [c  Haruto and the old dog]          bar 86  Layla · [d  the falcon, with Claire] · Claire → 7.C1
  // Sharing scenes (K_7.C5a–d, staged in render/scenes/blockouts): two people shoulder to shoulder, ONE tablet in front
  // of both, both looking at it. a, c = their faces in its glow; b, d = over their shoulders onto the picture.
  // Every take is cut into with its motion under way (lock 0, offset ≥ 0.5): no dissolve out of a frozen keyframe.
  const CELL_TAKE = ['take_2', 'take_2', 'take_2', 'take_3', 'take_2', 'take_2', 'take_3', 'take_2']; // media/gen/picks.json
  const single = (i, a0, b0) => ({ id: `7.C4${'abcdefgh'[i]}`, t0: a0, t1: b0, paper: 'indigo', grain: 740 + i, focus: [1250, 520],
    // PUBLIC CUT: the eighth cell is Claire's (P_7.C4_c8: her bob, An and Minh with Bánh on the tablet)
    scene: [i === 7 ? recast(X, 'P_7.C4_c8', { offset: 1.2, from: { x: 0.5, y: 0.5, zoom: 1.0 }, to: { x: 0.5, y: 0.5, zoom: 1.1 } }, { grade: 'native' })
      : (has(`K_7.C4_${CELLS[i]}`) ? rot(`K_7.C4_${CELLS[i]}/${CELL_TAKE[i]}`, { paper: 'silk', offset: 1.2, lock: 0, from: { x: 0.5, y: 0.5, zoom: 1.0 }, to: { x: 0.5, y: 0.5, zoom: 1.1 } }) : null) || crewCell(X, i, 1.0, 1.1) || ph(CREW[i][0], 'K_7.C4_grid')],
    type(ctx) { hud(ctx, `${CREW[i][0]}  ·  HOME  ·  ${CREW[i][3]}`, 64, 72, { size: 15, rgb: '212,168,75', a: 0.95 }, 1); } });
  const SHARE = {
    a: { clip: 'K_7.C5a/take_1', offset: 0.5, cap: 'ADAEZE + ANASTASIA  ·  THE TWINS’ FIRST LOST TOOTH  ·  ENUGU', focus: [1080, 330], from: { x: 0.5, y: 0.47, zoom: 1.06 }, to: { x: 0.53, y: 0.44, zoom: 1.16 } },
    b: { clip: 'P_7.C5b/take_1' /* cut v7 (Jade: "modernize the homes on the tablet screens"): the same take with the Chennai apartment laid into the tablet's screen (work/rev7/SCREENS); 7.C5d's screen likewise */, offset: 1.5, cap: 'ARJUN + CHEN YU  ·  A DAUGHTER, BORN ON DAY 200  ·  CHENNAI', focus: [990, 520], from: { x: 0.52, y: 0.5, zoom: 1.08 }, to: { x: 0.52, y: 0.5, zoom: 1.2 } },
    c: { clip: 'K_7.C5c/take_3', offset: 0.5, cap: 'KENJI + LÚCIA  ·  HARUTO AND DAIZU  ·  KAMAKURA', focus: [700, 430], from: { x: 0.47, y: 0.5, zoom: 1.06 }, to: { x: 0.44, y: 0.47, zoom: 1.16 } },
    d: { clip: 'K_7.C5d/take_1', offset: 0.5, cap: 'LAYLA + CLAIRE  ·  HER FATHER’S FALCON  ·  AL AIN', focus: [940, 560], from: { x: 0.5, y: 0.52, zoom: 1.1 }, to: { x: 0.5, y: 0.52, zoom: 1.22 } },
  };
  const share = (k, a0, b0) => { const S = SHARE[k], key = `K_7.C5${k}`;
    return { id: `7.C5${k}`, t0: a0, t1: b0, paper: 'indigo', grain: 750 + 'abcd'.indexOf(k), post: (t, lt) => kick(lt), focus: S.focus,
      scene: [k === 'd' ? recast(X, 'P_7.C5d', { offset: S.offset, from: S.from, to: S.to }, { grade: 'native' })   // PUBLIC CUT: Claire's bob, no glasses
        : has(key) ? rot(S.clip, { paper: 'silk', offset: S.offset, lock: 0, from: S.from, to: S.to }) : ph('Two crew share a home clip on a tablet', key, { dark: true })],
      type(ctx) { hud(ctx, S.cap, 64, 72, { size: 15, rgb: '212,168,75', a: 0.95 }, 1); } }; };
  const grid = [
    single(2, bar(83), bar(83, 2)), single(1, bar(83, 2), bar(83, 3)), share('a', bar(83, 3), bar(84)),
    single(3, bar(84), bar(84, 2)), single(0, bar(84, 2), bar(84, 3)), share('b', bar(84, 3), bar(85)),
    single(5, bar(85), bar(85, 2)), single(4, bar(85, 2), bar(85, 3)), share('c', bar(85, 3), bar(86)),
    single(6, bar(86), bar(86, 2)), share('d', bar(86, 2), bar(86, 4)), single(7, bar(86, 4), 156.28),
  ];
  const pairs = [];   // (the sharing scenes now sit inside `grid`, in running order)
  const GROUP = has('K_7.C4') ? 'K_7.C4' : 'K_7.C4_v3';
  // 7.C1 — the call home (bass out 158.5): Earth SILK | Moon GOLD, the words crossing the seam at the speed of light
  const C1 = 156.28, C6 = bar(88);
  const callShot = { id: '7.C1', t0: C1, t1: C6, paper: 'silk', grain: 81,
    // PUBLIC CUT: the kitchen table on Clear Lake (An and Minh at the laptop, Bánh asleep on Minh, Daniel counting the
    // delay on his fingers: P_7.C1_earth) | Claire at the wardroom table from behind, the children on her tablet (P_7.C1_moon)
    scene: [recast(X, 'P_7.C1_earth', { rect: [0, 0, 960, 1080], offset: 0.25 /* Daniel's count goes from two fingers to three 0.4 s in */, subject: false, maskGain: 8, style: { snapAmt: 0.12, lineTh: 0.64, lineA: 0.4 }, from: { x: 0.47, y: 0.42, zoom: 1.08 }, to: { x: 0.48, y: 0.42, zoom: 1.14 } }),
      recast(X, 'P_7.C1_moon', { rect: [960, 0, 960, 1080], fill: [0.09, 0.13, 0.245], offset: 1.5, subject: false, maskGain: 8, style: { snapAmt: 0.12, lineTh: 0.64, lineA: 0.4 }, from: { x: 0.46, y: 0.5, zoom: 1.12 }, to: { x: 0.47, y: 0.52, zoom: 1.2 } }, { grade: 'native' }),
      { name: 'seam', params: {} }],
    type(ctx, t, lt) {
      // one way 1.28 s: the packet leaves the laptop, crosses the seam, reaches Claire's screen
      const u = clamp((lt - 0.08) / 1.28), x0 = 700, y0 = 640, x1 = 1760, y1 = 745;   // PUBLIC CUT: from the laptop's screen edge to Claire's tablet
      const x = x0 + (x1 - x0) * u, y = y0 + (y1 - y0) * u - Math.sin(u * Math.PI) * 90;
      const fade = u < 1 ? 1 : Math.max(0, 1 - (lt - 1.36) * 2.5);
      if (lt > 0.08) ctx.pipe.layer((g) => {
        // the words travel as a gold trajectory line (the film's Earth→Moon line, 1.1), head first
        g.lineCap = 'round'; g.strokeStyle = `rgba(214,170,80,${0.9 * fade})`; g.lineWidth = 2.4; g.beginPath();
        for (let k = 0; k <= 40; k++) { const uu = u * k / 40; const xx = x0 + (x1 - x0) * uu, yy = y0 + (y1 - y0) * uu - Math.sin(uu * Math.PI) * 90; k ? g.lineTo(xx, yy) : g.moveTo(xx, yy); }
        g.stroke();
        if (u < 1) { g.filter = 'blur(3px)'; g.fillStyle = 'rgba(255,214,140,0.95)'; g.beginPath(); g.arc(x, y, 9, 0, Math.PI * 2); g.fill();
          g.filter = 'none'; g.fillStyle = 'rgba(255,248,230,1)'; g.beginPath(); g.arc(x, y, 3.5, 0, Math.PI * 2); g.fill(); }
        else { const r = 10 + (lt - 1.36) * 120; g.strokeStyle = `rgba(255,214,140,${0.9 * fade})`; g.lineWidth = 2; g.beginPath(); g.arc(x1, y1, r, 0, Math.PI * 2); g.stroke(); }
      }, { mode: 'over', seed: 811 });
      const rt = clamp(lt / 3.1);
      hud(ctx, `HOUSTON → INTERNATIONAL MOONBASE  ${Math.min(1.28, Math.max(0, lt - 0.08)).toFixed(2)} s`, 64, 72, { size: 15, rgb: '120,40,30', a: 0.9 }, 1, 'ink');
      hud(ctx, `RTT 3.1 s (light 2.6)  ·  ${'▮'.repeat(Math.floor(rt * 12)).padEnd(12, '·')}`, 1024, 72, { size: 15, rgb: '212,168,75', a: 0.95 }, 1);
    } };
  // 7.C3b view and the screen atlas's meta (media/keyframes/SCR_rare_earth.json, written by tools/screen_atlas.py)
  const C3B = { from: { x: 0.47, y: 0.5, zoom: 1.12 }, to: { x: 0.45, y: 0.49, zoom: 1.3 } };
  const RE_SCR = { bbox: [0.28008, 0.27937, 0.58359, 0.68374], cols: 6, rows: 4, n: 22, fps: 24, target: [2560, 1464] };
  // 7.C2 view (the push stops short of the TV: the whole screen stays in frame) and the game-screen atlas's meta
  // (media/keyframes/SCR_ddr_c2.json, written by tools/ddr_screen.py; k0 = the film frame of atlas frame 0)
  const C2V = { from: { x: 0.5, y: 0.5, zoom: 1.02 }, to: { x: 0.53, y: 0.5, zoom: 1.06 } };
  const DDR_SCR = { bbox: [0.05508, 0.1125, 0.26133, 0.39375], cols: 7, rows: 7, n: 43, fps: 24, k0: 3493, target: [2560, 1440] };
  const C_SHOTS = [
    // 7.C2 — PUBLIC CUT: THE OTHER SIDE OF THE CALLS. Before the crew watch their families, four homes miss them back,
    //        two beats each, nobody aware of a camera: Star City (Misha at the kitchen window, stuck on one chord),
    //        Kamakura (Daizu waits at the gate; Haruto has set out two cups), Enugu (pencil marks on a door frame, the
    //        twins' new ones above the day she left), Chennai (Meera lifts Nila to the window).
    ...[['a', 'STAR CITY  ·  MISHA  ·  ONE CHORD, AGAIN', [1000, 520]], ['b', 'KAMAKURA  ·  DAIZU AT THE GATE  ·  TWO CUPS', [960, 560]],
      ['c', 'ENUGU  ·  THE DAY SHE LEFT  ·  TWO NEW MARKS', [960, 480]], ['d', 'CHENNAI  ·  NILA  ·  DAY 212', [1000, 460]]].map(([k, cap, focus], i) => ({
      id: `7.C2${k}`, t0: bar(81 + (i >> 1), i % 2 ? 3 : 1), t1: i % 2 ? bar(82 + (i >> 1)) : bar(81 + (i >> 1), 3), paper: 'silk', grain: 82 + i * 0.1, focus,
      ...(i === 0 ? { flash: true } : { post: (t, lt) => kick(lt) }),
      scene: [recast(X, `P_7.C2${k}`, { offset: { a: 0.08, b: 0.12, c: 0.96, d: 0.08 }[k] /* cut v4: each vignette is a take now (Jade: "all the living things were animated"); the window its painter picked. Cut v6: the same moments in contemporary homes (Jade: "modernize the home environments of the crew members"), new takes */, subject: false, maskGain: 8, style: { snapAmt: 0.12, lineTh: 0.64, lineA: 0.4 }, from: { x: 0.5, y: 0.5, zoom: 1.04 }, to: { x: 0.51, y: 0.49, zoom: 1.11 } })],
      type(ctx) { ctx.pipe.layer((g) => { g.fillStyle = 'rgba(8,10,20,0.55)'; g.fillRect(48, 50, 30 + cap.length * 17.5, 34); }, { mode: 'over' }); hud(ctx, cap, 64, 72, { size: 15, rgb: '240,232,214', a: 0.95 }, 1); } })),
    ...grid,
    ...pairs,
    callShot,
    // 7.Cm1, 7.Cm2 — PUBLIC CUT (Jade's choice on the decision page, Oct 9): the two Mission Control beats take the two
    //        bars that were Claire alone at the window (7.C6, P_7.C6: no longer in the cut; its DAY 329 and the chat with
    //        the children go with it). 3 a.m. in Houston: Mikko's tablet shows the low sun on the ice at Oulu, Leah's the
    //        parol going up in Iloilo (P_7.Cm1). Then Chand Raat on a flight controller's screen; the empty right half
    //        of the painting holds the reply, the Earth as Claire sees it that night (P_7.Cm2 + scenes/earthview.js:
    //        nearly full when the Moon is a new crescent at home, south-up, Africa and Europe facing at dusk in South Asia).
    { id: '7.Cm1', t0: C6, t1: bar(88, 3), paper: 'indigo', grain: 84, focus: [900, 560], post: (t, lt) => kick(lt),
      scene: [recast(X, 'P_7.Cm1', { offset: 1.0 /* cut v4: a take; his wave, her laugh, the sled moving on his screen */, subject: false, maskGain: 8, ...CM1V }, { grade: 'native' })],
      type(ctx) { mccCap(ctx, 'HOUSTON  ·  3 A.M.  ·  OULU, ILOILO'); } },
    { id: '7.Cm2', t0: bar(88, 3), t1: bar(89), paper: 'indigo', grain: 84.1, focus: [1100, 500], needs: [...EARTH_KEYS], post: (t, lt) => kick(lt),
      scene: [recast(X, 'P_7.Cm2', { offset: 0.25 /* cut v4: a take; he laughs and waves back, the family on his screen waves */, subject: false, maskGain: 8, ...CM2V }, { grade: 'native' })],
      type(ctx, t, lt) { if (has('P_7.Cm2')) { const M = rview(CM2V, lt, bar(89) - bar(88, 3)), [x, y] = M.at([0.76, 0.47]); earthView(ctx, { x, y, r: 0.062 * M.k, subLat: 13.2, subLon: 15, north: 134.2, phase: 9, sunPA: 318.8 }); }
        mccCap(ctx, 'HOUSTON  ·  CHAND RAAT'); } },
  ];

  // ---- D · TWO CHANG'ES (vocalise 163.5–169.8) — five framings, each distinct ----------------------------------------
  const D = { D1: bar(89), D2: bar(90), D3: 162.25, D3b: bar(92), D3c: bar(93), D3d: bar(94), D4: 170.62, E1: bar(97) };
  // the indigo of the J_7.D2 painting itself: gold redraws of that take lay their ground in it, so redrawn skin and sleeve
  // sit on the same paper as the painted keyframe (no darker patches on the astronaut's cheek). The views of the 7.D3/7.D4 takes
  // keep the top 4% of the take out of frame: Seedance 2.0 grows the canvas there and the registered key has a seam.
  // PUBLIC CUT: P_7.D2 (Claire at the wall screen) is drawn in the take's own tones on our paper; the gold redraw turned its lit screen to a flat wash
  const D_SHOTS = [
    // 1 · the stage, wide: An rises on her wires toward the paper moon
    { id: '7.D1', t0: D.D1, t1: D.D2, paper: 'silk', grain: 91, post: (t, lt) => hit(lt, [1.0, 0.95, 0.85]), type(ctx, t, lt) { flashLight(ctx, lt, '255,246,225'); },
      scene: [recast(X, 'P_7.D1', { offset: 2.8, style: { lineA: 0.3 }, from: { x: 0.5, y: 0.53, zoom: 1.1 }, to: { x: 0.52, y: 0.5, zoom: 1.16 } })] },
    // 2 · Claire and the livestream: one fingertip to An's little hand, with an anatomically coherent arm. The
    //     keyframe J_7.D2 is the TOUCH pose, its right arm painted from a 3D blockout (scenes/blockouts/7.D2); take_5
    //     starts there, rests, then she draws the hand back. All three shots play it BACKWARDS (rate -1) so the finger
    //     travels in and lands on the painted pose: 7.D2 = take 5.0 -> 4.03 s (the hand coming up), 7.D3 = 4.03 -> 1.46
    //     (contact at about 2.4, 1.6 s into the shot), 7.D3c = 0.15 -> 1.91 forwards (the fingertip resting, breath).
    //     Her head is the painting itself, carried on the take (tools/roto_keep.py), never the model's redraw.
    { id: '7.D2', t0: D.D2, t1: D.D3, paper: 'indigo', grain: 92,
      scene: [recast(X, 'P_7.D2', { style: { snapAmt: 0, shade: 0, gran: 0, lineA: 0 }, rate: -1, offset: 5.62 /* P_7.D2/take_1 backwards: her hand comes up from her chest; contact 1.6 s into 7.D3 */, glow: 0.35, from: { x: 0.55, y: 0.45, zoom: 1.14 }, to: { x: 0.545, y: 0.44, zoom: 1.19 } }, { grade: 'native' })],
      type(ctx) { hud(ctx, 'LIVE', 64, 72, { size: 16, rgb: '232,72,52', a: 0.95 }, 1); hud(ctx, '−7 s', 64, 98, { size: 16, rgb: '232,72,52', a: 0.95 }, 1); } },   // two short lines: one line ran into the screen's corner (TYPE, Oct 8)
    // 3 · the held C#5: match cut, same reach, two moons — SILK left | GOLD right. Both halves move: An drifts
    //     on her wires, ribbons rippling, hand closing on the moon; Claire's hand comes up to the glass and her head follows
    { id: '7.D3', t0: D.D3, t1: D.D3b, paper: 'silk', grain: 93,
      scene: [recast(X, 'P_7.D1', { rect: [0, 0, 960, 1080], offset: 3.9 /* ends at 6.4 s, her hand closest to the Moon at the cut */, style: { lineA: 0.3 }, from: { x: 0.5, y: 0.5, zoom: 1.1 }, to: { x: 0.53, y: 0.47, zoom: 1.2 } }),
        recast(X, 'P_7.D2', { style: { snapAmt: 0, shade: 0, gran: 0, lineA: 0 }, rect: [960, 0, 960, 1080], fill: [0.09, 0.13, 0.245], rate: -1, offset: 4.65, glow: 0.35, from: { x: 0.622, y: 0.5, zoom: 1.0 }, to: { x: 0.618, y: 0.5, zoom: 1.0 } }, { grade: 'native' }),
        { name: 'seam', params: {} }] },
    // 4 · close: An's hand stretches the last few centimetres to the paper moon (its own close take, K_7.D3b = the
    //     7.D3b framing of K_7.D1, so the pose matches the split at the cut)
    { id: '7.D3b', t0: D.D3b, t1: D.D3c, paper: 'silk', grain: 94,
      scene: [recast(X, 'P_7.D3b', { offset: 0.1 /* the reach and the touch: 0.1–1.85 s */, from: { x: 0.5, y: 0.54, zoom: 1.08 }, to: { x: 0.56, y: 0.5, zoom: 1.2 } })] },
    // 5 · close: Claire's fingertip rests on the little gold Chang'e's hand (the take's first seconds, forwards)
    { id: '7.D3c', t0: D.D3c, t1: D.D3d, paper: 'indigo', grain: 95,
      scene: [recast(X, 'P_7.D2', { style: { snapAmt: 0, shade: 0, gran: 0, lineA: 0 }, offset: 0.15, glow: 0.45, from: { x: 0.42, y: 0.34, zoom: 1.85 }, to: { x: 0.415, y: 0.325, zoom: 2.0 } }, { grade: 'native' })],
      type(ctx) { hud(ctx, 'LIVE', 64, 72, { size: 16, rgb: '232,72,52', a: 0.95 }, 1); hud(ctx, '−7 s', 64, 98, { size: 16, rgb: '232,72,52', a: 0.95 }, 1); } },   // two short lines: one line ran into the screen's corner (TYPE, Oct 8)
    // 6 · Claire shares An's flight with her crewmates; one focal point per
    //     shot: a hand settling on her shoulder with the real 7.D1 picture beyond (Claire from behind, a blunt bob at
    //     the collar), then Arjun's face in the screen's light, Chen Yu beyond him. Staged in scenes/blockouts (K_7.D3d).
    { id: '7.D3d', t0: D.D3d, t1: bar(94, 3), paper: 'indigo', grain: 96, focus: [900, 620],
      scene: [recast(X, 'P_7.D3d', { offset: 0.6, from: { x: 0.48, y: 0.53, zoom: 1.04 }, to: { x: 0.47, y: 0.55, zoom: 1.14 } }, { grade: 'native' })],
      type(ctx) { hud(ctx, 'LIVE', 64, 72, { size: 16, rgb: '232,72,52', a: 0.95 }, 1); hud(ctx, '−7 s', 64, 98, { size: 16, rgb: '232,72,52', a: 0.95 }, 1); } },   // two short lines: one line ran into the screen's corner (TYPE, Oct 8)
    { id: '7.D3e', t0: bar(94, 3), t1: D.D4, paper: 'indigo', grain: 96.5, focus: [760, 420],
      scene: [has('K_7.D3e') ? rot('K_7.D3e/take_2', { paper: 'silk', offset: 2.6, lock: 0, from: { x: 0.47, y: 0.47, zoom: 1.06 }, to: { x: 0.45, y: 0.45, zoom: 1.16 } }) : ph('Arjun’s face in the light of the screen', 'K_7.D3e', { dark: true })] },
    // bass out: An bows; the theatre claps. A real bow: we cut in with her already bending, she dips, comes up
    // beaming; hands clap and phones bob throughout; the stage light breathes
    // (take_4c = take_4 prepped against K_7.D4 with her head painted out, so the backdrop she uncovers is the painting)
    { id: '7.D4', t0: D.D4, t1: D.E1, paper: 'silk', grain: 97,
      scene: [recast(X, 'P_7.D4', { offset: 0.5, style: { lineA: 0.3 }, from: { x: 0.5, y: 0.53, zoom: 1.14 }, to: { x: 0.5, y: 0.5, zoom: 1.08 } })],
      type(ctx, t, lt) {
        const a = 0.06 + 0.045 * Math.sin(lt * 2.6 + 0.6);
        ctx.pipe.layer((g) => { const gr = g.createRadialGradient(960, 470, 40, 960, 470, 640); gr.addColorStop(0, `rgba(255,228,176,${a.toFixed(3)})`); gr.addColorStop(1, 'rgba(255,228,176,0)'); g.fillStyle = gr; g.fillRect(0, 0, 1920, 1080); }, { mode: 'screen', seed: 974 });
      } },
  ];

  // ---- E · THE TOAST (rev Oct 7) — one moment in the observation dome from three angles, ONE subject each: the Earth
  //      (wide: the crew are dark shapes, cups coming up) · Adaeze in profile, her arm one line to her cup (rev3: side-on, flat) · two
  //      cups and the Earth (Claire's celadon bowl, Lúcia's cup). Staging: render/scenes/blockouts/7.E1 (one arrangement,
  //      three cameras). No keyframe carries a painted Earth: scenes/earthview.js draws the toast's real sky over the
  //      clean black of the paintings (JPL Horizons, 2038-Aug-30 08:00 UT: 99.9% lit, 4.9° up, south-up). Nothing passes
  //      in front of it: in the wide it hangs above every head; in the close the cups stop either side of it.
  // two-cup close (7.E1c) is gone. The toast is the group, Adaeze, and the group again, one bar each: the second group
  // view is the same take further on (a cutaway hides the 0.7 s it skips) with the push carried on toward the Earth.
  const SE = [bar(97), bar(98), bar(99), bar(100)];
  const TOAST_SKY = { subLat: 13.2, subLon: 60.5, north: 134.2, phase: 4.2, sunPA: 318.8 };
  const EARTH_K = 1.3;   // drawn 1.3× its true 2.05° in every toast view (one size logic: same lens → same size)
  // keyframe uv → design px under a roto layer's push (the view maths of roto/index.js: cover fit, eased from → to)
  const rview = (v, lt, dur) => { const u = ease(lt / dur), a = v.from, b = v.to, z = a.zoom + (b.zoom - a.zoom) * u, h = 0.5 / z;
    const cx = clamp(a.x + (b.x - a.x) * u, h, 1 - h), cy = clamp(a.y + (b.y - a.y) * u, h, 1 - h);
    return { at: ([x, y]) => [((x - cx) * z + 0.5) * 1920, ((y - cy) * z + 0.5) * 1080], k: z * 1920 }; };
  // [id, keyframe, take, clip offset, push, Earth in keyframe uv [x, y, radius / width] from the blockout camera or null]
  const TOAST = [
    // Cut v6 (Jade: "group shot should have 8 people and include the Indian guy"): the picture is painted wider (7.E1/v6_3:
    // the v5 group at 80 %, Kenji whole at the left, Arjun in three-quarter profile), so the push stays wide enough to keep all
    // eight in frame (they span x 0.124-0.889), and the Earth's place and size follow the 80 %.
    ['7.E1', 'P_7.E1', null, 0.6 /* cut v3: one clock through both group views */, { from: { x: 0.5, y: 0.5, zoom: 1.02 }, to: { x: 0.503, y: 0.51, zoom: 1.11 } }, [0.5811, 0.3753, 0.01104]],   // rev3: every arm is in frame (was 1.42 → 1.56)
    ['7.E1b', 'K_7.E1b', 'K_7.E1b/take_9', 1.1, { from: { x: 0.5, y: 0.5, zoom: 1.02 }, to: { x: 0.52, y: 0.5, zoom: 1.07 }, subject: false }, null],   // rev3: Adaeze in profile, flat; 1.1 s = the end of her one blink, then her eyes are on the Earth
    ['7.E1d', 'P_7.E1', null, 0.6 + 3.47, { from: { x: 0.503, y: 0.51, zoom: 1.11 }, to: { x: 0.5065, y: 0.52, zoom: 1.22 } }, [0.5811, 0.3753, 0.01104]],   // rev5: back to the group, cups still up (the take runs 5.17 s: 3.3 s + one bar ends at 5.04 s)
  ];
  const E_SHOTS = TOAST.map(([id, key, clip, offset, V, E], i) => ({
    id, t0: SE[i], t1: SE[i + 1], paper: 'indigo', grain: 97 + i * 0.1, needs: [...EARTH_KEYS],
    post: i ? (t, lt) => kick(lt) : (t, lt) => hit(lt, [0.85, 0.92, 1.0]),
    ...(i === 1 ? { focus: [1230, 450], vignette: 0.42 } : {}),
    // PUBLIC CUT: the group views play the P_7.E1 take (the family cut's plate with Claire's bob)
    scene: [key.startsWith('P_') ? recast(X, key, { offset, subject: false, maskGain: 8, style: { lineA: 0, snapAmt: 0, gran: 0 }, ...V }, { grade: 'native' })
      : (has(key) ? rot(clip, { paper: 'silk', offset, lock: 0, style: { lineA: 0, snapAmt: 0, gran: 0 }, ...V }) : null) || ph('The observation dome: the crew raise cups to Earth', key, { dark: true })],
    type(ctx, t, lt) {
      if (i === 0) flashLight(ctx, lt, '225,236,255');
      if (E && has(key)) { const M = rview(V, lt, SE[i + 1] - SE[i]), [x, y] = M.at(E); earthView(ctx, { x, y, r: E[2] * EARTH_K * M.k, ...TOAST_SKY }); }
      // earthlight: a soft blue-white wash from the window side, breathing a little
      if (i === 1) { const a = 0.085 + 0.02 * Math.sin(lt * 3.1);
        ctx.pipe.layer((g) => { const gr = g.createRadialGradient(380, 150, 60, 380, 150, 1250); gr.addColorStop(0, `rgba(170,205,255,${a.toFixed(3)})`); gr.addColorStop(1, 'rgba(170,205,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 1920, 1080); }, { mode: 'screen', seed: 975 }); }
    } }));

  return [
    ...A_SHOTS, ...B_SHOTS, ...C_SHOTS, ...D_SHOTS, ...E_SHOTS,
    // 7.E2–E3 — one continuous pull-back (scenes/cosmos.js): station → ridge → pole → the Moon → Earth & Moon to scale
    //            → the pale blue dot in a sunbeam; hard cut at 189.86
    { id: '7.E2', t0: bar(100), t1: bar(103), paper: 'indigo', grain: 98, needs: ['pole', 'K_7.A1', 'K_7.A', 'K04earth'], scene: [{ name: 'cosmos', params: {} }],
      type(ctx, t) { pullbackOpening(ctx, t); } },
    { id: '7.E3', t0: bar(103), t1: bar(105), paper: 'indigo', grain: 98, needs: ['pole', 'K04earth'], scene: [{ name: 'cosmos', params: {} }] },
  ];
}
