export function datasort(a, b) {
  const c = new Date(a.createdAt).getTime();
  const d = new Date(b.createdAt).getTime();
  return c - d;
}

const MONTH_NAME = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export function getDateFromMessage(d) {
  const trueData = new Date(d);

  const date = trueData.getDate();
  const month = MONTH_NAME[trueData.getMonth()];

  const hour = trueData.getHours() + 1;
  let x = trueData.getMinutes();
  const mins = x > 9 ? x : `0${x}`;

  return `(${month} ${date}) at ${hour}:${mins}`;
}
