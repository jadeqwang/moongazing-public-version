// SECTION 3 · VERSE 2 — 46.82–76.11 (kit 47.14; strings 51; full band lift 61.65). Type grows: English lyrics at
// ~60–80 px, the Li Bai couplet as big calligraphy across the wall, HUD labels in the training montage.
import { lyricEN, lyricZH, calli, card, hud, kf, ph, recast, bump, INK, INKC, PALE, PALEC, WHITE, smooth, easeInOutSine, osSing } from './_lib.js';
import { plateMap } from '../scenes/plate.js';
import { teaWindow, TEA_WINDOW_KEYS } from '../scenes/teawindow.js';
import { CREW } from './05_interlude.js';

export const range = [46.16, 75.08];


// 3.6a — the human centrifuge as a RIGID rotation of the painted arm (K_3.6a split offline by
// scratchpad centrifuge.py into a clean floor plate + arm / gondola / hub sprites in keyframe px). The arm turns in the
// floor plane about the hub axis: in screen space that is `M` = T(p)·S(1,k)·R(θ)·S(1,1/k)·T(−p) (parallel oblique
// projection, rings are ellipses of ratio k), drawn with a short motion-blur shutter; the gondola rides the arm tip
// (translated, not rotated: it is a body of revolution); the hub is drawn on top.
const KW = 2752, KH = 1536, PIV = [1385, 1055], RK = 0.578, TIP = [2190, 719];
function centrifuge(t0, t1) {
  const view = { from: { x: 0.6, y: 0.47, zoom: 1.22 }, to: { x: 0.62, y: 0.46, zoom: 1.32 } };
  const P = { img: 'K_3.6a_floor', grade: 'native', ...view, par: [0, 0], dolly: 0 };
  const W0 = -0.09, OMEGA = 1.95, SHUTTER = 0.022, N = 10;           // rad, rad/s (≈19 rpm on screen), s
  const theta = (lt) => W0 + OMEGA * lt;
  const M = (th) => { const c = Math.cos(th), s = Math.sin(th);
    const a = c, b = -s / RK, d = RK * s, e = c;                         // S(1,k) R S(1,1/k)
    return [a, d, b, e, PIV[0] - a * PIV[0] - b * PIV[1], PIV[1] - d * PIV[0] - e * PIV[1]]; };   // canvas order a,b,c,d,e,f
  return {
    needs: ['K_3.6a_floor', 'K_3.6a_arm', 'K_3.6a_gondola', 'K_3.6a_hub'], focus: [1300, 420],
    scene: [{ name: 'plate', params: P }],
    spin(ctx, t, lt) {
      const map = plateMap(P, lt, t1 - t0, { width: KW, height: KH });
      const base = (g) => g.transform(map.a[0] / KW, 0, 0, map.a[1] / KH, map.b[0], map.b[1]);
      const blur = (img, place) => ctx.pipe.layer((g) => {
        if (!img) return;
        base(g); g.globalCompositeOperation = 'lighter'; g.globalAlpha = 1 / N;
        for (let k = 0; k < N; k++) { g.save(); place(g, theta(lt - SHUTTER * k / (N - 1))); g.drawImage(img, 0, 0, KW, KH); g.restore(); }
      }, { mode: 'over', seed: 361 });
      blur(ctx.assets['K_3.6a_arm'], (g, th) => g.transform(...M(th)));
      blur(ctx.assets['K_3.6a_gondola'], (g, th) => { const m = M(th);
        g.translate(m[0] * TIP[0] + m[2] * TIP[1] + m[4] - TIP[0], m[1] * TIP[0] + m[3] * TIP[1] + m[5] - TIP[1]); });
      ctx.pipe.layer((g) => { const img = ctx.assets['K_3.6a_hub']; if (img) { base(g); g.drawImage(img, 0, 0, KW, KH); } }, { mode: 'over', seed: 362 });
    },
  };
}

