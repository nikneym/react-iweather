export const days: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday", // FIXME: we can solve it with a provided function too
];

const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function dateFormat(date: Date): string {
  const day = days[date.getDay()];
  const month = months[date.getMonth()];

  return `${day}, ${month} ${date.getDate()}, ${date.getFullYear()}`;
}
