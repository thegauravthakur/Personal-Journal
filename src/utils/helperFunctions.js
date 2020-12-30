const getCurrentMonth = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  return monthNames[d.getMonth()];
};

function english_ordinal_suffix(dt) {
  return (
    dt.getDate() +
    (dt.getDate() % 10 === 1 && dt.getDate() !== 11
      ? "st"
      : dt.getDate() % 10 === 2 && dt.getDate() !== 12
      ? "nd"
      : dt.getDate() % 10 === 3 && dt.getDate() !== 13
      ? "rd"
      : "th")
  );
}

export const formattedDate = (d) => {
  console.log(d);
  const day = english_ordinal_suffix(d);
  const year = d.getFullYear();
  const month = getCurrentMonth();
  return month.toString() + " " + day.toString() + ", " + (year - 1).toString();
};

export const formatAMPM = (date) => {
  console.log({ date });
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const isDaySame = (d1, d2) => {
  const day1 = d1.getDate();
  const day2 = d2.getDate();
  if (day1 !== day2) return false;
  const month1 = d1.getMonth();
  const month2 = d2.getMonth();
  if (month1 !== month2) return false;
  const year1 = d1.getFullYear();
  const year2 = d2.getFullYear();
  return year1 === year2;
};

export const check = (list, date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  for (let i = 0; i < list.length; i++) {
    if (list[i] === day.toString() + month.toString() + year.toString()) {
      return true;
    }
  }
  return false;
};
