const japanTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" });
const currentDate = new Date(japanTime);
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const current = currentDate.getDate();
const formattedDate = `${currentYear}-${currentMonth}-${current}`.split("-");

let year;
let season;

if (formattedDate[1] >= 12 || formattedDate[1] <= 3) {
  // winter
  if (formattedDate[1] === 3 && formattedDate[2] === 1) {
    year = `${currentYear - 1}`;
    season = "fall";
  } else {
    year = `${currentYear - 1}`;
    season = "fall";
  }
} else if (formattedDate[1] >= 3 && formattedDate[1] <= 5) {
  // spring
  if (formattedDate[1] === 3 && formattedDate[2] >= 2) {
    year = `${currentYear}`;
    season = "winter";
  } else {
    year = `${currentYear}`;
    season = "winter";
  }
} else if (formattedDate[1] >= 6 && formattedDate[1] <= 8) {
  // summer
  year = `${currentYear}`;
  season = "spring";
} else {
  // fall
  year = `${currentYear}`;
  season = "summer";
}

export { year, season };
