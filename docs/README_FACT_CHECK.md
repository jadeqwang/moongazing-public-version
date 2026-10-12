# README fact check — 12 October 2026

Reviewed: `README.md`, using its existing line numbers. The README and film source have not been edited. This report checks the research claims, calculations and distinction between demonstrated technology and the film's extrapolations. It includes a fresh JPL Horizons calculation of the three Earth-view dates.

**Assessment:** most of the named technologies and numerical references check out. The README needs several corrections before publication, particularly the Chang'e-4 seedling's fate, eclipse shadow dimensions, and statements that imply stronger or more exclusive evidence than the sources provide. These can be corrected in the prose without changing the film.

## Corrections to make before publication

### 1. Chang'e-4: replace the claim that the cotton died in the first lunar night

**README line 74.** The germination is real, but the categorical account of death is based on early reporting. The experiment team's later paper reports that the payload was dormant from 12 to 31 January 2019, reached −52 °C internally, and that the lunar seedling appeared upright and green afterward. That observation does not establish continuing growth or a healthy crop, but it makes “They died within a week” unsuitable as settled fact. The paper also reports almost nine days of initial payload operation. [Xie et al., *Acta Astronautica*, January 2024, published online in 2023](https://www.sciencedirect.com/science/article/pii/S0094576523005301).

Suggested replacement:

> In January 2019 a cotton seed sprouted inside a sealed biological experiment aboard Chang'e-4, using a growing medium carried from Earth. The experiment team later reported that the seedling still appeared upright and green after the first lunar night, despite an internal temperature as low as −52 °C. This was a small biological experiment, not a demonstration of food production.

Use the team's paper as the reference instead of the Guinness summary. Its indexed abstract was accessible during this review; direct full-page retrieval was blocked by the publisher.

### 2. Eclipse: the quoted shadow sizes are radii, not widths

**README lines 151 and 155.** Recalculating the stated geometry—4.0 cm source radius, 3.28 cm Moon radius, 70 cm source-to-Moon distance, 103 cm source-to-globe-center distance, and 12 cm globe radius—gives approximately:

| Shadow on a centered globe | Radius | Diameter |
| --- | ---: | ---: |
| Umbra | 3.06 cm | 6.12 cm |
| Outer penumbra | 5.61 cm | 11.22 cm |

These are straight-cone intersections with the near surface of a centered spherical globe; the exact footprint changes with the toy Moon's position. The README's “3.0 cm and 5.6 cm across” is a factor-of-two error. Its later statement that the full shadow is roughly a quarter of the globe is consistent with a **6 cm diameter** on a 24 cm globe.

Replace the size phrase with:

> roughly 3.0 cm and 5.6 cm in radius on the globe—about 6 cm and 11 cm across.

