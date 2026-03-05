import * as strings from '../strings';
import { TEXT } from '../../Cortex';
import {
  filterViews,
  colorTable,
  ImageRowStyle,
  ImageTableStyle,
} from './styling';

import round from './components/pics/round.png';
import pricess from './components/pics/princess.png';
import cushion from './components/pics/cushion.png';
import pear from './components/pics/pear.png';
import emerald from './components/pics/emerald.png';
import radiant from './components/pics/radiant.png';
import oval from './components/pics/oval.png';
import heart from './components/pics/heart.png';
import asscher from './components/pics/asscher.png';
import marquise from './components/pics/marquise.png';

import sapphire from './components/pics/sapphire.png';
import emeraldGem from './components/pics/emeraldGem.png';
import ruby from './components/pics/ruby.png';

import rings from './components/pics/rings.png';
import earrings from './components/pics/earrings.png';
import necklace from './components/pics/necklace.png';
import bracelet from './components/pics/bracelet.png';

export const scrollableButtons = [
  { key: 0, text: TEXT.excellent, isChosen: 0, flex: 1.5 },
  { key: 1, text: TEXT.veryGood, isChosen: 0, flex: 1.5 },
  { key: 2, text: TEXT.good, isChosen: 0, flex: 1 },
  { key: 3, text: TEXT.fair, isChosen: 0, flex: 1 },
  { key: 4, text: TEXT.poor, isChosen: 0, flex: 1 },
];

const buttons = [
  { key: 0, text: TEXT.excellent, isChosen: 0, flex: 1.5 },
  { key: 1, text: TEXT.veryGood, isChosen: 0, flex: 1.5 },
  { key: 2, text: TEXT.good, isChosen: 0, flex: 1 },
  { key: 3, text: TEXT.fair, isChosen: 0, flex: 1 },
  { key: 4, text: TEXT.poor, isChosen: 0, flex: 1 },
];

const clarity = {
  name: TEXT.clarity.toUpperCase(),
  stateName: strings.clarityState,
  stringArr: [
    strings.fl,
    strings._if,
    strings.vvs1,
    strings.vvs2,
    strings.vs1,
    strings.vs2,
    strings.si1,
    strings.si2,
    strings.si3,
    strings.i1,
    strings.i2,
  ],
  scrollViewStyle: filterViews.scrollViewStyle,
  scrollEnabled: true,
  isRange: true,
  range: [-1, -1],
  showClearButton: 0,
  buttons: [
    { key: 0, text: strings.fl, isChosen: 0 },
    { key: 1, text: strings._if, isChosen: 0 },
    { key: 2, text: strings.vvs1, isChosen: 0 },
    { key: 3, text: strings.vvs2, isChosen: 0 },
    { key: 4, text: strings.vs1, isChosen: 0 },
    { key: 5, text: strings.vs2, isChosen: 0 },
    { key: 6, text: strings.si1, isChosen: 0 },
    { key: 7, text: strings.si2, isChosen: 0 },
    { key: 8, text: strings.si3, isChosen: 0 },
    { key: 9, text: strings.i1, isChosen: 0 },
    { key: 10, text: strings.i2, isChosen: 0 },
  ],
};

const labObj = (key, text) => ({ key, text, isChosen: 0 });

const gemLabs = [
  labObj(0, TEXT.grs),
  labObj(1, TEXT.gubelin),
  labObj(2, TEXT.ssef),
  labObj(3, TEXT.none),
  labObj(4, TEXT.other),
];

const diamondLabs = [
  labObj(0, TEXT.gia),
  labObj(1, TEXT.hrd),
  labObj(2, TEXT.igi),
  labObj(3, TEXT.egl),
  labObj(4, TEXT.none),
  labObj(5, TEXT.other),
];

const lab = (labButtons, labArr) => ({
  name: TEXT.lab.toUpperCase(),
  stateName: strings.labState,
  stringArr: labArr,
  scrollViewStyle: filterViews.rowViewStyle,
  scrollEnabled: false,
  isRange: false,
  showClearButton: 0,
  buttons: labButtons,
});

export const gemFilterObjects = [
  { ...clarity },
  { ...lab(gemLabs, strings.labArrGem) },
];

export const jeweltyFilterObjects = [
  { ...clarity },
  { ...lab(diamondLabs, strings.labArrDiamond) },
];

{
  /* <FilterButton
  key={button.key}
  text={button.text}
  isChosen={buttonStyles[button.isChosen]}
  textStyle={textStyles[button.isChosen]}
  flex={button.flex}
  onPress={() => this.clickButton(button.key)}
/>; */
}

