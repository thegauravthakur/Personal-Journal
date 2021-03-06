import Resizer from "react-image-file-resizer";

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
  const day = english_ordinal_suffix(d);
  const year = d.getFullYear();
  const month = getCurrentMonth();
  return month.toString() + " " + day.toString() + ", " + year.toString();
};

export const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
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

export const getHostName = (url) => {
  const parser = document.createElement("a");
  parser.href = url;
  return parser.hostname;
};

export const resizeFile = (file, setProgress) =>
  new Promise((resolve) => {
    setProgress(1);
    Resizer.imageFileResizer(
      file,
      2000,
      2000,
      "JPEG",
      70,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

export const getDateInStorageFormat = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}:${month}:${year}`;
};

export const validTime = () => {
  const startTime = "18:00:00";
  const endTime = "24:00:00";

  const currentDate = new Date();

  const startDate = new Date(currentDate.getTime());
  startDate.setHours(parseInt(startTime.split(":")[0]));
  startDate.setMinutes(parseInt(startTime.split(":")[1]));
  startDate.setSeconds(parseInt(startTime.split(":")[2]));

  const endDate = new Date(currentDate.getTime());
  endDate.setHours(parseInt(endTime.split(":")[0]));
  endDate.setMinutes(parseInt(endTime.split(":")[1]));
  endDate.setSeconds(parseInt(endTime.split(":")[2]));

  return startDate < currentDate && endDate > currentDate;
};

export const checkIfDayIsGreater = (day, month, year, datesId) => {
  let check = false;
  for (let i = 0; i < datesId.length; i++) {
    if (
      datesId[i].day === day &&
      datesId[i].month === month &&
      datesId[i].year === year
    )
      check = true;
  }
  return check;
  // let GivenDate = `${year}-${month}-${day}`;
  // const CurrentDate = new Date();
  // GivenDate = new Date(GivenDate);
  // return check && GivenDate > CurrentDate;
};
