/**
 * Return string from Date: ddMMyyyy
 *
 * 👉️ toLocaleDateString() returns:
 * 👉️ 24/02/2023
 * 👉️ 03/03/1923
 * 👉️ Month's index begins from 0!
 */
export function getDocumentNameByDate(): string {
  const dateToday = new Date();
  const day = dateToday.getUTCDate().toString().padStart(2, "0");
  const month = (dateToday.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = dateToday.getUTCFullYear().toString().padStart(4, "0");
  return `${day}${month}${year}`;
}

/**
 * Return unique-ish number, then 1972, UTC, GMT, "Z time" "Zulu time"
 */
export function getIdByUTC(): number {
  return new Date().getUTCMilliseconds();
}

/**
 * Return unique-ish number, then 1972, UTC, GMT, "Z time" "Zulu time"
 */
export function getId(): number {
  return new Date().getUTCMilliseconds();
}
