export const zodiacDirBg_urlPart1 = `https://zodiac.dir.bg/sign/`;
export const zodiacDirBg_urlPart2 = `/dneven-horoskop`;

// https://zodiac.dir.bg
export const SignsBG = [
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

export const SignsEN = [
  "unknown",
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
