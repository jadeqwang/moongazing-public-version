// SECTION 2 · VERSE 1 — 32.42–46.82 (guzheng + voice, no drums). "Inscription" mode: the English lyric is set small
// in the painting's 留白, word by word on the sung onsets; a short Chinese inscription stands vertical, top-right,
// with the 望月 seal — the way a painter titles a leaf.
import { lyricEN, calli, kf, ph, recast, INK, INKC, PALE, PALEC, smooth } from './_lib.js';
import { plateMap } from '../scenes/plate.js';
import { teaWindow, TEA_WINDOW_KEYS } from '../scenes/teawindow.js';

// 2.4 → 2.5: the teahouse soaks up through the white silk of the costume (multiply through a wet, lobed blot that
// spreads from the centre), so the cut lands on the scene already there. Runtime only (canvas), deterministic in t.
function silkBleed(ctx, key, P, t, a, b, cx = 960, cy = 540) {
  const img = ctx.assets[key];
  if (t <= a || !img) return;
  const p = Math.min(1, (t - a) / (b - a)), m = plateMap(P, 0, 1, img);
  ctx.pipe.layer((g) => {
    g.save();
    g.filter = 'blur(9px)'; g.fillStyle = '#000';
    const R = 30 + 1500 * p ** 1.5;
    g.beginPath(); g.arc(cx, cy, R * 0.55, 0, Math.PI * 2); g.fill();
    for (let i = 0; i < 48; i++) {
      const h1 = Math.sin(i * 12.9898) * 43758.5453 % 1, h2 = Math.sin(i * 78.233) * 12543.123 % 1;
      const an = i * 2.39996, d = R * (0.35 + 0.3 * Math.abs(h1)), r = R * (0.12 + 0.2 * Math.abs(h2)) * (0.6 + 0.4 * p);
      g.beginPath(); g.arc(cx + Math.cos(an) * d, cy + Math.sin(an) * d * 0.8, r, 0, Math.PI * 2); g.fill();
    }
    g.filter = 'none'; g.globalCompositeOperation = 'source-in';
    g.drawImage(img, m.b[0], m.b[1], m.a[0], m.a[1]);
    g.restore();
  }, { mode: 'ink', absorb: 0.4, seed: 244 });
}

export const range = [32.23, 46.16];

// small vertical inscription + seal, brushed in from a
function inscription(ctx, key, text, x, y, t, a, b, o = {}) {
  calli(ctx, key, { text, size: o.size || 46, x, y, color: o.color || INKC, seed: 50 + text.length, alpha: 0.88 }, t, a, 0.9, b, o.mode || 'ink');
  const n = [...text].length;
  const sy = y + n * (o.size || 46) * 1.02 + 22;
  ctx.pipe.layer((g) => {
    const img = ctx.assets.seal_wangyue; if (!img) return;
    const s = 38, al = smooth(a + 1.0, a + 1.12, t) * (1 - smooth(b - 0.3, b, t));
    g.globalAlpha = al; g.drawImage(img, x - (o.size || 46) / 2 - s / 2, sy, s, s * img.height / img.width);
  }, { mode: 'ink', absorb: 0.5, seed: 51 });
}

