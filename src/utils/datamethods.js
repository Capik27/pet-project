export function datasort(a, b) {
  const c = a.createdAt.toDate().getTime();
  //console.log("C", c);
  const d = b.createdAt.toDate().getTime();
  //console.log("D", d);
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
  //console.log("d", d.createdAt.toDate());
  const trueData = d.createdAt.toDate();
  //console.log("truedata", trueData);
  const date = trueData.getDate();
  const month = MONTH_NAME[trueData.getMonth()];

  const hour = trueData.getHours();
  let x = trueData.getMinutes();
  const mins = x > 9 ? x : `0${x}`;

  return `(${month} ${date}) at ${hour}:${mins}`;
}
// const trueData = d.createdAt.toDate();
//const DATAx = new Date(
//  formatInTimeZone(
//   d.createdAt.toDate(),
//   "Europe/Moscow",
//   "yyyy-MM-dd HH:mm:ss zzz"
// )
//);