export const filterObjects = [
  { ...clarity },
  { ...lab(diamondLabs, strings.labArrDiamond) },
  {
    name: TEXT.cut.toUpperCase(),
    stateName: strings.cutState,
    stringArr: strings.states,
    scrollViewStyle: filterViews.rowViewStyle,
    scrollEnabled: false,
    isRange: true,
    range: [-1, -1],
    showClearButton: 0,
    buttons: buttons,
  },
  {
    name: TEXT.polish.toUpperCase(),
    stateName: strings.polishState,
    stringArr: strings.states,
    scrollViewStyle: filterViews.rowViewStyle,
    scrollEnabled: false,
    isRange: true,
    range: [-1, -1],
    showClearButton: 0,
    buttons: buttons,
  },
  {
    name: TEXT.symmetry.toUpperCase(),
    stateName: strings.symmetryState,
    stringArr: strings.states,
    scrollViewStyle: filterViews.rowViewStyle,
    scrollEnabled: false,
    isRange: true,
    range: [-1, -1],
    showClearButton: 0,
    buttons: buttons,
  },
  {
    name: TEXT.fluor.toUpperCase(),
    stateName: strings.fluorescenseState,
    stringArr: [
      strings.none,
      strings.verySlight,
      strings.faintSlight,
      strings.medium,
      strings.strong,
      strings.veryStrong,
    ],
    scrollViewStyle: filterViews.scrollViewStyle,
    scrollEnabled: true,
    isRange: true,
    range: [-1, -1],
    showClearButton: 0,
    buttons: [
      { key: 0, text: TEXT.none, isChosen: 0, flex: 1 },
      { key: 1, text: TEXT.verySlight, isChosen: 0, flex: 1.5 },
      { key: 2, text: TEXT.faintSlight, isChosen: 0, flex: 1.5 },
      { key: 3, text: TEXT.medium, isChosen: 0, flex: 1.2 },
      { key: 4, text: TEXT.strong, isChosen: 0, flex: 1.1 },
      { key: 5, text: TEXT.veryStrong, isChosen: 0, flex: 1.5 },
    ],
  },
];

export const whiteColors = {
  name: TEXT.color.toUpperCase(),
  stateName: strings.whiteColorArr,
  stringArr: strings.whites,
  scrollViewStyle: colorTable.scrollViewStyle,
  scrollEnabled: true,
  isRange: true,
  range: [-1, -1],
  showClearButton: 0,
  buttons: [
    { key: 0, text: strings.whites[0], isChosen: 0 },
    { key: 1, text: strings.whites[1], isChosen: 0 },
    { key: 2, text: strings.whites[2], isChosen: 0 },
    { key: 3, text: strings.whites[3], isChosen: 0 },
    { key: 4, text: strings.whites[4], isChosen: 0 },
    { key: 5, text: strings.whites[5], isChosen: 0 },
    { key: 6, text: strings.whites[6], isChosen: 0 },
    { key: 7, text: strings.whites[7], isChosen: 0 },
    { key: 8, text: strings.whites[8], isChosen: 0 },
    { key: 9, text: strings.whites[9], isChosen: 0 },
    { key: 10, text: strings.whites[10], isChosen: 0 },
    { key: 11, text: strings.whites[11], isChosen: 0 },
    { key: 12, text: strings.whites[12], isChosen: 0 },
    { key: 13, text: strings.whites[13], isChosen: 0 },
    { key: 14, text: strings.whites[14], isChosen: 0 },
    { key: 15, text: strings.whites[15], isChosen: 0 },
    { key: 16, text: strings.whites[16], isChosen: 0 },
  ],
};

export const intensities = {
  stringArr: strings.intensities,
  scrollViewStyle: colorTable.fancyScrollView,
  scrollEnabled: true,
  isRange: false,
  buttons: [
    { key: 0, text: TEXT.faint, isChosen: 0, flex: 0 },
    { key: 1, text: TEXT.veryLight, isChosen: 0, flex: 1.5 },
    { key: 2, text: TEXT.light, isChosen: 0, flex: 0 },
    { key: 3, text: TEXT.fancyLight, isChosen: 0, flex: 1.5 },
    { key: 4, text: TEXT.fancy, isChosen: 0, flex: 0 },
    { key: 5, text: TEXT.fancyDark, isChosen: 0, flex: 1.5 },
    { key: 6, text: TEXT.fancyIntense, isChosen: 0, flex: 1.5 },
    { key: 7, text: TEXT.fancyVivid, isChosen: 0, flex: 1.5 },
    { key: 8, text: TEXT.fancyDeep, isChosen: 0, flex: 1.5 },
  ],
};