The 0.273 Moon/globe size ratio and approximately 7.2 m scale Earth–Moon separation are correct. The width of a real umbral footprint varies with eclipse geometry and position on Earth; “about 1%” should be presented as an illustration rather than a universal value. [NASA Moon Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html), [NASA eclipse geometry](https://eclipse.gsfc.nasa.gov/SEhelp/SEgeometry.html).

Also simplify “a little larger than the Moon, as the Sun is” to **“larger than the toy Moon.”** The real Sun is roughly 400 times the Moon's diameter; the torch preserves the narrowing-shadow principle, not that size ratio. [NASA Sun Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html).

### 3. ESA's 1.5 tonne printing demonstration used simulant and binders on Earth

**README line 31.** The habitat design and block are real. However, readers could reasonably understand the present wording to mean the block was printed from actual lunar material. ESA describes a terrestrial experiment using simulated regolith, magnesium oxide and a binding salt. The proposed lunar habitat was a design study. [ESA, 31 January 2013](https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Building_a_lunar_base_with_3D_printing).

Suggested replacement:

> ESA and Foster + Partners studied a protective dome over a pressurised inflatable, with cellular walls intended to shield against micrometeoroids and radiation. The team printed a 1.5 tonne demonstration block on Earth from regolith simulant with added binders.

The ICON award's **$57.2 million** value and its inclusion of landing pads, habitats and roads are accurate. The cited award runs through 2028; it supports technology development, not an already demonstrated lunar construction system. [NASA's ICON award announcement](https://www.nasa.gov/centers-and-facilities/marshall/nasa-icon-advance-lunar-construction-technology-for-moon-missions/).

### 4. The Wolf Amendment needs the multilateral qualification

**README line 159.** The restriction on NASA's bilateral cooperation with Chinese entities is real, but the paragraph uses it to explain a fictional **multilateral** base. NASA's own guidance says multilateral activities involving additional countries are generally permitted. That does not establish that this particular base would be authorized; it does mean the bilateral restriction alone is not an explanation of why an international base cannot happen. The restriction also should not be described as a ban on working with Chinese people based on nationality. [NASA's PRC FAQ, especially questions 3–5](https://science.nasa.gov/researchers/sara/faqs/prc-faq-roses/).

Suggested replacement:

> The film imagines all space programmes building one base together. Today's NASA-led and China-led lunar initiatives are separate. Since 2011 US funding restrictions have limited NASA's bilateral cooperation with Chinese entities; NASA's guidance generally permits multilateral activities. The film's unified programme is an imagined political arrangement.

### 5. Shackleton radio astronomy has a real research precedent

**README lines 90 and 166.** LuSEE-Night's far-side location is accurately described. However, “Real plans for this science go to the far side” overlooks **RadioLuna**, a published proposal for an array of penetrators on Shackleton's floor. It targets frequencies below 2 MHz and is not the film's four 100 m dipoles or evidence of an operational telescope. [Eubanks and Blase, RadioLuna, 2021](https://arxiv.org/abs/2103.16957).

Suggested replacement for the liberty:

> The radio array lies on Shackleton's floor, with the crater walls blocking direct views of the Sun and Earth. Far-side missions such as LuSEE-Night seek a quiet radio environment, but research proposals such as RadioLuna have also considered Shackleton. The film's antenna layout, bandwidth and observing performance are invented.

Keep the distinction between **optical screening** and **quantified radio attenuation**. Radio waves diffract, and attenuation depends on frequency, geometry and material properties. The sources do not establish the film's “quietest sky” claim for this exact site and equipment; local base electronics would also need consideration. This is an engineering inference, not a finding that a Shackleton telescope is impossible. [Bassett et al., simulations of lunar radio shielding](https://arxiv.org/html/2003.03468).

### 6. Keep the LR-1 results; remove the unsupported “best public test” ranking

**README lines 53 and 165.** NASA's 2026 report supports the late-2024 test, 25 kg batch, nine hours of electrolysis, and average **0.07 kg O₂/h**. The film's 1 kg/h is **14.29 times that reported rate**. The source does not establish a comprehensive world record across public tests. Also distinguish nine hours of electrolysis from the entire period the material remained hot. [Toro Medina et al., NASA NTRS, 2026](https://ntrs.nasa.gov/citations/20260006167), [presentation, especially slides 13 and 15](https://ntrs.nasa.gov/api/citations/20260006167/downloads/MRE%20GCD%20ICES26_v3.pdf).

Suggested replacement:

> A publicly documented vacuum demonstration is much smaller. In late 2024 NASA Kennedy and Lunar Resources tested LR-1 with 25 kg of regolith simulant and sustained electrolysis for nine hours, reporting an average oxygen production rate of 0.07 kg/h. The film imagines roughly fourteen times that rate, sustained through a year of operation.

In the liberties list, replace “what the best public test has” with “the rate reported for that LR-1 test.”

### 7. LCROSS is a local abundance estimate, not the only measurement of lunar ice

**README line 65.** The **5.6 ± 2.9%** number is correct. It was inferred from the impact plume and estimated excavated mass at Cabeus. The uncertainty is not a measured range of concentrations throughout the south pole, nor an abundance measurement at Shackleton. The broad phrase “The one measurement” should be narrowed. [Colaprete et al., *Science*, 2010](https://experts.arizona.edu/en/publications/detection-of-water-in-the-lcross-ejecta-plume/).

Suggested replacement:

> LCROSS's 2009 impact into Cabeus produced a local estimate of 5.6 ± 2.9% water by mass, inferred from its ejecta plume. The film's 3.1 wt% is an invented reading numerically within that uncertainty interval; it is not a measurement at the film's site.

### 8. Update the Apollo 12 comparison to acknowledge modern plume observations

**README line 33.** Apollo 12 and the returned Surveyor III hardware remain a valuable case for studying ejecta effects on nearby equipment. Calling this “still the main real-world test of how that ejecta behaves” is too broad. NASA's SCALPSS cameras recorded more than 3,000 images of plume–surface interaction during Blue Ghost's March 2025 landing. These observations address a different part of the problem, so they do not erase the value of the Apollo case. [NASA's SCALPSS results announcement](https://www.nasa.gov/general/nasa-cameras-on-blue-ghost-capture-first-of-its-kind-moon-landing-footage/).

Suggested replacement:

> Apollo 12's landing near Surveyor III provided an important case study of ejecta damage to nearby hardware. Modern missions, including Blue Ghost's SCALPSS experiment in 2025, have added direct observations of plume–surface interaction. The film's 2 km separation is a design choice, not a validated safe distance for its fictional lander.

## Smaller qualifications and source improvements

| README location | Finding and recommended adjustment |
| --- | --- |
| Lines 18 and 24: illumination and Sun height | The **92.3% at 2 m / 95.66% at 10 m** figures are accurately quoted from selected locations in a **19-year simulation**. Add that time span. The 29.53-day rotation and approximately 12.19°/day mean rate are sound. Label the renderer's constant **1.2° elevation** as a simplification; actual elevation varies with date and exact site. NASA's approximately ±1.5° description belongs to its particular polar visualization. [Gläser et al.](https://elib.dlr.de/94242/), [NASA SVS](https://svs.gsfc.nasa.gov/4944). |
| Line 18: darkness and 25 K | Say **“nearby permanently shadowed regions”**, rather than implying every nearby crater floor receives no Sun. The linked Diviner overview does not substantiate 25 K at this particular location. NASA associates the familiar 25 K minimum with **Hermite at the north pole**. “Temperatures of only tens of kelvin” is safer here unless a specific southern measurement is supplied. [NASA LRO educator resource kit](https://science.nasa.gov/wp-content/uploads/2024/01/lro-educator-resource-kit.pdf). |
| Line 20: real base programmes | NASA's current page does show **2032 and beyond** for assembling a permanent southern outpost, and the cited CNSA announcement gives a **2035** basic ILRS model. These dates are plans, not demonstrated capabilities or commitments to the film's exact ridge. Change “Both real programmes point here” to **“Both programmes target the south polar region.”** [NASA](https://www.nasa.gov/moonbase-phases/), [CNSA announcement via the State Council](https://english.www.gov.cn/news/202504/24/content_WS680976d7c6d0868f4e8f2045.html). |
| Line 34: pre-critical reactor | The 2025 **100 kWe / closed Brayton cycle / early FY2030** description matches NASA's request. Clarify that the engineer is present **before the reactor's first power operation**. A reactor that has previously operated can remain radioactive after shutdown; being subcritical is not itself proof that close approach is safe. The scene's first-start interpretation is reasonable. [NASA's request](https://www.nasa.gov/centers-and-facilities/glenn/nasa-seeks-industry-feedback-on-fission-surface-power/), [NASA nuclear safety report, section 3.2.1](https://ntrs.nasa.gov/api/citations/19930017011/downloads/19930017011.pdf). |
| Line 36: laser landing pad | The ICON citation supports developing pads, but does not document this laser process, 50 m diameter or construction rate. Add **ESA's PAVER experiment**, which melted simulant using a 12 kW laser on Earth. Its lunar concept used concentrated sunlight. The film's rover and schedule remain extrapolations; **“laser-fused”** also describes a glassy melted surface more clearly than “sintered.” [ESA PAVER](https://www.esa.int/ESA_Multimedia/Videos/2023/10/One_small_step_on_the_way_to_lunar_roads). |
| Lines 45 and 51: electrolysis products and efficiency | Prefer **“an iron–silicon alloy”** over implying separate pure-metal products; silicon is conventionally classed as a metalloid. The current calculation is correct: 3.6 kA requires about **93% current efficiency** at the stated output. Say that explicitly, and distinguish current efficiency from overall energy efficiency. [NASA MRE study](https://ntrs.nasa.gov/api/citations/20250004626/downloads/MRE_paper_revision_clean.pdf). |
| Line 55: oxygen allocation | The allocation is plausible, but a total lander fuel budget is not shown. At 1 kg/h the plant makes **24 kg/day**; eight people at a representative **0.84 kg/person/day** consume about **6.7 kg/day** before considering oxygen recycling, EVA use or losses. Describe the remaining oxygen as **intended for oxidizer**, not proof that this plant can fuel the complete return architecture. [NASA lunar life-support analysis](https://ntrs.nasa.gov/api/citations/20190027610/downloads/20190027610.pdf). |
| Lines 61 and 63: drilling | TRIDENT's **1 m drill and 10 cm bites** are correct. Its usual **100 N** value is a force limit, not an invariant requirement. A 70 kg lunar rover weighs **113.4 N**. Bracing improves support, but a real separate frame still needs sufficient mass or anchorage to react drilling forces. Also say **“during a mission lasting about ten hours”**; the paper describes the actuator checkout itself as approximately **20 minutes**. [Zacny et al., pages 2 and 10](https://icedrill.org/sites/default/files/Zacny_2025_TRIDENT%20Ice%20Mining%20Drill%20for%20Lunar%20Volatile%20Prospecting%20for%20PRIME-1%20and%20VIPER%20Missions.pdf). |
| Lines 67–76: growing food | Rename the section **“Growing plants”**. *Arabidopsis* is a research model, and this scene does not show a food crop. The Apollo experiment's description is substantially correct, but add **“with supplied water and nutrients”** so it does not suggest regolith alone is fertile soil. The paper used about 0.9 g per well and found near-100% germination followed by stress. [Paul, Elardo and Ferl, 2022](https://www.nature.com/articles/s42003-022-03334-8). |
| Line 78: Moon Tree seed count | The linked NASA page says **possibly 2,000 or more**, while other NASA histories give **400–500**. This is a genuine source disagreement, not a fabricated citation. Use **“hundreds of tree seeds”** and omit the disputed count. [The cited NASA page](https://nssdc.gsfc.nasa.gov/planetary/lunar/moon_tree.html), [NASA history giving 400–500](https://www.nasa.gov/history/celebrating-moon-trees-on-arbor-day/). |
| Lines 162–163: shielding and construction schedule | **“A real base would be buried”** is too universal; regolith shielding is one proposed solution. The film's 2.5 m printed shells and cupola shutters have no accompanying dose calculation. Likewise, **640 robotic days plus 97 crewed days** is a fictional schedule, not a validated construction estimate. Say the film **assumes** this much preparation, rather than declaring that it makes the schedule believable. [ESA's shielding concept](https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Building_a_lunar_base_with_3D_printing). |

Two source links also merit updating: the MIT handle failed in this review, while its [current publication page](https://dspace.mit.edu/entities/publication/be50a699-718a-447f-b6ed-c15ec7f417ba) worked; the short Linda Hall URL failed, while the [current Kondratyuk article](https://www.lindahall.org/about/news/scientist-of-the-day/yuri-kondratyuk/) worked. These retrieval failures do not establish that the old links fail for every reader.

## Claims that checked out

- **Vertical solar arrays:** the NASA reference design specifies at least 10 kW and a bottom edge at least 10 m above the surface. NASA confirms Honeybee and Astrobotic thermal-vacuum testing in summer 2024. [Reference design](https://ntrs.nasa.gov/api/citations/20240004914/downloads/VSAT%20Mechanisms%20Abstract%2020240418.pdf), [NASA test account](https://www.nasa.gov/centers-and-facilities/johnson/from-houston-to-the-moon-johnsons-thermal-vacuum-chamber-tests-lunar-solar-technology/).
- **The mast-shadow calculation:** `20 / tan(1.2°) = 954.79 m`, consistent with the rounded 950 m description on level ground. This is a geometric calculation, not a topographic prediction.
- **MRE temperature and model:** approximately 1,600 °C is supported. Schreiner's 2015 thesis explicitly predicts a 1,593 kg, 56.5 kW system producing 10,000 kg oxygen/year; dividing by 8,760 hours gives 1.1416 kg/h. This is modeled performance. [NASA's earlier laboratory work](https://ntrs.nasa.gov/citations/20110008524), [MIT thesis record](https://dspace.mit.edu/entities/publication/be50a699-718a-447f-b6ed-c15ec7f417ba).
- **Electrolysis arithmetic:** `I = 4 F × (1,000 g / 31.9988 g/mol) / 3,600 s = 3,350.31 A`. At 3,600 A, the required current efficiency is 93.06%.
- **PRIME-1:** March 2025 arrival, the tipped lander and deployment without drilling into the surface are supported. The scene correctly goes beyond that result. [NASA's mission account](https://www.nasa.gov/missions/artemis/nasas-lunar-drill-technology-passes-tests-on-the-moon/).
- **Lunar gravity and mean communication delay:** 1.62 m/s² and approximately 1.28 s one way / 2.56 s round trip are sound. The extra time in `RTT 3.1 s` is appropriately identified as an assumed operational allowance. [NASA lunar facts](https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html).
- **Training:** 12.2 m pool depth, up to 22 s of zero-g flight, and the 2024 Iceland training / 1965 and 1967 Apollo precedents are supported. The README already identifies 8 g and 03:00 as fictional captions. [NASA NBL](https://www.nasa.gov/johnson/neutral-buoyancy-laboratory/), [ESA parabolic flight](https://www.esa.int/ESA_Multimedia/Images/2025/11/Flying_for_the_Moon), [Canadian Space Agency](https://www.asc-csa.gc.ca/eng/news/articles/2024/2024-08-22-artemis-ii-crew-refines-lunar-geology-skills-in-iceland.asp).
- **Mengzhou:** the no-fairing layout, February 2026 maximum-dynamic-pressure escape test, three main parachutes, and airbag ground landing have support. They are precedents for the fictional hybrid, not validation of its exact launch loads and flight timeline. [CCTV's explanation of the fairing change](https://news.cri.cn/20260212/48d3e5cc-1a58-47e3-9389-9db4379675bb.html), [February test report](https://www.news.cn/tech/20260212/953c9239a6844c1990c5514942bc0919/c.html), [parachute and airbag report](https://www.stdaily.com/web/gdxw/2025-06/18/content_356522.html).
- **Historical allusions:** JPL supports the scripted Curiosity landing calls. The working Linda Hall article supports Kondratyuk's 1929 book, his lunar-orbit rendezvous proposal, and the author's lack of evidence for a direct influence on Apollo planners. To avoid an unnecessary historical-priority claim, “an early pioneer who wrote the idea down” is safer than “the man who wrote it down first.” [JPL](https://www.jpl.nasa.gov/news/first-words-of-safe-landing-on-mars-tango-delta-nominal/), [Linda Hall](https://www.lindahall.org/about/news/scientist-of-the-day/yuri-kondratyuk/).
- **The poetry note:** the cited article does describe the Song-edition 山月 reading and the later Ming/Qing anthology changes. “Surviving Song editions” is more precise than “the oldest editions.” [Guangming Daily article](https://www.chinawriter.com.cn/n1/2024/0415/c442005-40216203.html).

## Independent Earth-view verification

Fresh queries to the [JPL Horizons API](https://ssd-api.jpl.nasa.gov/doc/horizons.html) reproduced every numerical value in the README's Earth-view table to its stated precision:

| Date (UT) | Earth lit | Center elevation | Angular diameter | Sub-observer latitude | Sub-observer east longitude |
| --- | ---: | ---: | ---: | ---: | ---: |
| 2037-Sep-10 02:30 | 99.70860% | +4.761027° | 2.046954° | +6.584542° | 147.738649° |
| 2038-Aug-30 08:00 | 99.86694% | +4.907833° | 1.983145° | +13.166175° | 60.508688° |
| 2037-Sep-24 12:00 | 0.17729% | −6.675377° | 1.797719° | −3.649123° | 180.104367° |

Settings: Earth target `399`; observer `coord@301`; geodetic site `222.8,-89.45,1.5` (east longitude, latitude, altitude in km); observer ephemeris; airless apparent positions; quantities `4,10,13,14,17,20,24`; CSV output. Query each listed time with a one-minute end interval. Horizons used DE441 for the Earth and Moon. Angular diameters returned in arcseconds were divided by 3,600.

The elevations are relative to Horizons' reference horizon, not a surveyed local terrain skyline. The table validates the stated astronomical geometry; it does not independently verify the painted terrain or every rendered frame. The opposite Earth/Moon phases and the admission that the full-Moon homes and full-Earth base shots cannot be simultaneous are scientifically sound.
