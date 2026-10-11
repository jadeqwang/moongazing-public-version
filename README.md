# 望明月 Moongazing

**望明月 Moongazing** is a 3.5-minute animated music video by Jade Wang, set to a song built on Li Bai's lines about the Moon. An astronaut, Claire Shen, whose family comes from Hangzhou, spends thirteen months at an eight-person international base at the Moon's south pole, while her family and her crewmates' families look up at it from Earth. Every frame is drawn by a JavaScript renderer, over painted keyframes and motion takes, in the manner of Chinese painting: ink on paper, colour on silk, and ruled gold line (界画) on indigo.

This repository is the source of the public cut:

- `render/`: the renderer and the shot definitions. Each section of the song is one file in [`render/src/sections/`](render/src/sections/), and the scenes drawn entirely in code are in [`render/src/scenes/`](render/src/scenes/).
- `tools/`: a few production tools.

The footage and the paintings are not here. The astronaut, her family, the crew and Mission Control are fictional.

What follows is a tour of the Moon base for viewers who like to check the engineering: what each thing is in the film, and the real work it rests on. Text in `CODE TYPE` is what the film's data lines say. Times are minutes:seconds.

## Where the base is, and why there

At 1:44 the plan of the station is labelled 国际月球基地 INTERNATIONAL MOONBASE, `89.5° S · SHACKLETON–DE GERLACHE RIDGE`.

