export function getDateShortString(): string {
  const dateToday = new Date();
  const day = dateToday.getUTCDate().toString().padStart(2, "0");
  const month = (dateToday.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = dateToday.getUTCFullYear().toString().padStart(4, "0");
  return `${day}${month}${year}`;
}