export default function shots(B, X, L) {
  const bar = (n, b = 1) => B.bar(n, b);
  const W = (id, i) => L[id].words[i].start;
  const S31 = L.L05.start, S32 = L.L06.start, S33 = W('L06', 2), S34 = L.L07.start, S34b = W('L07', 5);   // 3.4: the singer to 对 (55.28), then the shadow play
  // 3.5 (rev 4, ENV): each take holds its drawings two or three frames, so both shots show one of the take's own drawings
  // for every two film frames (the take's frame numbers, in order). AB35: his hand lets go (7-19), she holds both ends
  // (21-26), turns it over (28 tilted, 31 steep, 34 edge-on, 37-51 the sealed back coming round), it lands (54) and settles.
  // C35: the packet comes out and down to her (4-24), two drawings of her hold, the top panel up and the bottom panel down
  // at the take's own speed (40-56), the open page.
  const AB35 = [7, 10, 12, 13, 15, 16, 18, 19, 21, 24, 26, 28, 31, 34, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63];
  const C35 = [4, 8, 12, 14, 16, 18, 20, 22, 24, 30, 36, 40, 42, 44, 46, 48, 50, 52, 54, 56, 60, 64];
  const drawings35 = (D) => (lt) => (D[Math.min(D.length - 1, Math.max(0, Math.floor(lt * 12 + 1e-3)))] + 0.25) / 24;
  const S35 = L.L08.start, S36 = bar(33), S37 = L.L09.start, S38 = bar(38, 2), HOOK = bar(41);
  const mid = { size: 66, font: 'Cormorant', tracking: 0.02 };
  const FINE = { lineA: 0.3, lineW: 0.09, snapAmt: 0.2, shade: 0.2 };   // 3.4 wide + side view: small faces, so a thin quiet line and the take's own colour
  const gloss = (ctx, t, a, b, color, y = 1046, x = 960) => card(ctx, 'gloss07' + x, { lines: [[{ t: 'I raise my cup to invite the bright Moon; with my shadow, we make three.', font: 'CormorantItalic' }]], size: 30, x, y, align: 'center', color }, t, a, b, color === INK ? 'ink' : 'over');
  // the montage: one drawing per beat. Each training shot is a redrawn motion base (roto) on its own paper; the
  // centrifuge is a JS rigid rotation of the painted arm (the generated spin loses the gondola).
  const HAS_F = X.has('K_3.6f');
  const mt = [bar(33), bar(33, 2), bar(33, 3), bar(33, 4), bar(34), HAS_F ? bar(34, 4) : S37];
  const OFF33 = 0.5;    // where the calligraphy take is entered (cut v6, take_8: first inner stroke 0.54-0.96 s, second 1.25-1.67 s, the brush clear by 1.96 s)
  const OFF36D = 0.12;   // where the Iceland take is entered (its painter's pick)
  const mont = [
    ['K_3.6a', 'HUMAN CENTRIFUGE  ·  8 G', null],
    ['K_3.6b', 'NEUTRAL BUOYANCY  ·  12 M', { type: 'roto', clip: 'K_3.6b/take_6', paper: 'silk', offset: 0.5, lock: 0.12, from: { x: 0.4, y: 0.5, zoom: 1.3 }, to: { x: 0.39, y: 0.49, zoom: 1.38 } }],
    ['K_3.6c', 'PARABOLIC FLIGHT  ·  0 G  ·  22 S', { type: 'roto', clip: 'K_3.6c/take_4', paper: 'silk', offset: 0.35, lock: 0.12, from: { x: 0.5, y: 0.5, zoom: 1.06 }, to: { x: 0.5, y: 0.5, zoom: 1.12 } }],
    // 3.6d — PUBLIC CUT: the Iceland beat is the repainted keyframe (Claire's bob under the hard hat) held as a still
    // with a push for its eleven frames
    ['P_3.6d', 'ICELAND  ·  BASALT FIELD', recast(X, 'P_3.6d', { offset: OFF36D, subject: false, maskGain: 8, style: { snapAmt: 0.12, lineA: 0.4 }, from: { x: 0.55, y: 0.48, zoom: 1.12 }, to: { x: 0.56, y: 0.48, zoom: 1.18 } }, { dolly: 0.04 })],   // cut v4: the hammer falls (a take, when one is picked; else the still)
    // 3.6e — PUBLIC CUT: Claire at the 3 a.m. desk, ink wash on xuan (P_3.6e): the whole figure is drawn from the take in
    // the take's own tones (silk branch, no snap, no line)
    ['P_3.6e', 'ORBITAL MECHANICS  ·  03:00', recast(X, 'P_3.6e', { style: { snapAmt: 0, shade: 0, gran: 0, lineA: 0 }, offset: 0.5, from: { x: 0.5, y: 0.5, zoom: 1.04 }, to: { x: 0.5, y: 0.5, zoom: 1.12 } }, { grade: 'native' })],
  ];
  const montage = mont.map(([img, label, roto], i) => ({
    id: `3.6${'abcde'[i]}`, t0: mt[i], t1: mt[i + 1], paper: i === 4 ? 'xuan' : 'silk', grain: 360 + i, post: (t, lt) => bump(lt, 0.012),
    ...(i === 0 ? centrifuge(mt[0], mt[1]) : { scene: [roto] }),
    type(ctx, t, lt) {
      if (i === 0) this.spin(ctx, t, lt);
      hud(ctx, label, 64, 72, { size: 15, rgb: '232,72,52', a: 0.95 }, 1);
      hud(ctx, `T−${String(14 - i).padStart(2, '0')} WEEKS`, 64, 98, { size: 13, rgb: i === 4 ? '30,30,34' : '240,232,214' }, 1);
      if (i === 4) lyricEN(ctx, L.L08, { ...mid, key: 'm', size: 74, x: 1840, y: 860, align: 'right', color: INK, breaks: [4], text: { 3: 'you —' } }, t);   // in the wash, clear of her
      else lyricEN(ctx, L.L08, { ...mid, key: 'm', size: 74, x: 120, y: 980, color: PALE, breaks: [4], panel: 'dark', text: { 3: 'you —' } }, t, 'over');
    },
  }));
  return [
    // 3.1 — kit hits. PUBLIC CUT: the teahouse over West Lake, today: Waipo pours, Claire between An and Minh, her phone
    //       face down by her cup (P_3.1). The take's clock continues from 2.5 (02_verse1.js: cut in at 0.5 s, rate 1).
    { id: '3.1', t0: S31, t1: S32, paper: 'silk', grain: 31, focus: [1170, 800],
      scene: [recast(X, 'P_3.1', { offset: 0.5 + (S31 - bar(24)), style: { snapAmt: 0.12, lineTh: 0.62, lineA: 0.62 }, from: { x: 0.5, y: 0.5, zoom: 1.12 }, to: { x: 0.5, y: 0.52, zoom: 1.04 } }, { par: [0, 0], dolly: -0.04, masks: { base: [0.0, 0.6] } })],
      // the view in the wall window is drawn live, under the lyric (scenes/teawindow.js), from this shot's own push, carrying
      // on from 2.5 (Jade: "as the camera zooms out, you would expect the perspective in the window to change"). Baked into
      // the take it smeared in the redraw; here it stays crisp.
      needs: TEA_WINDOW_KEYS,
      type(ctx, t) { teaWindow(ctx, t); lyricEN(ctx, L.L05, { ...mid, x: 80, y: 600, breaks: [2, 3], color: INK }, t); } },   // on the plain wall, left of the family
    // 3.2 — a tangyuan bitten into a crescent (月缺) on the same table (P_3.2: Claire's indigo cuff holds the spoon,
    //       Waipo's hand with the bangle comes in for the chopsticks). Tight on the bowl: one focal point.
    { id: '3.2', t0: S32, t1: S33, paper: 'silk', grain: 32,
      scene: [recast(X, 'P_3.2', { offset: 0.5, style: { snapAmt: 0.12, lineTh: 0.62, lineA: 0.62 }, from: { x: 0.47, y: 0.52, zoom: 1.1 }, to: { x: 0.47, y: 0.5, zoom: 1.17 } }, { masks: { base: [0.1, 0.7] } })],   // Waipo's bangle (80% of the width) stays in frame
      // the lyric sits low on the dark table, under the bowl
      type(ctx, t) { lyricEN(ctx, L.L06, { ...mid, key: 'a', x: 1860, y: 1030, align: 'right', color: PALE, panel: 'dark', w1: 2, text: { 1: 'tea.' }, until: S33 + 0.1 }, t, 'over'); } },
    // 3.3 — "That line—". Seen from above, Minh writes 举杯邀明月 in a column of five copybook squares; Waipo's hand (the
    //       bangle) only holds the corner of his paper flat (P_3.3). Cut v4 (Jade: the pointing finger "feels a little bit
    //       harsh"; "an over the shoulder shot of the son practicing calligraphy on a desk"). Cut v5 (Jade: "better if the
    //       last 月 has the last 2 strokes (middle part) missing and he's completing the final 2 strokes"): the four
    //       characters and the outer strokes of 月 are IN the keyframe (3.3/b2: the film's own type, composited), and the
    //       take is the brush adding the two inner strokes, done at about 2.1 s of the take. No type is set in JS any
    //       more, so ink and brush cannot disagree. The push goes in on the last square. Older stagings: work/t/03_verse2_33.v*.txt
    //       Cut v6 (Jade: the right of 月 "partially erased"; the "second brush stroke suddenly appears instead of appearing to be
    //       drawn by the boy"): keyframe 3.3/b3 has the outer strokes whole, and take_8 is built, not generated: the writing arm
    //       moved so the brush tip draws each inner stroke, the ink revealed only behind the tip (work/rev6/FIXES/calli_take.py).
    { id: '3.3', t0: S33, t1: S34, paper: 'silk', grain: 33, focus: [960, 800],
      scene: [recast(X, 'P_3.3', { offset: OFF33, style: { snapAmt: 0.05, lineTh: 0.62, lineA: 0.6 }, from: { x: 0.5, y: 0.52, zoom: 1.05 }, to: { x: 0.5, y: 0.63, zoom: 1.4 } })],
      type(ctx, t) { lyricEN(ctx, L.L06, { ...mid, key: 'b', size: 60, x: 1840, y: 990, align: 'right', color: PALE, w0: 2, italic: [0, 1], text: { 1: 'line—' }, until: S34 + 0.02 }, t, 'over'); } },
    // 3.4 — PUBLIC CUT. 举杯邀明月: the singer on the summit of Enchanted Rock by the rain pool, chest-up, filming
    //       herself, singing the line to the lens (S_3.4a_os: her trace painted, animated from the vocal; _lib.js
    //       OS_SING), to the onset of 对 (55.28). 对影成三人: the lesson as a shadow play (P_3.4_wall, a still with a push; there is no take). The
    //       calligraphy runs across both, each character on its sung onset.
    { id: '3.4a', t0: S34, t1: S34b, paper: 'indigo', grain: 340, focus: [960, 300], vignette: 0.22,
      scene: [osSing(X, 'S_3.4a_os', '3.4a', S34, { from: { x: 0.5, y: 0.5, zoom: 1.0 }, to: { x: 0.5, y: 0.485, zoom: 1.04 } })],
      type(ctx, t) {
        lyricZH(ctx, L.L07, { size: 104, vertical: false, lead: 1.0, x: 230, y: 28, color: PALEC, seed: 70, until: S35 + 0.05 }, t, 'over');
        gloss(ctx, t, S34 + 0.6, S34b, PALE, 1046, 520);   // left of the pool: the Moon in the water stays clear
      } },
    { id: '3.4b', t0: S34b, t1: S35, paper: 'silk', grain: 341, focus: [1090, 500], vignette: 0.22,
      // cut v5 (Jade: "there shouldn't be an eclipse on the wall, and the moon should cast a shadow on the earth ... work out
      // the geometry on this shot before animating"; then: "center it on the anatolia region (battle of halys easter egg)"):
      // a new plate with An and Minh (P_3.4b; the old one was the family cut's). The globe has real coastlines turned so
      // the shadow's target is central Anatolia (tools/eclipse_globe.py). No light is painted: tools/eclipse_fit.py lays the
      // torch's beam, the Moon's umbra and penumbra (in the air and on the globe), the globe's night side and its own
      // shadow from the measured positions, and tools/eclipse_take.py does it on every frame of an unlit take, following
      // the Moon: An lifts it into the beam and its shadow slides up the globe onto Anatolia (there from about 1.3 s).
      scene: [X.pick('P_3.4b') ? { type: 'roto', clip: X.pick('P_3.4b').clip, paper: 'silk', lock: 0, offset: 10 / 24, twos: false, redrawAll: 1, style: { snapAmt: 0, shade: 0, gran: 0, lineA: 0 }, from: { x: 0.5, y: 0.5, zoom: 1.03 }, to: { x: 0.56, y: 0.47, zoom: 1.15 } }
        : X.has('P_3.4b') ? kf('P_3.4b', { from: { x: 0.5, y: 0.5, zoom: 1.03 }, to: { x: 0.56, y: 0.47, zoom: 1.15 }, dolly: 0, par: [0, 0], masks: { base: [0.0, 0.0] } }) : ph('The lesson as a shadow play', 'P_3.4b')],
      type(ctx, t) {
        lyricZH(ctx, L.L07, { size: 104, vertical: false, lead: 1.0, x: 230, y: 28, color: PALEC, seed: 70, until: S35 + 0.05 }, t, 'over');   // 人 is sung 0.3 s before the cut: it is brushed with 三 (lyricZH joins a late last character)
        gloss(ctx, t, S34 + 0.6, S35 + 0.05, PALE);
      } },
    // 3.5 — the mission assignment (docs/research_mission_assignment.md): the formal signed copy, handed to her after the
    //       chief's call. A sticker seal, words kept on the envelope, a real trifold that she
    //       opens, no jump at 0:59. A real US No. 10 envelope and US Letter sheet, painted over the true-size blockout
    //       scenes/blockouts/3.5/blockout.py. TWO shots (3.5b is now part of 3.5a: the turn is one continuous take, so
    //       there is no cut inside it), each with a painted first AND last frame:
    //       3.5a to the bar-32 downbeat: the larger hand (navy cuff, from the right) lets go and leaves; the FRONT is
    //            legible (MISSION ASSIGNMENT / 飞行任务通知书 / recipient, set in JS on the paper, which is measured
    //            in every drawing: scenes/papertype.js sheet envelopeFront10, tools/paper_quad.py); she takes both ends
    //            and turns it over sideways; the type goes round with the face; the back lands, its flap SEALED with the
    //            pale-blue-dot sticker (K_3.5_front/take_6, first frame K_3.5_front, last K_3.5_back).
    //       3.5c the flap is open (the cut stands for her breaking the seal; the sticker stays on the envelope's body):
    //            the letter comes out as a folded packet a third of the page tall, she brings it to her, opens the top
    //            panel up and away, the bottom panel down toward her; the print is inside (grey lines too small to read,
    //            baked into the take) (K_3.5_letter/take_7, first frame K_3.5_letter, last K_3.5_letter_end).
    ...[['3.5a', S35, bar(32), 'K_3.5_front', { offset: AB35[0] / 24, time: drawings35(AB35), redrawAll: 1 }, { x: 0.5, y: 0.5, zoom: 1.04 }, { x: 0.5, y: 0.495, zoom: 1.09 }, [1000, 480],
        [{ sheet: 'envelopeFront10', track: 'env' }]],
      ['3.5c', bar(32), S36, 'K_3.5_letter', { offset: C35[0] / 24, time: drawings35(C35), redrawAll: 1 }, { x: 0.5, y: 0.5, zoom: 1.03 }, { x: 0.505, y: 0.51, zoom: 1.08 }, [1000, 470], []]].map(([id, a, b, key, clock, from, to, focus, sheets], j) => ({
      id, t0: a, t1: b, paper: 'silk', grain: 35 + j * 315, focus, vignette: 0.2, needs: ['emblem_final_small'],
      scene: X.pick(key) ? [{ type: 'roto', clip: X.pick(key).clip, paper: 'silk', ...clock, lock: 0, from, to, style: FINE },
        ...sheets.map((sh) => ({ name: 'papertype', params: { clip: X.pick(key).clip, ...clock, from, to, ...sh } }))]
        : [X.has(key) ? kf(key, { from, to, par: [0, 0], dolly: 0 }) : ph('The mission assignment', key)],
      // the lyric stacks on the bare desk at the top left, the one area clear of the envelope, the flap, the letter and all
      // three hands in 3.5a, b and c (the right margin holds the other hand and cuff, then her sleeve)
      type(ctx, t) {
        lyricEN(ctx, L.L08, { ...mid, size: 48, x: 250, y: 112, color: PALE, breaks: [4, 5], text: { 3: 'you —' }, until: S36 + 0.05 }, t, 'over');
        // PUBLIC CUT: the assignment, and the crew announcement that sets up the name cards of 5.3: eight names in a row
        if (id === '3.5c') {
          const a = smooth(bar(32) + 0.35, bar(32) + 0.7, t);
          hud(ctx, 'INTERNATIONAL MOONBASE  ·  LUNAR SOUTH POLE  ·  13 MONTHS', 64, 984, { size: 15, rgb: '232,72,52', a: 0.95 }, a);
          CREW.forEach(([name], i) => hud(ctx, name.split(' ')[0], 64 + i * 226, 1030, { size: 14, rgb: i === 7 ? '255,255,255' : '240,232,214', a: i === 7 ? 1 : 0.8 }, smooth(bar(32) + 0.5 + i * 0.07, bar(32) + 0.7 + i * 0.07, t)));
        }
      } })),
    // 3.6 — BAND LIFT: training montage, one frame per beat
    ...montage,
    ...(HAS_F ? [{ id: '3.6f', t0: mt[5], t1: S37, paper: 'silk', grain: 366, post: (t, lt) => bump(lt, 0.012),
      scene: [kf('K_3.6f', { from: { x: 0.5, y: 0.5, zoom: 1.06 }, to: { x: 0.5, y: 0.5, zoom: 1.16 }, dolly: 0.08 })],
      type(ctx, t) { hud(ctx, 'WUSHU  ·  EVA POSTURE', 64, 72, { size: 15, rgb: '232,72,52', a: 0.95 }, 1, 'ink'); } }] : []),
    // 3.7 — the last evening before quarantine. PUBLIC CUT: Claire holds An on her hip over the glowing relief of the
    //       Earth; Minh presses the toy Earth into her hand (P_3.7). The lyric stays in the left third.
    { id: '3.7', t0: S37, t1: bar(37), paper: 'silk', grain: 37,
      scene: [recast(X, 'P_3.7', { offset: 0.5, eyelock: false, style: { snapAmt: 0.12, lineTh: 0.62, lineA: 0.62 }, from: { x: 0.52, y: 0.5, zoom: 1.03 }, to: { x: 0.56, y: 0.48, zoom: 1.12 } }, { dolly: 0.06, masks: { base: [0.1, 0.5] } })],
      type(ctx, t) { lyricEN(ctx, L.L09, { ...mid, size: 80, x: 110, y: 480, color: PALE, breaks: [2], hold: 1.6, until: bar(37) }, t, 'over'); } },   // pale on the dark museum wall
    // 3.7b — PUBLIC CUT, singer insert on the held "wine" (bar 37): the singer alone by the rain pool, chest-up, eyes
    //        closed on the held note (S_3.7b_os, as 3.4a). The whole line stands in the sky on the left.
    { id: '3.7b', t0: bar(37), t1: S38, paper: 'indigo', grain: 137, focus: [1100, 250], vignette: 0.2,
      scene: [osSing(X, 'S_3.7b_os', '3.7b', bar(37), { from: { x: 0.5, y: 0.5, zoom: 1.0 }, to: { x: 0.5, y: 0.48, zoom: 1.06 } })],
      type(ctx, t) { lyricEN(ctx, L.L09, { ...mid, key: 'b', size: 80, x: 110, y: 90, color: PALE, breaks: [2], hold: 1.6 }, t, 'over'); } },
    // 3.8 — strapping in, six moving shots of different crew in real procedural order (docs/research_capsule_interior.md
    //       section 7): glove lock (suit-up room) · walkout (Flight E1-A, from behind) · white room and hatch · the harness
    //       hauled tight · the astronaut's buckle (the tongue clicks home on 74.4) · her visor comes down and her helmet turns to the
    //       photograph of An and Minh. Faces are behind visors or out of frame; hands, straps and hardware carry it. No red on
    //       suits (emblem = the pale-blue dot). 2, 2, 2, 1, 1 beats, then 3 beats on the photograph before ignition.
    //       Each take is cut in with the motion under way (offset >= 0.5, lock 0).
    ...[['3.8a', S38, bar(38, 4), 'K_3.8a_glove', 1.25, { x: 0.52, y: 0.48, zoom: 1.04 }, { x: 0.52, y: 0.46, zoom: 1.12 }],
      ['3.8b', bar(38, 4), bar(39, 2), 'K_3.8b_walkout', 0.5, { x: 0.56, y: 0.5, zoom: 1.04 }, { x: 0.6, y: 0.48, zoom: 1.12 }],
      ['3.8c', bar(39, 2), bar(39, 4), 'K_3.8c_whiteroom', 0.6, { x: 0.52, y: 0.48, zoom: 1.22 }, { x: 0.54, y: 0.44, zoom: 1.34 }],
      ['3.8d', bar(39, 4), bar(40), 'K_3.8d_harness', 0.5, { x: 0.5, y: 0.47, zoom: 1.05 }, { x: 0.5, y: 0.46, zoom: 1.1 }],
      ['3.8e', bar(40), bar(40, 2), 'K_3.8e_buckle', 0.6, { x: 0.5, y: 0.5, zoom: 1.08 }, { x: 0.5, y: 0.47, zoom: 1.14 }],   // take time of the click = offset + (74.4 − bar 40)
      ['3.8f', bar(40, 2), HOOK, 'P_3.8f_visor', 1.3, { x: 0.5, y: 0.5, zoom: 1.03 }, { x: 0.62, y: 0.46, zoom: 1.2 }]].map(([id, a, b, key, offset, from, to], j) => ({
      id, t0: a, t1: b, paper: 'indigo', grain: 380 + j, ...(j === 5 ? { focus: [1560, 560], vignette: 0.2 } : {}),
      scene: [key.startsWith('P_') ? recast(X, key, { style: { ink: [0.80, 0.66, 0.38], lineA: 0.8 }, offset, from, to }, { dolly: 0.05, grade: 'native' })
        : X.pick(key) ? { type: 'roto', clip: X.pick(key).clip, paper: 'silk', style: { ink: [0.80, 0.66, 0.38], lineA: 0.8 }, offset, lock: 0, from, to }
        : X.has(key) ? kf(key, { from, to, dolly: 0.05, grade: 'native' }) : ph('Strapping in', key)],
      type(ctx, t) {
        const T0 = 75.16, s = Math.max(0, T0 - t);
        hud(ctx, `T−00:00:${String(Math.floor(s)).padStart(2, '0')}.${String(Math.floor((s % 1) * 10))}`, 64, 1030, { size: 20, rgb: '255,255,255' }, 1);
        hud(ctx, 'HARNESS  ·  LOCKED', 64, 1000, { size: 14, rgb: '232,72,52', a: 0.95 }, smooth(73.41, 73.46, t));
      },
    })),
  ];
}