export default function shots(B, X, L) {
  const S21 = B.bar(17), S22 = L.L02.start, S23 = L.L03.start, S23b = L.L03.words[6].start, S24 = L.L04.start, S25 = B.bar(24), S31 = L.L05.start;
  const small = { size: 40, font: 'Cormorant', tracking: 0.03, hold: 0.9 };
  const TEA = 'P_3.1';   // PUBLIC CUT: Waipo, Claire, An and Minh at the teahouse table
  const TEA_OFF = 0.5;   // where the teahouse take is cut in (3.1 in 03_verse2.js carries the same clock on)
  const P25 = { from: { x: 0.5, y: 0.48, zoom: 1.2 } };   // the Verse 2 teahouse (shared with 3.1 in 03_verse2.js)
  return [
    // 2.1 — West Lake in winter, the Broken Bridge; the camera travels right→left along the scroll
    { id: '2.1', t0: S21, t1: S22, paper: 'silk', grain: 21, focus: [960, 700],
      // PUBLIC CUT: the boat's passengers (P_2.1: the family cut's plate with the two figures repainted); snow falls, the
      // boatman rows; one eased pan from the first frame. Cut v3: they are Claire and An, as in 2.3 (were young Claire in a
      // red jacket and Huiling in a plum coat; the old plate is media/keyframes_public/_replaced/P_2.1_1996.jpg).
      scene: [recast(X, 'P_2.1', { offset: 0.55, subject: false, maskGain: 8, from: { x: 0.595, y: 0.52, zoom: 1.24 }, to: { x: 0.44, y: 0.53, zoom: 1.25 } },
        { par: [-0.012, 0], dolly: 0.03, ease: 'linear', mist: { color: [0.86, 0.84, 0.78], amount: 0.3, y0: 260, y1: 440, speed: -10 } })],
      type(ctx, t) {
        lyricEN(ctx, L.L01, { ...small, x: 120, y: 150, color: INK }, t);
        inscription(ctx, 'ins21', '断桥残雪', 1846, 40, t, S21 + 0.4, S22 - 0.05, { size: 38 });   // clears the pagoda as the pan passes it
      } },
    // 2.2 — willow switches hanging plain and straight → An's dance ribbons. Cut v3 (Jade: "the previous staging, where the mom
    //       is teaching a dance move was emotionally more impactful"): An holds the position and Claire's hands lift her
    //       wrist and shape the arm (P_2.2, Seedance take: she follows the hand with her eyes, then turns out and smiles)
    { id: '2.2', t0: S22, t1: S23, paper: 'silk', grain: 22,
      scene: [recast(X, 'P_2.2', { offset: 0.5, subject: false, maskGain: 8, style: { lineTh: 0.64, lineA: 0.6 }, from: { x: 0.5, y: 0.5, zoom: 1.04 }, to: { x: 0.56, y: 0.45, zoom: 1.12 } })],
      type(ctx, t) {
        lyricEN(ctx, L.L02, { ...small, x: 1860, y: 1010, align: 'right', color: INK }, t);
        inscription(ctx, 'ins22', '垂柳', 1876, 600, t, S22 + 0.4, S23 - 0.05);   // below the hands
      } },
    // 2.3 — PUBLIC CUT: West Lake. Claire and An in the canopied rowboat with the boatman, from behind; An kneels on the
    //       bench and trails her hand in the water, Claire's hand on her back (P_2.3). No lip-sync. Cut v3 (Jade: the 1996
    //       memory was "hard to realize in one shot. Maybe recast this shot as adult Claire and young daughter? and without
    //       the mitten moving weirdly"): the whole verse is now one winter visit, boat, rehearsal, boat, teahouse.
    { id: '2.3', t0: S23, t1: S24, paper: 'silk', grain: 23, focus: [960, 800],
      scene: [recast(X, 'P_2.3', { offset: 0.75, mouth: false, subject: false, maskGain: 8, from: { x: 0.52, y: 0.5, zoom: 1.03 }, to: { x: 0.54, y: 0.49, zoom: 1.07 } })],
      type(ctx, t) {
        lyricEN(ctx, L.L03, { ...small, x: 110, y: 120, color: INK, breaks: [4] }, t);
        inscription(ctx, 'ins23', '西湖', 620, 60, t, S23 + 0.5, S24 - 0.05);
      } },
    // 2.4 — insert: her hand smoothing the silk of the Chang'e costume; the silk ripple becomes a lake ripple
    { id: '2.4', t0: S24, t1: S25, paper: 'silk', grain: 24,
      // K_2.4/take_3 (Seedance 2.0): her hands smooth the silk of the costume, the folds run like water
      scene: [{ type: 'roto', clip: 'K_2.4/take_3', paper: 'silk', offset: 0.55, lock: 0, subject: false, maskGain: 8, style: { lineTh: 0.64, lineA: 0.6 }, from: { x: 0.5, y: 0.5, zoom: 1.04 }, to: { x: 0.47, y: 0.52, zoom: 1.1 } }],
      needs: [TEA],
      type(ctx, t) { silkBleed(ctx, TEA, P25, t, S25 - 0.62, S25); lyricEN(ctx, L.L04, { ...small, x: 960, y: 1000, align: 'center', color: INK }, t); } },
    // 2.5 — fill (kick lead-in 45.3): the teahouse, Claire, Waipo and the child at the table (J_3.1, the three-generation
    //       teahouse scene; K_3.1 until it lands), already soaked through the silk at the end of 2.4; 3.1 continues
    //       the same slow pull-back on the kit.
    { id: '2.5', t0: S25, t1: S31, paper: 'silk', grain: 25,
      // the same take 3.1 uses, from its first frame (3.1's clip clock continues from here), so the cut on the kit does
      // not pop from a still into motion. J_3.1/take_6 (rev2_tea): the astronaut is already leaning toward the child and Waipo is
      // pouring, eyes on the stream. The take starts 0.21 s in (its first five frames ease in from rest) and runs at
      // 0.7 on ones (h3 moved the heads on twos, so this is about 8 poses a second), easing up to 1 over the last
      // 0.3 s; 3.1 carries the clip clock on from 0.255 + 0.7 * (S31 - S25) at about rate 1, so the lips touch just
      // after the cut and the kiss settles on the kit hit in 3.1, not in this fill. Only Waipo's painted face is
      // carried (meta.keep); the astronaut's head turns, so her face is the take's.
      scene: [X.pick(TEA) ? { type: 'roto', clip: X.pick(TEA).clip, paper: 'silk', offset: TEA_OFF, lock: 0, style: { snapAmt: 0.12, lineTh: 0.62, lineA: 0.62 }, ...P25, to: { x: 0.5, y: 0.5, zoom: 1.12 } }
        : X.has(TEA) ? kf(TEA, { ...P25, to: { x: 0.5, y: 0.5, zoom: 1.12 }, par: [0, 0], dolly: 0 }) : ph('The teahouse', TEA)],
      // the view in the wall window is drawn live, under the lyric (scenes/teawindow.js): four painted planes of the West Lake
      // skyline that slide against the window frame as the shot pulls back (Jade: "as the camera zooms out, you would expect
      // the perspective in the window to change"). Baked into the take it smeared in the redraw; here it stays crisp.
      needs: TEA_WINDOW_KEYS,
      type(ctx, t) { teaWindow(ctx, t); lyricEN(ctx, L.L04, { ...small, key: 'b', x: 80, y: 660, breaks: [2], color: INK, until: L.L04.end + 0.7 }, t); } },   // on the plain wall, left of the family
  ];
}
