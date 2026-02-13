export default function getDayDifference(startDate: Date, endDate: Date): number {
  const oneDay = 1000 * 60 * 60 * 24; // milliseconds in one day
  const start = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const end = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  const timeDiffInMs = Math.abs(end - start);

  const dayDiff = Math.floor(timeDiffInMs / oneDay);
  return dayDiff;
}