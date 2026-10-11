// SECTION 8 · OUTRO — 187.33–204.19 on the lower-key recording (guzheng; humming 192.5–196.6; a run of slowing
// plucks from 198.6; a short solo hum at 203.0; the last chord at 204.19). Colour returns.
// PUBLIC CUT: the way home is told from the ground. Re-entry seen from Hilo, splashdown in Mission Control (8.1, 8.1b,
// 8.1c); the homecoming is one handscroll of the crew's reunions (8.2) ending at the gate on Clear Lake (8.2b, two bars); the tea cup with the Moon
// in it stands on the dock table (8.4). The closing inscription 海上生明月，天涯共此时 (Zhang Jiuling) brushes in vertically;
// the film goes dark exactly on the last chord, where 09_credits takes over with the seal and the colophon.
import { calli, card, hud, kf, ph, recast, PALE, PALEC, smooth } from './_lib.js';

export const range = [187.32, 204.19];

export default function shots(B, X, L) {
  const bar = (n, b = 1) => B.bar(n, b);
  const S81 = bar(105), S81b = bar(106), S81c = bar(106, 3), S82 = bar(107), S82b = bar(109), S84 = bar(111), END = 204.19;
  const gold = { grade: 'native' };
  // 8.2's cuts (the first reunion two beats, six of one beat) and where each take is entered (its painter's pick)
  const CUT82 = [S82, bar(107, 3), bar(107, 4), bar(108), bar(108, 2), bar(108, 3), bar(108, 4), S82b];
  const OFF82 = { a: 1.5, b: 0.4, c: 0.5, d: 0.4, e: 0.4, f: 0.4, g: 0.4 };   // cut v6: the takes of the modern homes
  // each reunion's framing: [centre x, centre y, zoom] on the meeting of the two (the pictures are spare enough to push in)
  // Cut v6 (Jade: "modernize the home environments of the crew members"; a viewer could not "imagine these astronauts having
  // home environments that are so low tech"): the same reunions in contemporary homes; the views are a little wider so the
  // glass, the car, the solar roof and the intercom are in frame.
  const VIEW82 = { a: [0.48, 0.46, 1.28], b: [0.48, 0.52, 1.25], c: [0.52, 0.5, 1.22], d: [0.52, 0.47, 1.22], e: [0.47, 0.55, 1.3], f: [0.5, 0.5, 1.15], g: [0.47, 0.5, 1.2] };
  // 8.2's handscroll band and end stops, as 6.1's (06_breakdown.js). Cut v3 (Jade: "maybe the scroll can go a little slower if
  // the figures were closer together?"): the reunions stand 96 px apart and the mango tree is behind the twins (P_8.2scrollT,
  // 7359 x 1344, tools/scroll_tighten.py); shown three quarters of the frame high, the pan runs at under half the old speed.
  const SCROLL82 = [0, 140, 1920, 800], SCROLL82_X = (1920 / 800) / (7359 / 1344) / 2 + 0.004;
  return [
    // 8.1 — the abrupt cut to black; out of it one long streak of light crosses the night over Hilo Bay: Malia's tūtū and
    //       the children watch the re-entry from the sea wall (P_8.1, SILK)
    { id: '8.1', t0: S81, t1: S81b, paper: 'silk', grain: 81, focus: [960, 400],
      scene: [recast(X, 'P_8.1', { offset: 0.5, subject: false, maskGain: 8, from: { x: 0.5, y: 0.44, zoom: 1.1 }, to: { x: 0.5, y: 0.5, zoom: 1.03 } })],
      post: (t, lt) => ({ fade: 1 - smooth(0.45, 1.25, lt), fadeColor: [0, 0, 0] }),
      type(ctx, t, lt) { hud(ctx, 'HILO  ·  ENTRY INTERFACE  ·  11 KM/S', 64, 1030, { size: 15, rgb: '240,232,214', a: 0.9 }, smooth(0.9, 1.3, lt)); } },
    // 8.1b — Mission Control, the parachutes on the front screen: Leah holds her phone up to it for Iloilo (P_8.1b, GOLD)
    { id: '8.1b', t0: S81b, t1: S81c, paper: 'indigo', grain: 811, focus: [960, 480],
      scene: [recast(X, 'P_8.1b', { offset: 0.3 /* cut v4: a take */, subject: false, maskGain: 8, from: { x: 0.5, y: 0.5, zoom: 1.03 }, to: { x: 0.5, y: 0.48, zoom: 1.09 } }, gold)],
      type(ctx) { hud(ctx, 'HOUSTON  ·  THREE GOOD CHUTES', 64, 72, { size: 15, rgb: '232,72,52', a: 0.95 }, 1); } },
    // 8.1c — CREW SAFE: Mikko takes off his headset and turns round to the glass, where his family stands (P_8.1c, GOLD)
    { id: '8.1c', t0: S81c, t1: S82, paper: 'indigo', grain: 812, focus: [1000, 420],
      scene: [recast(X, 'P_8.1c', { offset: 0.3 /* cut v4: a take */, subject: false, maskGain: 8, from: { x: 0.5, y: 0.5, zoom: 1.03 }, to: { x: 0.52, y: 0.47, zoom: 1.1 } }, gold)],
      type(ctx) { hud(ctx, 'CREW SAFE', 64, 72, { size: 15, rgb: '232,72,52', a: 0.95 }, 1); } },
    // 8.2 — Mid-Autumn, thirteen months later. Cut v4: the crew's reunions as a montage, each in its own place, mid-action
    //       (P_8.2r_a..g; "r" keeps the keys clear of the gate's P_8.2b): Arjun holds Nila for the first time (two beats), Daizu's paws on Kenji's chest, Misha plays for
    //       Anastasia, the twins' new teeth, Tongtong's mooncake, the falcon stepping to Layla's fist, the seeds back in Avó
    //       Rosa's hands; then the gate (8.2b). Jade (Oct 10): the family moments were powerful "because they were such
    //       specific moments across different ages and cultures"; "every still image would actually be much stronger as
    //       an action shot". The handscroll pan it replaces: P_8.2scrollT (work/t/08_outro.v3.js).
    ...'abcdefg'.split('').map((k, i) => ({ id: '8.2r' + k, t0: CUT82[i], t1: CUT82[i + 1], paper: 'silk', grain: 82 + i * 0.1, focus: [960, 520],
      scene: [recast(X, 'P_8.2r_' + k, { offset: OFF82[k], subject: false, maskGain: 8, style: { snapAmt: 0.12, lineTh: 0.64, lineA: 0.4 }, from: { x: VIEW82[k][0], y: VIEW82[k][1], zoom: VIEW82[k][2] }, to: { x: VIEW82[k][0], y: VIEW82[k][1], zoom: VIEW82[k][2] * 1.04 } })] })),
    // 8.2b — the scroll ends at the garden gate on Clear Lake: An runs full tilt; Minh hangs back, then runs; Claire, on
    //        her cane, kneels (P_8.2b). Two bars: the embrace holds through the end of the humming and Minh crosses the lawn.
    { id: '8.2b', t0: S82b, t1: S84, paper: 'silk', grain: 85, focus: [1000, 600],
      scene: [recast(X, 'P_8.2b', { offset: 0 /* An lands in Claire's arms 1.0 s in; Minh starts to run at 1.3 s */, subject: false, maskGain: 8, style: { snapAmt: 0.12, lineTh: 0.64, lineA: 0.3 }, from: { x: 0.5, y: 0.5, zoom: 1.03 }, to: { x: 0.52, y: 0.52, zoom: 1.12 } })],
      post: (t, lt) => ({ bump: 0.005 * Math.exp(-lt / 0.12) }) },
    // 8.4 — the Moon in the tea, on the dock table with the water behind (P_8.4); the closing inscription; the short
    //       solo hum (203.0) under the fade; dark on the last chord
    { id: '8.4', t0: S84, t1: END, paper: 'silk', grain: 84,
      // cut v4: a take (steam from the tea, the Moon's reflection trembling and settling, the path on the lake shimmering);
      // the push starts a little lower than before so the cup is in frame while it trembles. Old still: work/t/08_outro_84.v3.txt
      scene: [recast(X, 'P_8.4', { offset: 0, subject: false, maskGain: 8, style: { snapAmt: 0.12, lineA: 0 }, from: { x: 0.53, y: 0.47, zoom: 1.22 }, to: { x: 0.52, y: 0.56, zoom: 1.08 } }, { dolly: 0.04, shimmer: 0.6, flicker: 0 })],
      type(ctx, t) { inscription(ctx, t, S84); },
      post: (t) => ({ fade: smooth(END - 0.8, END, t), fadeColor: [0.02, 0.02, 0.03] }) },
  ];
}

// 海上生明月，天涯共此时 — two vertical columns in the 留白 top-left, with the English beneath
function inscription(ctx, t, a) {
  calli(ctx, 'z84a', { text: '海上生明月，', size: 74, x: 380, y: 70, color: PALEC, seed: 81 }, t, a + 0.3, 2.0, a + 20, 'over');
  calli(ctx, 'z84b', { text: '天涯共此时', size: 74, x: 286, y: 70, color: PALEC, seed: 82 }, t, a + 2.2, 2.0, a + 20, 'over');
  card(ctx, 'e84', { lines: [[{ t: 'The bright moon rises over the sea;', font: 'CormorantItalic' }], [{ t: 'however far apart, we share this moment.', font: 'CormorantItalic' }]], size: 34, x: 440, y: 120, color: PALE }, t, a + 3.0, a + 20, 'over');
}
