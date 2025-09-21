import suiteA from './assets/room1.png';
import suiteB from './assets/room2.png';
import gardenView from './assets/rooftop.png';
import oasisTriple from './assets/outside-restau.png';

export const SUITES = [
  { id: 1, name: "Family Suite A", pax: 4, size: 22, rate: 600, img: suiteA,      alt: "Family Suite A — 22 m², up to 4 guests" },
  { id: 2, name: "Family Suite B", pax: 4, size: 22, rate: 600, img: suiteB,      alt: "Family Suite B — 22 m², up to 4 guests" },
  { id: 4, name: "Garden View Room", pax: 2, size: 18, rate: 550, img: gardenView, alt: "Garden View Room — 18 m², palm orchard view" },
  { id: 5, name: "Oasis Triple",     pax: 3, size: 19, rate: 570, img: oasisTriple, alt: "Oasis Triple — 19 m², up to 3 guests" },
];
