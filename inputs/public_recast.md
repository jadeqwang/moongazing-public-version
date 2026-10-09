# 望明月 Moongazing — Public Recast

Oct 9, 2026 · @Jade Wang

## The premise

In the public version, Jade is the singer and an invented astronaut is the story. Jade stands on Earth, on the summit of Enchanted Rock in her Rare Earth jacket, singing her poem "To Li Bai" across 1,300 years. The film's mother-astronaut becomes **Dr. Claire Shen**, a fictional Chinese American mission specialist with her own Chinese–Vietnamese American family in Clear Lake, Houston, next to the space center, where astronaut families really live.

The story is unchanged: a West Lake memory, a mission assignment, the Copernican lesson, launch, the Moon, the calls, the school play, and the Mid-Autumn homecoming. About 45 of the roughly 70 shots stay exactly as they are, including all of the Moon, the speed-build, the crew's work, the seven crew families, the toast and the pullback. About 30 Earth-side shots are recast, and four short singing inserts are added.

Because Claire is fictional, her face can be shown freely. The private cut needed visor-down and from-behind staging to protect Jade's face; in this version the camera can go close on the astronaut.

The family version stays as it is, for the family. This is a separate fork that shares the Moon half.

## Jade as the singer

Jade sings in four short inserts, about 7 s in all, from the summit of Enchanted Rock in the Texas Hill Country. It's night, she wears the Rare Earth outfit, and the inserts are drawn on GOLD paper.

The summit is the third platform in the trilogy. Rare Earth used an antenna tower above the fog, and Orbital Sunrise a tower platform above the clouds. Here it's a bare granite dome under the full Moon. By moonlight the rock looks like the Moon's own surface, so Jade stands on a small moon on Earth while Claire stands on the real one. Enchanted Rock is a gold-tier International Dark Sky Park, and rainwater collects in pools in the bare rock on its summit.

**Costume.** Jade wears the same outfit in every insert: the Rare Earth flight outfit, styled like the jacket sourced for the live shows. That is the Rewind video's jacket v3, built on a white Wild Fable mini cropped racer jacket from Target.

- **Jacket:** white, cropped, zip-front, with two orange bands across the chest and sleeves.
- **Collar and shoulders:** a ribbed band collar with a snap tab, worn open, with the tab unfastened and hanging and the collar parted at the throat. Snap epaulettes sit on the shoulders.
- **Patches:** a small pale-blue dot on the left chest, and the round 1420 MHz patch on the left sleeve only. The back carries a large pale-blue dot with RARE EARTH beneath it.
- **Underneath:** a black mock-neck crop top.
- **Lower half:** baggy black cargo trousers with hanging orange straps, and chunky white sneakers.
- **Accessories:** glasses, and her own pale dusty-pink over-ear headphones from Orbital Sunrise, around her neck or on her ears but never both (on her ears only in 8.3b).

The reference is the v3 column of `rewind-music-video/assets/character/anime/JACKET_v3_BOARD.jpg`, with notes in `rewind-music-video/docs/CHARACTER.md`. In Rewind, the models kept moving the 1420 MHz patch to the right sleeve, so check the patch side on every take.

There is no antenna. The pale blue dot on her back matches the agency emblem, so the film has two pale blue dots: hers and the crew's. Composite the lettering and patches in post; never ask an image model to draw them.

**Telling Jade and Claire apart.** The two women are demographically similar, so the silhouette has to separate them at any distance.

- **Hair.** Jade's very long, straight black hair is always worn loose, moving in the wind in 4.6 and fanned across the granite in 8.3b. Claire has a long bob that stops at the collarbone; on the Moon it sits under the comms cap.
- **Glasses.** Jade wears them; Claire doesn't.
- **Colour and paper.** Jade is on GOLD paper in white and orange. Claire is on SILK and INK, in indigo on Earth and her pale celadon stripe on the Moon.

If a frame of either woman could be mistaken for the other, redo it.

**Palette.** On GOLD paper the night is indigo, and the granite's peeling rock sheets and the live oaks below are drawn in gold line. The jacket is the brightest white in the frame, and its stripes are the paper's own ember orange. The families stay on SILK and the Moon on INK; Jade, on GOLD, is the link between them.

**The inserts**

| Shot | Time (s) | Lyric | Composition | Why it works |
| --- | --- | --- | --- | --- |
| 1.4 | 22.75–25.01 | Vocalise, peak G#5 at 24.7 | Extreme long-lens wide from a neighbouring dome. The curve of the rock fills the bottom of the frame like a planet's edge, and the rising full Moon sits huge behind it. Jade is a small silhouette on the crest, back to camera, with the pale blue dot catching the moonlight. On the 24.7 peak she lifts her head. | It introduces her without needing her face. The dome's curve also match-cuts to the Shackleton rim at 1.5. |
| 3.4a | 54.09–55.9 | 举杯邀明月 | Locked-off, centred, chest-up, as in Orbital Sunrise. She kneels behind a rain pool with the full Moon in the black water in the lower third, her face above it, singing to camera. On 举杯 she lifts her cupped hands from the pool and the reflected Moon breaks. The lyric runs vertically in the empty left third. | The pool is Li Bai's moon in the water and the film's moon in the teacup at once. She, the Moon and her reflection make three, just before the lesson's three shadows take 对影成三人. |
| 4.6 | 90.7–92.1 | Ad-lib | Low angle from behind as she stands on the crest. She slowly lifts and spreads her arms while the camera eases back and up, until the frame is mostly indigo sky and the Moon. Cut to Earth filling the frame. | It repeats the arms-spread move from Orbital Sunrise's tower shot, on her biggest vocal moment. |
| 8.3b | 201.6–204.0 | Solo hum | Straight down from above: she lies on her back on the warm granite, headphones now on, looking up at the Moon high overhead. The camera rises slowly until the pink dome is a small shape in the dark Hill Country. | It bookends 1.4, from standing small against the Moon to lying still under it. The rising camera echoes the film's "you are here" pullback (7.E3), and hands off to the Moon in the teacup. |

**Likeness.** Only 3.4a shows her face up close: 1.4 is a silhouette, 4.6 is from behind, and the hum in 8.3b needs no mouth movement.