The ridge joining the craters Shackleton and de Gerlache is some of the best-lit ground near the pole. [Gläser et al. (EPSC 2014)](https://elib.dlr.de/94242) found spots on it in sunlight 92.3% of the time at 2 m above the ground and 95.66% at 10 m. The Sun never climbs: from Shackleton's rim it "glides around the horizon, never more than 1.5 degrees above or below it" ([NASA Scientific Visualization Studio](https://svs.gsfc.nasa.gov/4944)), once round in 29.53 days. Crater floors nearby never see it, and can fall to 25 K ([LRO Diviner](https://www.diviner.ucla.edu/science)).

Both real programmes point here. NASA's [Moon Base plan](https://www.nasa.gov/moonbase-phases/) builds toward a permanent outpost near the south pole from 2032. The China-led International Lunar Research Station plans "a basic model to be built by 2035 in the lunar south pole region" ([Xinhua, 2025](https://english.www.gov.cn/news/202504/24/content_WS680976d7c6d0868f4e8f2045.html)). The film's caption at 0:17 reads `INTERNATIONAL MOONBASE · LUNAR SOUTH POLE · EST. 2035`.

## How it is built (2:00 to 2:11)

Twelve cuts of two beats each, drawn live as gold line by [`buildsite.js`](render/src/scenes/buildsite.js). A day counter runs from `CONSTRUCTION DAY −640 · ROBOTIC PRE-BUILD` to day 97. The Sun's bearing in each cut is computed from the counter (12.19° a day, right to left as seen from the south pole) at an elevation of 1.2°, so a 20 m mast throws a 950 m shadow.

| Time | On screen | Real basis |
| --- | --- | --- |
| 2:01 | `SITE SURVEY · RIDGE 89.5° S · SUN 0–1.5°`. Two rovers rule the plan onto bare regolith. | The illumination studies above. |
| 2:02 | `SOLAR MASTS · 20 M · TRACKING THE SUN AROUND THE HORIZON`. The panels stand upright, 10.5 m to 19.5 m above the ground, and turn once a month. | NASA's Vertical Solar Array Technology programme puts arrays on masts to clear the shadows of terrain at the poles ([NASA, 2021](https://www.nasa.gov/technology/nasa-industry-to-mature-vertical-solar-array-technologies-for-lunar-surface/)). Its reference design asks for at least 10 kW with the bottom of the array at least 10 m up ([NASA Langley](https://ntrs.nasa.gov/api/citations/20240004914/downloads/VSAT%20Mechanisms%20Abstract%2020240418.pdf)). Prototypes were tested in vacuum at Johnson Space Center in 2024 ([NASA](https://www.nasa.gov/centers-and-facilities/johnson/from-houston-to-the-moon-johnsons-thermal-vacuum-chamber-tests-lunar-solar-technology), [Astrobotic](https://www.astrobotic.com/lunagrids-vertical-solar-array-technology-enters-tvac/)). |
| 2:03 | `PRESSURE VESSELS LANDED · 4 MODULES`. A hub, four inflatable tunnels, four rigid modules. | Land the pressure vessel first and build the shield over it: the order of ESA's 2013 study (next row). |
| 2:04 | `REGOLITH PRINTER · SHIELD SHELL 2.5 M · ONE 0.6 M COURSE A DAY`. A gantry prints a shell over each module. | ESA and Foster + Partners designed a dome printed from regolith over a pressurised inflatable, with cellular walls against micrometeoroids and radiation, and printed a 1.5 tonne block to test it ([ESA](https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Building_a_lunar_base_with_3D_printing)). NASA's $57.2 million contract with ICON is for a system to build "landing pads, habitats, and roads" from local material ([NASA](https://www.nasa.gov/technology/manufacturing-materials-3-d-printing/nasa-icon-advance-lunar-construction-technology-for-moon-missions/)). |
| 2:05 | `COMMS TOWER · 25 M · DISH ON EARTH` | From the pole the Earth stays low over one stretch of horizon, "never veering far from 0° longitude" ([NASA SVS](https://svs.gsfc.nasa.gov/4944)), so the dish points at the horizon. |
| 2:06 | `CREW LANDER DOWN · BARE REGOLITH, 2.0 KM EAST` | Engine plumes blast regolith outward. Apollo 12's landing beside Surveyor III is still the main real-world test of how that ejecta behaves ([Metzger et al.](https://ntrs.nasa.gov/citations/20120000029)). The film lands its crew 2 km out, before any pad exists. |
| 2:07 | `FISSION SURFACE POWER · 100 kWe · PRE-CRITICAL`, `ADAEZE OKAFOR · 1.0 KM OUT · RADIATOR, 12 PANELS`, then `POWER ON THE GRID · 1.0 KM CABLE` | In 2025 NASA asked industry for a lunar reactor giving "at least 100 kilowatts of electrical power" through a closed Brayton cycle, on the Moon by early fiscal 2030 ([NASA Glenn](https://www.nasa.gov/centers-and-facilities/glenn/nasa-seeks-industry-feedback-on-fission-surface-power/)). `PRE-CRITICAL` is why an engineer can be standing next to it. |
| 2:08 | `CUPOLA · SHUTTERS OPEN · DAY 030` | See "Liberties we took". |
| 2:09 | `LANDING PAD · ⌀ 50 M · LASER-SINTERED REGOLITH`. A rover circles once a day and leaves one more dark, glassy pass. | Landing pads are the first item on the ICON contract's list (above). |
| 2:10 | `INTERNATIONAL MOONBASE · 89.5° S · LIGHTS ON` | Day 97. |

At 2:21 the lights come on one by one. The work lamps show only as hard-edged pools on the ground: with no air, nothing glows around a lamp.

## Oxygen and metal from rock (2:13)

`CLAIRE SHEN · ISRU · MOLTEN REGOLITH ELECTROLYSIS`, `1,600 °C · 3.6 kA · O₂ 1.0 kg/h`

Molten regolith electrolysis melts lunar soil and passes a current through it. Oxygen comes off, and iron and silicon collect as metal.

| On screen | Check |
| --- | --- |
| `1,600 °C` | Laboratory cells run "near 1600 C" ([Sibille, Sadoway et al., 2010](https://ntrs.nasa.gov/citations/20110008524)). |
| `O₂ 1.0 kg/h` | [Schreiner's MIT model (2015)](https://dspace.mit.edu/handle/1721.1/98589) sizes a plant of 1,593 kg and 56.5 kW to make 10,000 kg of oxygen a year from highlands regolith. That is 1.14 kg/h. |
| `3.6 kA` | Each O₂ molecule takes four electrons, so 1.0 kg/h needs 3,350 A at perfect efficiency. The rest allows for losses. |

The best public test is far behind that. In late 2024 NASA Kennedy and Lunar Resources ran the LR-1 reactor in a vacuum chamber: 25 kg of simulant kept molten for 9 hours, at an average of 0.07 kg of oxygen per hour ([NASA Kennedy](https://www.nasa.gov/centers-and-facilities/kennedy/nasa-kennedy-breathes-life-into-moon-soil-testing), [Toro Medina et al., 2026](https://ntrs.nasa.gov/citations/20260006167)). The film's plant is fourteen times faster and runs all year.

By the production's own arithmetic, most of that oxygen is rocket oxidizer for the ride back to orbit, not air to breathe.

## Ice (2:11)

`ARJUN RAMAN · PSR`, `BITE 07 · 0.70 m`, `H₂O 3.1 wt%`

The drill in the permanently shadowed crater is drawn after TRIDENT, Honeybee Robotics' 1 m rotary-percussive drill. It works in 10 cm "bites" and delivers each to the surface as a cone of cuttings for instruments to read ([Zacny et al., 2025](https://icedrill.org/sites/default/files/Zacny_2025_TRIDENT%20Ice%20Mining%20Drill%20for%20Lunar%20Volatile%20Prospecting%20for%20PRIME-1%20and%20VIPER%20Missions.pdf)), so `BITE 07 · 0.70 m` is the seventh. TRIDENT presses about 100 N onto its bit, and the film's 70 kg rover weighs only 113 N on the Moon, so the drill stands on its own braced frame.

TRIDENT reached the Moon on NASA's [PRIME-1](https://www.nasa.gov/mission/polar-resources-ice-mining-experiment-1-prime-1/) in March 2025. The lander came to rest on its side, and in about ten hours the drill ran through its full range of motion without reaching the ground ([NASA](https://www.nasa.gov/missions/artemis/nasas-lunar-drill-technology-passes-tests-on-the-moon/)). Nobody has yet drilled ice out of a shadowed lunar crater.

The one measurement of how much ice such ground holds is LCROSS in 2009: 5.6 ± 2.9% water by mass at its impact site in Cabeus ([Colaprete et al., 2010](https://experts.arizona.edu/en/publications/detection-of-water-in-the-lcross-ejecta-plume/)). The film's 3.1 wt% is an invented reading inside that range.

## Growing food (2:15)

`LÚCIA FERREIRA · ARABIDOPSIS IN LUNAR REGOLITH`, `FIRST ROSETTE`

Two real experiments stand behind this shot, and neither is the shot itself:

- In 2022 University of Florida scientists grew *Arabidopsis* on Earth in regolith from Apollo 11, 12 and 17, about a gram to a thimble-sized well. Nearly all the seeds sprouted. The plants were smaller and slower than the controls ([UF/IFAS](https://blogs.ifas.ufl.edu/news/2022/05/12/a-first-scientists-grow-plants-in-soil-from-the-moon/)).
- In January 2019 cotton seeds sprouted on the Moon in a sealed canister aboard Chang'e-4, in soil brought along. They died within a week, when the lunar night took the canister to −52 °C ([Guinness World Records](https://www.guinnessworldrecords.com/world-records/633299-first-seeds-to-germinate-on-the-moon)).

A plant in lunar regolith, on the Moon, is the film's step beyond both. NASA's LEAF experiment, selected in 2024, is to grow crops on the lunar surface ([NASA](https://www.nasa.gov/news-release/nasa-selects-first-lunar-instruments-for-artemis-astronaut-deployment/)).

At 3:14 Lúcia hands her grandmother seeds that have been to the Moon and back. Stuart Roosa carried some 2,000 tree seeds around the Moon on Apollo 14 ([NASA](https://nssdc.gsfc.nasa.gov/planetary/lunar/moon_tree.html)).

## Getting about

The base's small rovers are called Yutu 玉兔, after the Moon rabbit of the old story and China's two real rovers. Yutu-2 landed with Chang'e-4 on the far side in January 2019 and became the longest-lived lunar rover ([Wikipedia](https://en.wikipedia.org/wiki/Yutu-2)). The film's version has wheel-legs and two solar panels for ears. It surveys the site (2:01), runs the reactor's cable (2:07), stands by at the drill (2:11) and unrolls the radio antennas (2:16).

At 2:18 a crew member lopes across the regolith under `1.62 m/s² · NO AIR · NO CLOUD`. Each grain of dust leaving her boot is integrated under lunar gravity ([1.62 m/s²](https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html)) with no drag. It flies its arc, lands and stops.

## Listening (2:16)

`KENJI MORI · FILM-DIPOLE ARRAY · 4 × 100 M · 1–50 MHz`, `NO SUN · NO EARTH · THE QUIETEST SKY IN REACH`

LuSEE-Night, a US radio telescope built to ride Firefly's Blue Ghost Mission 2 to the far side of the Moon, goes there for the radio silence, to look for the signal of the cosmic Dark Ages ([Brookhaven National Laboratory](https://www.bnl.gov/newsroom/news.php?a=222425)). The film's array is somewhere else. See "Liberties we took".

## The people and their jobs

Eight crew from eight countries. At 1:46 each gets a card with name, country, job, home town and `384 400 KM`.

| Crew | Country and home | Job | Where to look |
| --- | --- | --- | --- |
| Chen Yu 陈宇 | China, Harbin | Commander | First boot on the regolith, 1:40 (`+6 H · EGRESS · SUN 1.0°`) |
| Anastasia Volkova | Russia, Star City | Flight engineer | The walkout to the rocket, 0:22 |
| Adaeze Okafor | Nigeria, Enugu | Reactor engineer | Opens the reactor's radiator, 2:07 |
| Arjun Raman | India, Chennai | Geologist, ice | The drill, 2:11 |
| Lúcia Ferreira | Brazil, Minas Gerais | Botanist | The growth chamber, 2:15 |
| Kenji Mori | Japan, Kamakura | Robotics | The radio array, 2:16 |
| Layla Al-Mansoori | UAE, Al Ain | Pilot | The landing, 1:36 |
| Claire Shen 沈清 | USA, Houston | Resource utilization and habitat | The oxygen plant, 2:13 |

## Talking to home

**The delay.** The Moon is 384,400 km away on average ([NASA](https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html)), which is 1.28 s at the speed of light. During the descent at 1:37 Mission Control holds still under `HOUSTON · SIGNAL +1.3 S`, watching an altitude that is already 1.3 s old. In the call home at 2:36 the words cross the split screen as a gold line that takes 1.28 s to arrive, beside a counter reading `RTT 3.1 s (light 2.6)`. The extra half second is the production's allowance for relays and encoding.

**Mission Control** is staged after the night Curiosity landed on Mars in 2012. That team scripted its first words because the microphones were live on NASA TV: "Tango Delta nominal", then Allen Chen's "Touchdown confirmed" ([JPL](https://www.jpl.nasa.gov/news/first-words-of-safe-landing-on-mars-tango-delta-nominal/)). The film's calls are `TOUCHDOWN CONFIRMED` and, at splashdown, `CREW SAFE`.

**The Kondratyuk line.** The crew capsule never lands. It meets a lander waiting in lunar orbit, and when the two latch at 1:35 the screen reads `CAPTURE`, then `LUNAR ORBIT RENDEZVOUS · KONDRATYUK · POLTAVA · 1929`. Yuri Kondratyuk, born in Poltava ([Wikipedia](https://en.wikipedia.org/wiki/Yuri_Kondratyuk)), published *The Conquest of Interplanetary Space* in 1929. He proposed that a Moon ship should stay in lunar orbit while a smaller lander goes down and comes back up to it ([Linda Hall Library](https://www.lindahall.org/yuri-kondratyuk/)). The same article finds no evidence that Apollo's planners took the idea from him. The film credits the man who wrote it down first.

## The sky as seen from the Moon

No image model paints the Earth. [`earthview.js`](render/src/scenes/earthview.js) renders it as a sphere from NASA's [Blue Marble](https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation) day maps and [Black Marble](https://www.earthdata.nasa.gov/data/projects/black-marble) night lights. Its phase, its tilt and the face it shows come from [JPL Horizons](https://ssd.jpl.nasa.gov/horizons/) for a real date. To repeat the query: target Earth (399), observer `coord@301` at 222.8° E, −89.45°, 1.5 km.

| Shot | Date (UT) | Lit | Above the horizon | Width | Point facing the Moon |
| --- | --- | --- | --- | --- | --- |
| 1:53, 低头思故乡 | 2037-Sep-10 02:30 | 99.7% | 4.8° | 2.05° | 6.6° N, 147.7° E, the western Pacific |
| 2:53, the toast | 2038-Aug-30 08:00 | 99.9% | 4.9° | 1.98° | 13.2° N, 60.5° E, the Arabian Sea |
| Not shown: the next full Moon | 2037-Sep-24 12:00 | 0.2% | −6.7° | | |

- **It is small.** Two degrees is nearly four times the width of the Moon in our sky, and still only a thumb at arm's length.
- **It hangs upside down.** From the south pole the Earth appears "upside-down and rotating backwards" ([NASA SVS](https://svs.gsfc.nasa.gov/4944)). The film does not turn it to look familiar.
- **It stays low,** bobbing a few degrees above and below the horizon in one direction. That is why the third row has no picture.
- **Its phase is the opposite of the Moon's.** At 2:38 a flight controller sends up his family's view of the month's first thin crescent, and Claire's reply is the Earth as she sees it that night, nearly full.

The pull-back from 2:58 to 3:07 is one continuous zoom in [`cosmos.js`](render/src/scenes/cosmos.js): the station's plan, the Lunar Reconnaissance Orbiter Camera's [mosaic of the south pole](https://lroc.im-ldi.com/images/237), the whole Moon, the Earth and Moon to scale, and last the Earth as one pale pixel in a band of scattered sunlight, after Voyager 1's photograph of 14 February 1990 ([NASA](https://science.nasa.gov/mission/voyager/voyager-1s-pale-blue-dot/)).

## Getting there and back

**Training (1:00 to 1:04).** One caption per beat:

| On screen | Check |
| --- | --- |
| `NEUTRAL BUOYANCY · 12 M` | NASA's pool is 12.2 m deep ([NASA](https://www.nasa.gov/johnson/neutral-buoyancy-laboratory/)). |
| `PARABOLIC FLIGHT · 0 G · 22 S` | Each parabola gives up to 22 seconds of weightlessness ([ESA](https://www.esa.int/ESA_Multimedia/Images/2025/11/Flying_for_the_Moon)). |
| `ICELAND · BASALT FIELD` | The Artemis II crew trained there in 2024, as Apollo crews did in 1965 and 1967 ([Canadian Space Agency](https://www.asc-csa.gc.ca/eng/news/articles/2024/2024-08-22-artemis-ii-crew-refines-lunar-geology-skills-in-iceland.asp)). |
| `HUMAN CENTRIFUGE · 8 G`, `ORBITAL MECHANICS · 03:00` | The production's own captions, with no source behind the numbers. |

**Out (1:10 to 1:36).** The rocket is a core with two boosters. The capsule's escape tower sits directly on it, with no fairing, as on China's Mengzhou ([Xinhua, 2025](http://www.news.cn/tech/20250617/2c2995b55dd04a0c8a4adff0a4bbdc13/c.html)), whose escape system was tested at maximum dynamic pressure on a Long March 10 test rocket in February 2026 ([Xinhua, 2026](https://www.news.cn/tech/20260212/953c9239a6844c1990c5514942bc0919/c.html)). China's programme is building the same three pieces the film uses, a heavy rocket, a capsule and a separate lander, for a landing by 2030 ([Xinhua via CASC](https://english.spacechina.com/n17212/c4470621/content.html)). The data lines: `MAX-Q · 3.2 G`, `MET 00:02:41 · STAGE 1 SEP`, `ORBIT · 200 KM · 7.8 KM/S`, `TLI COMPLETE · 10.9 KM/S`, `CAPTURE`, `DAY 4 · DESCENT`.

**Back (3:07).** The return is told from the ground: one streak of light over Hilo Bay under `HILO · ENTRY INTERFACE · 11 KM/S`, then `HOUSTON · THREE GOOD CHUTES` and `CREW SAFE`. Mengzhou does come down under three main parachutes ([Science and Technology Daily](https://www.stdaily.com/web/gdxw/2025-06/18/content_356522.html)).

## The eclipse lesson (0:55)

The night Claire tells her children where she is going, they act it out with a torch for the Sun, a toy Moon and a 24 cm globe, under Li Bai's line 对影成三人, "with my shadow we make three".

The light in this shot is computed from a geometry fixed before anything was painted: a torch lens 4.0 cm in radius, a Moon 3.28 cm in radius held 70 cm from it, and the globe's centre at 103 cm. The Moon is 0.273 of the globe, the true ratio ([NASA](https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html)). The lens is a little larger than the Moon, as the Sun is, so the full shadow narrows behind the Moon and the half shadow widens: about 3.0 cm and 5.6 cm across on the globe. The beam, both shadows and the globe's night side are laid over an unlit take, frame by frame, from the measured positions of the three objects.

The globe has real coastlines ([Natural Earth](https://www.naturalearthdata.com/)) and is turned so that the shadow comes to rest on central Anatolia. That is the total eclipse of 28 May 585 BC, the one Thales is said to have foretold. By Herodotus's account it stopped a battle between the Medes and the Lydians ([NASA](https://eclipse.gsfc.nasa.gov/SEhistory/SEhistory.html)), remembered as the Battle of the Halys.

It cannot be to scale. A scale Moon would be 30 globe-widths away, 7.2 m, and the real umbra is about 1% of the Earth's width, where the torch's is a quarter of the globe.

## Liberties we took

- **One agency.** In the film "every space program on Earth is building" the base together. In reality there are two camps, and since 2011 NASA has been barred by law from bilateral work with China ([Caltech's summary](https://researchpolicy.caltech.edu/research-security/international_collaboration/wolf-amendment-for-nasa-funding-and-work-with-jpl)).
- **A full Moon and a full Earth, cut together.** From 1:49 eight homes raise their heads to a full Moon, and at 1:53 the crew look at a full Earth. Those cannot be the same night. The Earth's sky is the real one for 10 September 2037, a new Moon at home. At the full Moon two weeks later the Earth is a black disc below the station's horizon.
- **The Earth is drawn larger than life:** 1.2 times at 1:53 and 1.3 times in the toast, so that it reads on a phone.
- **The glass dome.** A real base would be buried, and the film's modules are, under 2.5 m of printed regolith. The hub and its cupola stand in the open, a glass room where eight people raise a cup to the Earth. The film gives it shutters for solar storms.
- **The pace.** Ninety-seven days of crewed work is believable only after the 640 days of robotic building the counter shows.
- **Distances in the gold drawings.** In the oblique plan views the landing pad and the reactor are drawn about 100 m from the hub, on their true bearings, as a palace scroll would. In the station's layout they are 2 km and 1 km away.
- **The oxygen plant** makes fourteen times what the best public test has, without stopping. **The ice reading** is invented. **The plant** in lunar soil on the Moon has not happened yet.
- **The radio array** lies on the floor of Shackleton, where the crater wall hides both the Sun and the Earth. Real plans for this science go to the far side.
- **The launch is compressed.** About ten seconds of screen time pass between ignition (1:15) and `MET 00:02:41 · STAGE 1 SEP` (1:25).
- **The capsule is a hybrid.** It has no fairing, like Mengzhou, and it comes down in the sea, as NASA's Orion does ([NASA](https://www.nasa.gov/blogs/missions/2022/12/08/artemis-i-flight-day-23-mission-teams-prepare-for-splashdown-select-landing-site/)). Mengzhou is designed to land on the ground on airbags.
- **`384 400 KM` on every crew card** is the mean distance. The real figure changes by the hour.

## Credits

From the film's closing colophon ([`colophon.js`](render/src/scenes/colophon.js)):

> FOR EVERYONE WORKING FAR FROM THE PEOPLE THEY LOVE.\
> LOOK UP — THEY’RE LOOKING AT THE SAME MOON.
>
> 献给每一位在远方工作、思念家人的人。\
> 抬头看看——他们望着的，是同一轮明月。

- Words — Jade Wang, from her poem “To Li Bai,” *Oyez Review* (2007)
- Chinese lines — Li Bai (701–762), “Drinking Alone by Moonlight” (月下独酌) and “Quiet Night Thoughts” (静夜思)
- Melody & chords — Jade Wang & Charlie van Norman, from a 2011 jam session
- Arrangement realized with Suno
- Closing lines — Zhang Jiuling, “Gazing at the Moon, Longing for One Far Away” (望月怀远)
- Picture — drawn in ink, silk and gold by JavaScript, over keyframes made with GPT Image and Nano Banana Pro, and motion from Seedance and MiniMax
- The astronaut, her family, the crew and Mission Control are fictional; any resemblance to real people is coincidental
- Imagery — NASA LRO / LROC · NASA Black Marble · Voyager 1 “Pale Blue Dot” (1990), courtesy NASA/JPL

The lines the film sets on screen are 举杯邀明月，对影成三人 (0:53), 举头望明月，低头思故乡 (1:49) and, at the close, 海上生明月，天涯共此时 (3:18). The title's 望明月 is the wording that Ming and Qing anthologies made standard. The oldest editions of the poem read 举头望山月 ([Guangming Daily](https://www.chinawriter.com.cn/n1/2024/0415/c442005-40216203.html)).
