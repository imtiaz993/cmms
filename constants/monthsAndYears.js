export const months = [
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

export const years = Array.from(
  { length: new Date().getFullYear() - 1950 -5 },
  (_, index) => 1950 + index
);