- For 3.4a, use the Orbital Sunrise method: trace a real photo with nothing changed, keep her arms down in the still, and animate with Seedance 2.5 using the vocal reference.
- Pick the lag by ear and re-mouth from the vocal stem.
- The best source is a photo of Jade in the finished jacket. Until then, start from the approved trace of her in the jacket (\`jade\_trace\_jacket\_hp\_2.jpg\`, used in Orbital Sunrise and Rewind), and repaint the collar, patches and back to match v3.

**On location, not on a postcard.** Every insert must look as if Jade is singing on the summit, never like a cutout laid over a painting of it. This has caused reshoots and re-renders before, so check it at the keyframe, before any video is made.

- **Paint her and the place in one pass.** Use the Orbital Sunrise method: trace her photo, then have the model paint the summit around the tracing in the same image. Never paste a finished figure onto a separate plate. If a shot needs parallax layers, cut them from that single painting afterwards.
- **One light.** The Moon is the only light source, so it sets the direction and colour of her highlights and shadows. The jacket's white takes the same cool moonlight as the granite, not studio white. No light should reach her that doesn't reach the rock.
- **Contact.** Her sneakers and knees press into gritty rock, she casts a shadow across the granite, and in 3.4a her hands and face show in the pool's reflection.
- **One lens.** Her eye line and horizon match the plate's camera height. In 1.4 the long-lens compression flattens her against the Moon the same way it flattens the dome.
- **One air.** The same haze, grain, silk texture and gold line weight cover her and the landscape, and her edges carry no halo.
- **One wind.** The wind that lifts her hair and the jacket hem also moves the grass in the cracks.
- **One camera.** When the camera moves (4.6, 8.3b), she moves with the ground under her in parallax, as if she were part of it, not floating on her own layer.

Reject any keyframe that fails one of these, and fix it in the still rather than in the video.

Jade never goes to the Moon. Verse 1 now belongs entirely to young Claire's West Lake memory.

## The Shen–Trần family

The Shen–Trần family lives in a 1970s brick house on a canal off Clear Lake, Houston, ten minutes from the space center, with a small dock looking east over the water toward Galveston Bay. They differ from the real family on the points a viewer is most likely to match: both parents are Asian American, the children are 10 and 5, and they live on the Gulf coast, in a different city. From the dock the Mid-Autumn moon rises over the water, so the closing line, 海上生明月 (the bright moon rises over the sea), is literally true. Mid-Autumn is shared between the two sides of the family: 中秋 for the Shens and Tết Trung Thu, with its children's star lanterns, for the Trầns.

Their names hide in the title. The kids are 安 An and 明 Minh, and Minh is the 明 of 望明月.

| Who | Age | Heritage | Role in the story | Look (for the sheet) | Signature |
| --- | --- | --- | --- | --- | --- |
| **Claire Shen 沈清**, astronaut | 41 | Chinese American, born in Houston to parents from Hangzhou | Mission specialist (ISRU / habitat); the mother who goes | 160 cm; black long bob falling just past the jaw to the collarbone, a few greys, tucked behind her ears in the hab; no glasses; deep indigo quilted jacket over a cream turtleneck | A pencil behind her ear; she carries Minh's toy Earth to the Moon |
| **Daniel Trần**, father | 43 | Vietnamese American, grew up in Alief, southwest Houston | Trajectory engineer at the space center, not on her mission; he explains the 2.6 s delay to the kids | 175 cm; short black hair; round wire glasses; chambray shirt, khaki trousers | Counts the light delay on his fingers during the calls |
| **Minh 明**, son | 10 | — | Holds the toy Earth and gives it to his mother | 140 cm; short black hair; striped tee under a navy hoodie; brown sneakers | Reads the calligraphy aloud; names the rover; hangs back at the homecoming, then runs |
| **An 安**, daughter | 5 | — | Plays Chang'e in her Chinese school's Mid-Autumn show; holds the toy Moon | 110 cm; straight black hair, blunt bangs, high ponytail; a knitted beanie with rabbit ears; mustard cardigan, denim skirt, white sneakers | Runs full tilt at Claire at the homecoming |
| **Waipo, Shen Huiling 沈慧玲** | 72 | Born in Hangzhou; came to Houston in 1996 | The West Lake memory is hers and young Claire's; she lives with the family | 152 cm; short permed grey hair; plum cardigan; jade bangle | Pours the tea in the teahouse |
| **Bánh**, the family rabbit | 3 | Holland lop | The family's own jade rabbit | Grey-and-white, floppy ears | Asleep on Minh at every call |

**Home sets** (all invented):

- The backyard and dock on the canal: a live oak with Spanish moss, a fig tree, string lights, and star lanterns at Mid-Autumn, with the moon rising over the water. It replaces the roof decks.
- The kitchen table: tea, homework, lantern-making.
- The living room, with a low sofa and a wall where the shadows play.
- The Saturday Chinese school stage, off Bellaire Boulevard in Houston's Chinatown.

All of them are painted on SILK, as before.

## The assignment

Claire gets her assignment in Hangzhou, on the family's first trip to Waipo's city, and tells the kids that night with a flashlight. It plays across Verse 2 (47–76 s) in the slots the script already has, so the cut timing doesn't move.

1. **3.1–3.2, the teahouse (47–52 s).** Waipo pours Longjing at the square table over the lake. Snow is outside, and a bitten tangyuan makes a waning moon on the spoon. Claire's phone lies face-down by her cup.
2. **3.3, "That line—" (52.4–54.1 s).** Minh reads the inscription on the wall aloud, 举杯邀明月, with Claire's finger under each character. The phone lights up with the agency's name and Claire turns it over. Only Waipo sees her face change.
3. **3.4, the lesson (54.1–57.8 s).** That night, in the hotel room, Claire tells them where she is going. She holds the flashlight as the Sun, Minh holds the Earth and An the Moon, and their three shadows make an eclipse on the paper wall: 对影成三人. Jade sings the first half of the line from the terrace (3.4a), and the shadows take the second.
4. **3.5, "I think of you —" (57.9–61.7 s).** The vermilion 望月 seal, the film's only seal, stamps the assignment: INTERNATIONAL MOONBASE · LUNAR SOUTH POLE · 13 MONTHS. Then a HUD card shows eight names in a row, the crew announcement, which sets up the name cards at 5.3. Claire stands at the window with the toy Earth.
5. **3.6, training (61.7–64.7 s).** The montage stays: centrifuge, pool, parabolic flight, Iceland lava, the 3 a.m. desk. The wushu stance came from Jade's own life, so it becomes rock climbing in Joshua Tree, which echoes the EVA posture.
6. **3.7, the gift (65.8–71.2 s).** At the museum on the last evening before quarantine, Claire holds An on her hip over a glowing relief map of the Earth. Minh, beside them, presses the toy Earth into her hand so she won't forget what it looks like. In the family cut it was "already packed"; here the handoff happens on screen.
7. **3.8, suit-up (71.2–76.1 s).** A photo of An and Minh, with Bánh, is taped to the panel.

The mission runs about 13 months: launch after one Mid-Autumn, home for the next.

## The crew of the International Moonbase

The crew is still eight, and Claire takes Jade's seat: she wears the pale celadon stripe, the colour of the teahouse cup she brings. The other seven keep their designs, stripes and home clips. What's new is a relationship with Claire and one small story beat each, so the crew reads as a found family and not as a lineup.

| Crew | Role | With Claire | Their beat on screen | Home clip (unchanged) |
| --- | --- | --- | --- | --- |
| **Chen Yu** 陈宇, China | Commander | Her mentor. He teases her Hangzhou-flavoured Mandarin, learned from Waipo | First boot on the regolith (5.1); his private smile at his daughter's ice sled (7.C4b); leads the toast (7.E1) | Tongtong on the frozen Songhua |
| **Anastasia Volkova**, Russia | Flight engineer | The other mother aboard. They trade clips of their kids | Laughs at the Okafor twins while re-taping a glove (7.C4a); hears Misha's song in one earbud | Misha learning "A Star Called Sun" |
| **Adaeze Okafor**, Nigeria | Reactor engineer | Powers Claire's ISRU reactor; they share the 3 a.m. shift | Opens the radiator fins like a fan (7.A3) | The twins' first lost tooth |
| **Arjun Raman**, India | Geologist / ice | Claire's EVA partner. His ice is her feedstock | Drills the shadowed crater (7.B1); daughter born on day \~200 | Newborn in the sari cradle |
| **Lúcia Ferreira**, Brazil | Botanist | Trained at Embrapa, which made Brazil's acidic cerrado soil farmable; now she does the same with regolith. Gives Claire the first sprig from the growth chamber for her window | First plant in lunar soil (7.B3); hand on heart at Kenji's dog (7.C4c) | Avó Rosa's saved seeds, now in Minas Gerais: a backyard with a jabuticaba tree and a wood-fired stove (repaint) |
| **Kenji Mori**, Japan | Robotics | Lets Minh name rover Yutu-B over a call. It becomes "Bánh", after the family rabbit, and the decal is added | The radio array on the crater floor (7.B4) | Haruto and Daizu at dusk |
| **Layla Al-Mansoori**, UAE | Pilot | Lands them (4.9). She and Claire lift drink pouches to the Moon in transit (4.7) | The landing; turns to the falcon clip (7.C4d) | Saeed and the saker falcon |
| **Claire Shen**, USA | Mission specialist (ISRU / habitat) | — | Grins at the ember-orange regolith melt (7.B2); lowers her head to Earth (6.2) | An and Minh, Bánh asleep on Minh |

Two more people sit just outside the crew:

- **Sun-hee Park**, Korean American, Claire's backup and the family's **escort** on launch day. At NASA, an astronaut friend stays with the crew's family during launch. She stands beside Daniel at the fence (4.2) and in the viewing room (4.5).
- **Capcom**, a voice only: the HUD lines and the countdown.

## The crew families on Earth

In the public cut, the seven crew families appear in seven places instead of one. The family cut spent its Earth-side screen time protecting real faces; this version can spend it on the whole crew.

The families already have names and homes from their home clips. Two details are new:

- Arjun's daughter is named **Nila**, Tamil for "moon", at the naming ceremony he joins by video from the Moon.
- The children meet at the launch site and become **the crew kids**: Minh (10), An (5), Tongtong (6), Kamsi and Chidera (7), with Misha (15) as the reluctant big kid.

| Shot | Time (s) | What the families do |
| --- | --- | --- |
| 4.2 | 78.9–81.5 | All eight families at the launch fence, with Claire's family in the centre. Tongtong rides on her grandfather's shoulders, Misha films on his phone, and the Okafor twins are in matching ankara. Meera, newly pregnant, has a hand on her stomach. Haruto holds Daizu's leash. |
| 4.5 | 88.6–90.55 | The crew kids in the viewing room, palms on the glass. Misha stands at the back, pretending not to care. |
| 5.3 | 107.5–109.6 | Each name card carries a small silk thumbnail of that person's home clip, so every stab is a face and a home. |
| 6.1 | 111.95–115.55 | 举头望明月 becomes one handscroll that pans across all eight homes raising their heads, from east to west: Kamakura, Harbin, Chennai, Al Ain, Star City, Enugu, Minas Gerais, then the Clear Lake dock. It's the same Mid-Autumn night but not the same instant: the moon rises later the further west you go, so the pan follows moonrise around the planet. |
| 7.E1 | 175.85–178.5 | The crew raises cups to Earth, intercut with each family's reply raising a cup to the Moon: the Chens' red thermos, Saeed's coffee cup from the brass dallah, Avó Rosa's coffee, Waipo's celadon cup. This is the 举杯 callback on both ends. |
| 8.2 | 193.4–200.5 | The homecoming is one long silk handscroll of reunions, panned right to left (detailed below). It ends at the Clear Lake gate, where An runs and Minh hangs back, then runs. |
| 7.C2–C3 | about 151–158.5, one bar each | **The other side of the calls.** In 7.C4 the crew watch their families; here the families, unaware of any camera, miss them back. Star City: Misha at the kitchen window, stuck on one chord of "A Star Called Sun"; he looks up at the Moon and plays it again. Kamakura: Daizu waits at the garden gate at dusk, and Haruto sets out two cups of tea out of habit (a quiet nod to Hachikō). Enugu: pencil marks on a door frame, one labelled with the day Adaeze left, the twins' new marks already above it. Chennai: Meera lifts Nila to the window, toward the Moon. |

The reunions in the 8.2 handscroll, in order:

- Arjun holds Nila for the first time.
- Kenji kneels to Daizu, greyer now.
- Anastasia hears Misha play "A Star Called Sun" live.
- The twins grin with their new teeth grown in.
- Tongtong gives Chen Yu a mooncake.
- Layla takes the glove and the falcon from Saeed.
- Lúcia hands Avó Rosa the seed packet that went to the Moon and back, like the Apollo 14 Moon-tree seeds.

Most of these shots are painted stills with parallax, or slow scroll pans in the JS engine, so they are cheap to make. The two handscrolls (6.1 and 8.2) are the big paintings. Each is one wide silk plate, composed like the Qingming scroll, the form the whole film is built on.

## Everyone's moon

Nearly every culture in the cast already has its own moon story, so the film doesn't need to invent a shared symbol: it shows each home looking at the same Moon in its own way.

| Who | Their moon | Where it shows |
| --- | --- | --- |
| Chen Yu, Claire, Waipo (China) | Chang'e and the jade rabbit; mooncakes at Mid-Autumn | The film's frame; mooncakes in Harbin in the 6.1 handscroll |
| Daniel, Minh (Vietnam) | Chú Cuội, who sits under a banyan tree on the Moon and can never come home; the children's star lanterns of Tết Trung Thu | While An performs Chang'e at the school show, Daniel whispers to Minh about Cuội (7.D1): two people stuck on the Moon, and their mother is the one with a return ticket |
| Kenji (Japan) | Tsukimi, moon-viewing on the same autumn full moon, with dango and pampas grass; a rabbit pounding mochi | Haruto sets out dango and grass on the engawa (6.1) |
| Sun-hee (Korean American) | Chuseok, the same full moon again; half-moon songpyeon rice cakes; a rabbit pounding rice cakes | Her songpyeon sit among the mooncakes on the Clear Lake table (8.3) |
| Arjun, Nila (Tamil, India) | Nila means "moon"; "Nila Nila Odi Vaa" ("Moon, moon, come running") is sung while feeding small children; in the Jataka tales a god puts a self-sacrificing hare on the Moon | Her grandmother sings it at the cradle (6.1, Chennai) |
| Lúcia (Brazil) | São Jorge riding his white horse across the Moon's dark patches, identified with the orixá Ogum | Avó Rosa points him out (6.1, Minas Gerais) |
| Adaeze (Igbo, Nigeria) | Full-moon nights are for children's tales and games in the compound | Her mother tells the twins a story in the moonlit yard (6.1, Enugu) |
| Layla (UAE), Hamza (Pakistan) | The Islamic calendar runs on the Moon; the first crescent opens and closes Ramadan | Hamza's Chand Raat crescent (7.C). Layla spends Ramadan on the Moon; Emirati astronaut Sultan AlNeyadi spent it on the ISS in 2023 and said that, as a traveller, he wasn't required to fast |
| Leah (Philippines) | The Bakunawa, a sea serpent that swallowed six of the seven moons and causes eclipses; people bang pots to make it spit the Moon back out | Paolo and Lola Cora bang pots during the eclipse (below) |
| Mikko (Finland) | In the Kalevala, Louhi hides the Sun and Moon in a mountain, and the smith Ilmarinen forges replacements that won't shine | His polar-night home clip; a story his kids know, not a shot |
| Malia (Hawaiʻi) | Hina, who climbed a rainbow to the Moon with her calabash; 30 named nights in the lunar month | Her Hoku-night home clip |
| Jules (Mexican American) | The rabbit in the Moon, from Aztec story | The rabbit chain (below) |
| Anastasia (Russia) | Lunokhod 1 (1970), the first robot rover on another world and the Yutu rovers' ancestor | A small Lunokhod model on her bunk shelf (7.C4a) |
| Andriy (Ukraine) | "Nich yaka misyachna" ("What a moonlit night"), the old Ukrainian romance; and the lunar orbit rendezvous idea of Yuri Kondratyuk of Poltava, written down between 1916 and 1929 | His grandmother hums it in the cherry orchard (his home clip); the Kondratyuk line on the HUD at CAPTURE (4.8b) |

**Three beats built from these**

1. **The 6.1 handscroll gets its customs.** As the pan moves east to west with moonrise, each home keeps its own moon: dango in Kamakura, mooncakes in Harbin, the lullaby in Chennai, a falcon on Saeed's fist under the Moon in Al Ain, the twins' story in Enugu, São Jorge in Minas Gerais, star lanterns on the Clear Lake dock. The East Asian festivals really do share the night: Mid-Autumn, Chuseok, tsukimi and Tết Trung Thu all fall on the 15th of the 8th lunar month.
2. **A total lunar eclipse.** On Earth the Moon turns red, and Paolo and Lola Cora bang pots for the Bakunawa on their street in Iloilo. From the moonbase, the crew watches Earth pass in front of the Sun, ringed in red: every sunrise and sunset on the planet at once. That is what a lunar eclipse looks like from the Moon, and it pays off the Copernican lesson. It needs a slot; the best candidate is the dust-parabola bar in the drop (7.B5).
3. **The rabbit chain.** In the speed-build (7.A2), where the rovers haul regolith, four cuts on the kicks match one hop: the jade rabbit from the intro, Bánh at home, the sticker on Jules's laptop, and Yutu-B ("Bánh") hopping over a rock.

Sources: [Correio Braziliense](https://www.correiobraziliense.com.br/mundo/2024/04/6843482-de-santo-cassado-a-guerreiro-que-vive-na-lua-as-historias-de-sao-jorge.html) (São Jorge), [Wikipedia](https://en.wikipedia.org/wiki/Bakunawa) (Bakunawa), [Kalevala Society](https://kalevalaseura.fi/en/what-happens-in-the-kalevala/) (Kalevala), [Al-Monitor](https://www.al-monitor.com/originals/2023/01/uae-astronaut-says-not-required-fast-during-ramadan-iss) (AlNeyadi), [Hōkūleʻa](https://worldwidevoyage.hokulea.com/education-at-sea/polynesian-navigation/polynesian-non-instrument-wayfinding/hawaiian-lunar-month/) (Hawaiian lunar month), [Sacred Texts](https://sacred-texts.com/pac/maui/maui18.htm) (Hina).

## Mission Control, Houston

Mission Control gets eight short beats, staged after the night Curiosity landed on Mars in August 2012: the rendezvous in lunar orbit, the descent, the first steps, a 3 a.m. shift, a moon-sighting night, the re-entry, and two at the splashdown. Five controllers on the ground also miss home: the Finnish flight director Mikko Korhonen, the Filipina flight surgeon Dr. Leah Bautista, the Pakistani communications officer Hamza Qureshi, the Native Hawaiian flight dynamics officer Malia Kealoha, and the Ukrainian rendezvous officer Andriy Kovalenko, who came to Houston from Poltava at 19. Two familiar control-room types fill out the room: a veteran engineer in a lucky aloha shirt, and a student intern with bright hair.

They widen "everyone has someone they miss" beyond the crew, to people who work far from their families on Earth too. The Philippines has one of the world's largest overseas workforces, and many families there are raised by a grandparent while a parent works abroad.

**What we borrow from Curiosity's landing**

- **Scripted calls.** The microphones were live on NASA TV, so the first words were agreed in advance. "Tango Delta nominal" meant touchdown, and then Allen Chen announced "Touchdown confirmed" ([JPL](https://www.jpl.nasa.gov/news/first-words-of-safe-landing-on-mars-tango-delta-nominal/)). Our controllers' calls appear as HUD text: CONTACT, ENGINE STOP, TOUCHDOWN CONFIRMED, CREW SAFE.
- **The wait.** Controllers watch data from events that have already happened. From the Moon the delay is only about 1.3 s each way, but the HUD shows it as SIGNAL +1.3 s, and the room holds still for exactly that long.
- **The first picture.** Curiosity's first surface images were small, grainy black-and-white frames from its hazard cameras. Ours arrives the same way: grey and grainy, showing the lander's shadow and Earth on the horizon. It then dissolves into the INK painting, so the film's ink style grows out of a real camera frame.
- **Peanuts.** JPL has handed out peanuts at landings since Ranger 7 in 1964. That was the first US probe to send back close-up pictures of the Moon, after six failed Rangers ([Space.com](https://www.space.com/16927-mars-rover-landing-peanuts-tradition.html)). A jar of peanuts sits on Walt's console; he brought the tradition with him from JPL.
- **The eruption.** Rows of controllers on their feet, hugging, fists in the air.

**The set.** Mission Control is drawn on GOLD paper:

- tiers of consoles drawn in gold jiehua line;
- faces lit by their screens;
- a wall of displays at the front;
- a glass-walled viewing room at the back, where the families sit.

Shot from the back of the viewing room, one frame holds three layers: the families in silhouette at the glass, the controllers in the middle, and the Moon on the big screen.

**The people in the room**

| Who | Role | Look | Family and home clip | Payoff |
| --- | --- | --- | --- | --- |
| **Mikko Korhonen**, Finland, 46 | Flight director: the calm voice that says "go" and "no go" | Tall; close-cropped fair hair; short reddish-blond beard; reading glasses; navy mission polo with the round emblem; headset | His wife Hanna and their children Onni (8) and Lumi (5) stay in Oulu, eight hours ahead. In his clip it's midwinter noon on the frozen sea off Oulu (about 65°N), where the Sun climbs only about 1.5°, about as high as it ever gets at the moonbase. Long blue shadows stretch across the ice as Onni pulls Lumi on a sled. His home has the same sky as Claire's Moon. | His family is flown in for the splashdown and stands behind the glass. |
| Dr. **Leah Bautista**, Philippines, 38 | Flight surgeon (MD): the crew's doctor on the ground. She reads all eight crew members' heart rates and sleep from Houston, holds a private medical conference with each of them every week, and is the one who clears Claire, on her cane, to go home. During the descent her screen shows eight heart rates climbing together | 155 cm; black hair in a low bun; navy mission polo under a cardigan (the room is cold); headset | Her son Paolo (9) is raised by her mother, Lola Cora, in Iloilo while Leah works in Houston. In her clip it's September, the start of the Philippines' long Christmas season, and Paolo and Lola Cora hang a capiz-shell parol, a star lantern, in the window. It rhymes with the Trần family's Mid-Autumn star lanterns. | Under her desk is a half-packed balikbayan box, the box Filipinos abroad fill with gifts for home. Taped to her monitor is a boarding pass to Manila, dated two weeks after splashdown. She's going home for Christmas. |
| **Hamza Qureshi**, Pakistan, 41 | Communications officer: he runs the deep-space links, so every family call to the moonbase passes through his console | Medium-brown skin; short black hair; neat short beard; navy mission polo; headset | His wife Sana, their daughters Zara (9) and Inaya (6), and his mother live in Lahore, ten hours ahead. His clip is Chand Raat, the "night of the moon" before Eid: the family on their rooftop at dusk, the girls with fresh henna on their hands and new bangles, his mother pointing at the first hairline crescent. The Islamic calendar runs on the Moon, so the whole country is moongazing that night. | He sends the crescent up to the moonbase. Claire's reply comes back as a picture of an almost full Earth: when Earth sees a thin crescent Moon, the Moon sees a nearly full Earth, so the two lit fractions add up to one whole. |
| **Malia Kealoha**, Hawaiʻi, 39 | Flight dynamics officer ("Fido"): she plots every trajectory, out and home | Tall; long dark wavy hair always up in a high knot; carved bone fishhook (makau) pendant; navy mission polo; headset; a paper star compass taped beside her trajectory display | Her husband and their kids, Keoni (10) and Leilani (7), live in Hilo with her tūtū (grandmother). She crewed on a voyaging canoe as a teenager and read the Moon and stars before she learned orbital mechanics. The Hawaiian lunar month names all 30 nights; Akua, Hoku and Māhealani are the full-moon nights. Her clip is Hoku night on Hilo Bay: the Moon rising over the water, and her tūtū pointing out Hina, who climbed a rainbow to the Moon with her calabash and lives there still. | She brings the crew home across her own ocean. The entry corridor crosses the Pacific near Hawaiʻi, and her family on the Hilo sea wall sees the re-entry as one long streak of light (8.1). |
| **Walt Brennan**, USA, 62 | Lander lead: he owns the descent and makes the touchdown call | Big and white-bearded, with reading glasses on a cord; the same faded aloha shirt, printed with crescent moons, at every landing of his career | His family is in Houston, so he's the one person in the room who doesn't need a flight home. He has the lucky shirt instead. | The peanuts are his, a habit he brought from JPL. At the eruption (5.1b) they go everywhere, and he bear-hugs the intern. |
| **Jules Ortega**, USA, 20 | Imaging intern: an MIT aerospace undergraduate on their first mission | Androgynous; slight build; hair dyed teal fading to violet, buzzed at the sides; an oversized mission hoodie over the polo; a laptop covered in stickers, a rabbit among them | From San Antonio. Their grandmother told them the Mexican story of the rabbit in the Moon, which goes back to the Aztecs, so they're the one who notices that nearly every culture in the room sees a rabbit up there. | They press the key that brings up the first picture from the Moon (5.0). |
| **Andriy Kovalenko**, Ukraine, 34 | Rendezvous and docking officer: he brings the capsule and the waiting lander together in lunar orbit | Lean; dark-blond hair, short; clean-shaven; on landing days he wears a white vyshyvanka, an embroidered Ukrainian shirt, under his headset, his lucky shirt beside Walt's | First generation: he came to Houston from Poltava at 19 for university and stayed. His mother and grandmother are still in Poltava. His clip: dusk in his grandmother's cherry orchard beside a whitewashed house, the Moon rising, his grandmother on the bench humming "Nich yaka misyachna" ("What a moonlit night"), the old Ukrainian romance, while his mother holds the phone. | The mission's whole architecture, a lander waiting in lunar orbit for the crew to meet it, was first worked out by Yuri Kondratyuk of Poltava, in manuscripts written between 1916 and 1929. When Andriy calls CAPTURE (4.8b), the HUD adds one line: LUNAR ORBIT RENDEZVOUS · KONDRATYUK · POLTAVA · 1929. |
|  |  |  |  |  |

**The shots**

| Shot | Time (s) | Picture |
| --- | --- | --- |
| 4.8b | 96.7–97.73 | **Rendezvous.** In gold jiehua line, the capsule closes on the lander waiting in lunar orbit, and the two latch together. In Mission Control, Andriy in his vyshyvanka calls CAPTURE, and the Kondratyuk line appears on the HUD. The Moon-filling-the-frame shot (4.8) shortens to 94.9–96.7. |
| 4.9b | 99.0–100.2 | **Descent.** A wide from the back of the viewing room: Daniel, An and Minh in silhouette at the glass. Mikko stands at his console, one hand flat on the desk, and the front screen counts the altitude down. HUD: SIGNAL +1.3 s. The lander plume (4.9a, 97.73–99.0) and the touchdown (4.9c, 100.2–101.33) stay as they are. |
| 5.0 | 101.33–102.4 | **First picture.** Jules, the intern, presses the key, and the picture draws in line by line on the front screen, grey and grainy, while the controllers lean in. It dissolves into ink as the egress (5.1) begins, now at 102.4–104.92. |
| 5.1b | 104.92–106.0 | **First boot on the regolith.** On the IMPACT hit the room erupts: controllers on their feet, Walt bear-hugging Jules, Leah hugging Hamza, and Walt's peanuts all over the console. Behind the glass, An jumps on her seat. The 望月 seal and site plan (5.2) follow, shortened to 106.0–107.5. |
| 7.C | one bar within 147.64–161.77 | **3 a.m. in Houston.** Mikko and Leah at neighbouring consoles on the night shift, each lit by a small screen. One screen shows the low Finnish sun at 11 a.m. in Oulu; the other shows the parol going up at 4 p.m. in Iloilo. |
| 7.C | one bar within 147.64–161.77 | **Chand Raat, 9 a.m. in Houston, 7 p.m. in Lahore.** Hamza at the comms console, his family's rooftop on his screen with the thin crescent over Lahore. He sends it up to the moonbase; the frame splits, and Claire's reply fills the other half with a nearly full Earth. Crescent and Earth side by side, two halves of one whole. |
| 8.1 | 189.86–190.9 | **Re-entry.** Out of the black, a single streak of light crosses the night sky over Hilo Bay, painted on SILK. Malia's tūtū and the kids watch it from the sea wall. From here the parachutes appear only on Mission Control's front screen (8.1b). |
| 8.1b | 190.9–191.9 | **Splashdown, Leah.** The capsule hangs under parachutes on the front screen. Leah holds her phone up to it so Paolo and Lola Cora can watch from Iloilo. The boarding pass is beside her. |
| 8.1c | 191.9–193.4 | **Splashdown, Mikko.** The room is silent until the call CREW SAFE. Only then does Mikko take off his headset and turn round. Behind the viewing-room glass stand Hanna, Onni and Lumi, flown in from Finland, still in wool hats in the Houston heat, palms on the glass. |

Shot 8.1 becomes the re-entry over Hilo (189.86–190.9), and the parachutes now appear only on Mission Control's screen. The children's palms on the glass at splashdown rhyme with the crew kids' palms on the glass at launch (4.5). The controllers' payoffs all happen in Mission Control, so the 8.2 handscroll stays with the crew.

With the Mission Control team, the cast of professionals is sixteen people from twelve countries: eight women, seven men, and Jules. Two ground roles are deliberate counterparts, for balance: Hamza (Pakistan) beside Arjun (India) in the crew, and Andriy (Ukraine) beside Anastasia (Russia). Each pair gets equal weight, a home clip and a named beat apiece, and the film keeps politics out of it. Keep Walt and Jules as types, not likenesses: no real engineer's haircut or face (Curiosity's "Mohawk Guy" and "Elvis Guy" were real people).

## Shot-by-shot recast map

37 rows change: 33 are recast and 4 are singer inserts, one of which (8.3b) is a new shot. Some rows group several shots, so about 30 shots are recast in all. Every shot not listed stays as it is in the family cut: 0.1–0.5, 1.1–1.2, 1.5, 1.7–1.8, 2.4–2.5, 3.2, 4.1, 4.4, 4.8, 6.3, 7.A, 7.B (except B2), 7.C4a–d, 7.E2–E4, and 8.5. Shots 4.9, 5.1–5.2 and 8.1 are re-cut around the Mission Control beats above. Shot IDs and times are from `docs/script.md`.

**Keep, don't reshoot.** Any shot where Jade's face and hair can't be seen keeps its existing footage, even though the character is now Claire: helmets on, visors down, suited from behind. The suit, the pale celadon stripe and the round patch already belong to Claire, so these shots need no change. Recast only where a face, hair (Jade's long hair is not Claire's bob, including hair floating in free fall) or glasses show.

| Shot | Time (s) | Family cut | Public version | Change |
| --- | --- | --- | --- | --- |
| 0.6 | 13.10–15.67 | Puxi roof deck; M lifts the toy Moon, her mother kneels | The dock at Mid-Autumn; An lifts the toy Moon against the real one rising over the water, Claire kneels | Recast |
| 1.3 | 21.30–22.75 | M on stage wires as Chang'e | An on the wires | Recast |
| 1.4 | 22.75–25.01 | Jade's face in the helmet | Jade on the Enchanted Rock summit, a silhouette against the rising Moon, lifting her head | Singer |
| 1.6 | 26.87–28.75 | Family on Wenchang beach | Daniel with An on his hip, Minh holding Waipo's hand, Sun-hee beside them | Recast |
| 2.1 | 32.14–35.85 | Jade and her mother in a boat | Young Claire (9) and Huiling at West Lake in 1996 | Recast (figures only) |
| 2.2 | 35.85–39.53 | M's ribbons, Jade's hands | An's ribbons, Claire's hands | Recast |
| 2.3 | 39.53–45.98 | LS1: Jade sings; T and Kenton in the boat | Young Claire and Huiling in the boat with the boatman; Claire trails her hand in the water (no lip-sync) | Recast |
| 3.1 | 46.82–50.49 | Teahouse: her mother, Jade, M | Waipo, Claire, An, Minh; phone face-down | Recast |
| 3.3 | 52.4–54.09 | Jade's finger; T reads along | Minh reads aloud; the phone lights | Recast |
| 3.4a | 54.09–55.9 | LS2: Jade with the flashlight | Jade kneels at a rain pool on the summit, the Moon in the water: 举杯邀明月 | Singer |
| 3.4b | 55.9–57.83 | (same shot) | The lesson told only in 皮影 shadow-puppet style: reuse K\_3.4\_wall from the family cut (the three shadows on the paper wall, no faces). Check that the mother's shadow shows no long hair (Claire has a bob). The children already match: the taller boy holds the Earth, the smaller girl the Moon | Keep footage (check silhouettes) |
| 3.5 | 57.85–61.65 | The letter | The letter, then the eight-name crew card | Recast + JS |
| 3.6 | 61.65–64.7 | Training montage with Jade | Suited beats keep their footage (centrifuge, pool, Iceland fieldwork); redo the 3 a.m. desk and any beat where her hair shows; wushu becomes climbing | Partial |
| 3.7 | 65.75–71.19 | Jade holds M at the museum | Claire holds An on her hip; Minh gives her the toy Earth | Recast |
| 3.8 | 71.19–76.11 | Photo of M and T on the panel | Photo of An and Minh with Bánh | Recast (insert only) |
| 4.2 | 78.9–81.5 | Kenton, M and T at the fence | Daniel, Minh, An, Waipo and Sun-hee, centred among all eight crew families | Recast |
| 4.3 | 81.5–82.8 | LS3: Jade under g-load, mouth from the vocal | Claire under g-load, no lip-sync | Recast |
| 4.3b | 82.8–86.16 | Austin splash park | Summer at Galveston: An running from the surf, Minh cartwheeling on the sand | Recast |
| 4.5 | 88.6–90.55 | M and T in the viewing room | The crew kids together, palms on the glass | Recast |
| 4.6 | 90.7–92.1 | Earth fills the frame | Jade on the crest lifts her arms as the camera eases back, then Earth | Singer (shared) |
| 4.7 | 92.21–94.88 | Jade lifts a drink pouch | Claire and Layla lift drink pouches | Recast |
| 5.3–5.4 | 107.5–112.07 | Crew cards; Jade on the ridge | Each card carries a home-clip thumbnail, and Claire's reads "home: Houston · 384,400 km"; the ridge shot keeps its footage (back to camera, helmet on) | Recast (card text only) |
| 6.1 | 111.95–115.55 | Kenton, T and M raise their heads | A handscroll pan across all eight homes raising their heads at moonrise, east to west, ending with Daniel, An, Minh and Waipo on the dock under star lanterns | Recast |
| 6.2 | 115.57–118.8 | Jade lowers her head on Shackleton | Existing footage: visor down, no face or hair visible | Keep footage |
| 6.4 | 121.0–122.77 | City lights zoom to West Lake | Zoom to Houston and the ring of lights around Galveston Bay, then one lit window in Clear Lake | Recast (JS target) |
| 7.B2 | 133.45–147.64 | Jade at the ISRU reactor | Existing footage: visor down at the reactor | Keep footage |
| 7.C1–C3 | 147.64–158.5 | Call with M; DDR and robot dog in the playroom; M with the cat | 7.C1: the call with An and Minh, Daniel counting the delay on his fingers. 7.C2–C3: the other side of the calls, four one-bar vignettes of crew families missing someone on the Moon (see The crew families on Earth). No DDR, no Rare Earth tablet | Recast |
| 7.C5 | 147.64–161.77 | Chat: jade / bao / mei | claire: just 3 more months 🌏 → minh: ok → an: 🐰🌕 | Recast (text) |
| 7.C4 (her cell) | within 147.64–161.77 | Jade's cell, last in the grid: from behind, long ponytail, her screen showing M and T | Claire's cell: from behind with her bob; the screen shows An and Minh with Bánh | Recast (hair + screen) |
| 7.C6 | 158.5–161.77 | Jade alone at the small window from behind, ponytail; the tea cup reflects Earth | Claire at the window, her bob; the same cup and Earth | Recast (hair only) |
| 7.D1–D3 | 161.77–173.0 | M's school play; Jade at the screen | An's Chinese school show; Claire at the screen | Recast |
| 7.D4 | 173.0–175.85 (2:53) | Bass out: the theatre claps silently; on the Moon the crew around Jade applauds, her ponytail visible from behind (K\_7.D4) | The same frame with Claire's bob; no other change | Recast (hair only) |
| 7.E1–E1c | 175.85–181.1 | The toast in the dome, three framings of one take (K\_7.E1/take\_1). Jade seen from behind with her ponytail; an arm glitches in 7.E1b at about 2:58 | Claire's bob in place of the ponytail. Regenerate the take and check every raised arm frame by frame before cutting | Recast (hair) + fix |
| 8.2 | 193.4–200.5 | Front door; M bowls Jade over | A handscroll of eight reunions, ending at the backyard gate at Mid-Autumn: An runs; Minh hangs back, then runs; Claire on her cane, kneeling | Recast |
| 8.3 | 200.5–201.6 | Rooftop with the toys | Backyard table: toy Earth and toy Moon among the mooncakes (shortened) | Recast |
| 8.3b | 201.6–204.0 | — | Top-down: Jade lying on the granite, humming; the camera rises away | New (singer) |
| 8.4 | 204.0–210.04 | The tea cup with the Moon in it, on the Austin roof-deck table (K\_8.4) | The same cup and Moon, on the Clear Lake dock table with the water behind; the closing inscription unchanged | Recast (background only) |

**Fixes for both cuts.** The arm glitch in the toast is in the shared footage, so the family cut needs it fixed too. It falls in 7.E1b (176.73–178.48 s, around 2:58), where the push-in from 2.0× to 2.6× magnifies it. In the family cut, without regenerating, either move the take's offset to a clean stretch of the clip, or hold one clean frame and keep the push-in on the still. In the public cut, the regenerated take for Claire's hair fixes it at the same time.

## Production plan

The recast is roughly a week of generation and about $190–240 at list price. That is an approximate estimate, scaled from the family cut's spend of about $171 on video and $50 on images.

**Reuse as is**

- The render engine, papers, typography and seals.
- Every INK and GOLD Moon shot, plus the moonbase 3D layout (\`render/scenes/guanghan3d/\`).
- The crew sheets, six of the seven home clips, and 7.C4a–d. Lúcia's clip is repainted for Brazil, and her 5.3 name card changes to BRAZIL · AEB · MINAS GERAIS.
- The audio master and the subtitles, since the lyrics are unchanged.
- The West Lake boat keyframe (K\_2.1) and its landscape, for young Claire's memory in 2.1 and 2.3.

**Steps**

1. **Make a clean public repo.** Copy the engine and the Moon assets into a new repository with no history. Don't fork or make the current one public: its history holds the family docs.
2. **Draw the character sheets.** Make sheets for Claire (Earth look, plus the crew suits with the celadon stripe), An (with her Chang'e costume), Minh, Daniel, Waipo, young Claire and Huiling for 1996, Sun-hee, Bánh, Mikko, Leah, Hamza, Malia and Andriy with their families, Walt, Jules, and a crowd sheet of flight controllers. Use the same recipe as before: gpt-image-2.5-sunburst for layout, a grok pass for line, and Su Hanchen as the last reference. Add a heights lineup: Daniel 175, Claire 160, Waipo 152, Minh 140 and An 110 cm. That's about 40 image calls, around $6.
3. **Paint the sets.** The Clear Lake backyard and dock, kitchen and living room, plus the Chinese school stage and Mission Control with its glass viewing room, with 2–3 angles each (about $5). Paint the Enchanted Rock summit as one plate with parallax layers, plus a matching top-down view for 8.3b.
4. **Make the recast keyframes.** About 30 frames, plus six crew-family paintings: the fence, the viewing room, the 7.E1 replies, the name-card thumbnails, and the two handscrolls. Use the old keyframes for composition only, and paint the people fresh from the new sheets. Reject any take that keeps a family member's hair, height or face, or the Austin rooms. About 90 calls, $15–25.
5. **Generate the motion.** Use h3 or Seedance 2.0 where the frame must hold the keyframe, and score every take with `tools/ffcheck.py`. About 25 shots at about 3 takes each, $80–110.
6. **Shoot the singer inserts.** Pick one photo of Jade per angle, trace it, and paint the summit around her. Animate with Seedance 2.5 using the vocal reference, choose the lag by ear, and re-mouth from the stem. There are four inserts, but only 3.4a needs full lip-sync: about $20–30.
7. **Cut, review, finish.** Re-render at 540p and review against this map. Then the 1080p final, the thumbnails and the 15 s social cut.

## Privacy checklist and open decisions

Before release, nothing in the picture, the repo or the credits should point to the real family.

**Privacy checklist**

- [ ] Make the current `moongazing` repo private. Its docs name the kids' initials, ages and heights, Kenton, Austin, the house and its reference photos, the grandparents, the nanny, the Shanghai trip and the school play. A new commit won't remove them from the history.
- [ ] The public repo carries no family docs, no `inputs/` photos except crops of Jade, and no reference-photo paths.
- [ ] No frame keeps a family member's face, hair, height or clothes, the cat, the robot dog, or an Austin room.
- [ ] Every HUD and chat line is checked: Claire's card says "home: Houston"; the chat reads claire / minh / an. Three lines in the current code still say Austin: the call HUDs "AUSTIN → GUANGHAN" and "AUSTIN · 21:40 CDT" in render/src/sections/07\_drop.js, and Jade's crew card in render/src/sections/05\_interlude.js.
- [ ] The singer inserts use only photos of Jade alone, with the backgrounds discarded, as in Orbital Sunrise.
- [ ] The credits name the cast as fictional.

**Open decisions for Jade**

- [x] Names: Claire Shen 沈清, Daniel Trần, An 安, Minh 明, Waipo Shen Huiling, Bánh the rabbit. Keep them or swap?
- [x] Texas: decided, and fine. Houston's space community is part of the audience. Climbing stays in Joshua Tree, since astronauts travel to train. Nothing left to decide here.
- [x] The platform is decided: the summit of Enchanted Rock, in the Rare Earth outfit.
- [ ] More singing: add a fifth, face-forward insert (for example at 2.5, 45.3–47.1 s) if four feels too few?
- [ ] 6.4 zoom target: Claire's home in Clear Lake, or Waipo's Hangzhou (故乡 as the ancestral home)?
- [ ] Decided: no DDR and no Rare Earth cameo. 7.C2–C3 go to the crew families instead.
- [ ] Picture credit wording, carried over from the family cut's open question.
