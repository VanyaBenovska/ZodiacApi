export const zodiacDirBg_urlPart1 = `https://zodiac.dir.bg/sign/`;
export const zodiacDirBg_urlPart2 = `/dneven-horoskop`;

// const DEFAULT_VALUE = {
//   text: "",
//   date: "",
// };

const DEFAULT_VALUE = {
  text: "",
  date: "",
};
const SIGNS_VALUES = {
  oven: DEFAULT_VALUE,
  telets: DEFAULT_VALUE,
  bliznatsi: DEFAULT_VALUE,
  rak: DEFAULT_VALUE,
};

const DEFAULT_DATE = new Date("01 January 2019");

// sign, dateTheInfoIsGet, dateShortString, signText
type signInformation = [string, Date, string];
type allsignInformation = [signInformation];

// // https://zodiac.dir.bg
// export const SIGNS_ZODIACDIRBG: [signInformation] = [
//   { sign: "oven", date: DEFAULT_DATE, text: "" },
//   { sign: "telets", date: DEFAULT_DATE, text1: "" },
//   { sign: "bliznatsi", date: DEFAULT_DATE, text: "" },
//   { sign: "rak", date: DEFAULT_DATE, text: "" },
//   { sign: "lav", date: DEFAULT_DATE, text: "" },
//   { sign: "deva", date: DEFAULT_DATE, text: "" },
//   { sign: "vezni", date: DEFAULT_DATE, text: "" },
//   { sign: "skorpion", date: DEFAULT_DATE, text: "" },
//   { sign: "strelets", date: DEFAULT_DATE, text: "" },
//   { sign: "kozirog", date: DEFAULT_DATE, text: "" },
//   { sign: "vodoley", date: DEFAULT_DATE, text: "" },
//   { sign: "ribi", date: DEFAULT_DATE, text: "" },
// ];

// https://zodiac.dir.bg
export const numbersSignsBG_zodiacDirBg: { id: number; name: string }[] = [
  { id: 1, name: "oven" },
  { id: 2, name: "telets" },
  { id: 3, name: "bliznatsi" },
  { id: 4, name: "rak" },
  { id: 5, name: "lav" },
  { id: 6, name: "deva" },
  { id: 7, name: "vezni" },
  { id: 8, name: "skorpion" },
  { id: 9, name: "strelets" },
  { id: 10, name: "kozirog" },
  { id: 11, name: "vodoley" },
  { id: 12, name: "ribi" },
];

// https://zodiac.dir.bg
export enum SignsBG {
  "oven" = 1,
  "telets",
  "bliznatsi",
  "rak",
  "lav",
  "deva",
  "vezni",
  "skorpion",
  "strelets",
  "kozirog",
  "vodoley",
  "ribi",
}

// https://zodiac.dir.bg
export const SignsBGcollection = [
  "oven",
  "telets",
  "bliznatsi",
  "rak",
  "lav",
  "deva",
  "vezni",
  "skorpion",
  "strelets",
  "kozirog",
  "vodoley",
  "ribi",
];

export const SignsENcollection = [
  "aries",
  "taurus",
  "twins",
  "crab",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "fish",
];

export const SignsENtoNumbers = {
  unknown: 0,
  aries: 1,
  taurus: 2,
  twins: 3,
  crab: 4,
  leo: 5,
  virgo: 6,
  libra: 7,
  scorpio: 8,
  sagittarius: 9,
  capricorn: 10,
  aquarius: 11,
  fish: 12,
};

export const SignsEnumNumbersToEN = {
  1: "aries",
  2: "taurus",
  3: "twins",
  4: "crab",
  5: "leo",
  6: "virgo",
  7: "libra",
  8: "scorpio",
  9: "sagittarius",
  10: "capricorn",
  11: "aquarius",
  12: "fish",
};

// https://zodiac.dir.bg
export const numbersToSignsBG = new Map<number, string>([
  [1, "oven"],
  [2, "telets"],
  [3, "bliznatsi"],
  [4, "rak"],
  [5, "lav"],
  [6, "deva"],
  [7, "vezni"],
  [8, "skorpion"],
  [9, "strelets"],
  [10, "kozirog"],
  [11, "vodoley"],
  [12, "ribi"],
]);

// https://zodiac.dir.bg
export const numbersSignsBGobj = new Map<number, string>([
  [1, "oven"],
  [2, "telets"],
  [3, "bliznatsi"],
  [4, "rak"],
  [5, "lav"],
  [6, "deva"],
  [7, "vezni"],
  [8, "skorpion"],
  [9, "strelets"],
  [10, "kozirog"],
  [11, "vodoley"],
  [12, "ribi"],
]);

// We use Object.entries() on the target object to make the object enumerable, and thus usable by the for…of loop. We deconstruct each item to expose variables “key” and “value”
// for(const [key, searchEngineUrl] of Object.entries(obj)) {
//     if(!value) {
//       console.log(`Skipping ${key}`);
//       continue;
//     }
//     const results = await getSearchEngineResults(searchEngineUrl);
//     if(results) {
//       break;
//     }
//   }

// export const SignsBGtoSignsEN = {
//   unknown: unknown,
//   oven: aries,
//   telets: taurus,
//   bliznatsi: twins,
//   rak: crab,
//   lav: leo,
//   deva: virgo,
//   vezni: libra,
//   skorpion: scorpio,
//   strelets: sagittarius,
//   kozirog: capricorn,
//   vodoley: aquarius,
//   ribi: fish,
// };

// export const SignsENtoSignsBG = {
//   unknown: unknown,
//   aries: oven,
//   taurus: telets,
//   twins: bliznatsi,
//   crab: rak,
//   leo: lav,
//   virgo: deva,
//   libra: vezni,
//   scorpio: skorpion,
//   sagittarius: strelets,
//   capricorn: kozirog,
//   aquarius: vodoley,
//   fish: ribi,
// };
