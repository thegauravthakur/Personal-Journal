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

export const formattedDate = () => {
  const d = new Date();
  const day = english_ordinal_suffix(d);
  const month = getCurrentMonth();
  return month.toString() + " " + day.toString();
};