export const colors = {
  name: TEXT.color.toUpperCase(),
  stringArr: strings.fancyCols,
  scrollViewStyle: colorTable.rowStyle,
  scrollEnabled: false,
  isRange: false,
  firstRow: [
    { key: 0, text: TEXT.yellow, isChosen: 0, flex: 0 },
    { key: 1, text: TEXT.pink, isChosen: 0, flex: 0 },
    { key: 2, text: TEXT.blue, isChosen: 0, flex: 0 },
    { key: 3, text: TEXT.red, isChosen: 0, flex: 0 },
    { key: 4, text: TEXT.green, isChosen: 0, flex: 0 },
  ],
  secondRow: [
    { key: 0, text: TEXT.purple, isChosen: 0, flex: 0, row2: 5 },
    { key: 1, text: TEXT.orange, isChosen: 0, flex: 0, row2: 6 },
    { key: 2, text: TEXT.gray, isChosen: 0, flex: 0, row2: 8 },
    { key: 3, text: TEXT.black, isChosen: 0, flex: 0, row2: 9 },
    { key: 4, text: TEXT.brown, isChosen: 0, flex: 0, row2: 10 },
  ],
};

export const imageTableObj = {
  name: TEXT.Shape.toUpperCase(),
  stateName: strings.shapeState,
  stringArr: [
    strings.ShapeRound,
    strings.ShapePrincess,
    strings.ShapeCushion,
    strings.ShapePear,
    strings.ShapeEmerald,
    strings.ShapeRadiant,
    strings.ShapeOval,
    strings.ShapeHeart,
    strings.ShapeAsscher,
    strings.ShapeMarquise,
    strings.other,
  ],
  buttons: [
    { key: 0, text: TEXT.ShapeRound, isChosen: 0, image: round },
    { key: 1, text: TEXT.ShapePrincess, isChosen: 0, image: pricess },
    { key: 2, text: TEXT.ShapeCushion, isChosen: 0, image: cushion },
    { key: 3, text: TEXT.ShapePear, isChosen: 0, image: pear },
    { key: 4, text: TEXT.ShapeEmerald, isChosen: 0, image: emerald },
    { key: 5, text: TEXT.ShapeRadiant, isChosen: 0, image: radiant },
    { key: 6, text: TEXT.ShapeOval, isChosen: 0, image: oval },
    { key: 7, text: TEXT.ShapeHeart, isChosen: 0, image: heart },
    { key: 8, text: TEXT.ShapeAsscher, isChosen: 0, image: asscher },
    { key: 9, text: TEXT.ShapeMarquise, isChosen: 0, image: marquise },
  ],
  other: { key: 10, text: TEXT.other, isChosen: 0 },
  style: ImageTableStyle.innerViewStyle,
};

export const gemTypeTableObj = {
  name: TEXT.gemTypeDisplay.toUpperCase(),
  stateName: strings.gemType,
  stringArr: [
    strings.sapphire,
    strings.emeraldGem,
    strings.ruby,
    strings.other,
  ],
  buttons: [
    { key: 0, text: TEXT.sapphire, isChosen: 0, image: sapphire },
    { key: 1, text: TEXT.emeraldGem, isChosen: 0, image: emeraldGem },
    { key: 2, text: TEXT.ruby, isChosen: 0, image: ruby },
    { key: 3, text: TEXT.other, isChosen: 0 },
  ],
  style: ImageRowStyle.innerViewStyle,
};

export const jewelryTypeTableObj = {
  name: TEXT.jewelryType.toUpperCase(),
  stateName: strings.jewelryType,
  stringArr: [
    strings.searchRing,
    strings.earrings,
    strings.searchNecklace,
    strings.searchBracelet,
    strings.searchPendant,
  ],
  buttons: [
    { key: 0, text: TEXT.rings, isChosen: 0, image: rings },
    { key: 1, text: TEXT.earrings, isChosen: 0, image: earrings },
    { key: 2, text: TEXT.necklace, isChosen: 0, image: necklace },
    { key: 3, text: TEXT.bracelet, isChosen: 0, image: bracelet },
  ],
  style: ImageRowStyle.innerViewStyle,
};
