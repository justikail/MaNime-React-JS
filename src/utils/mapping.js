function mappingStatus({ status }) {
  switch (status) {
    case "Finished Airing":
      return "Selesai";
    case "Currently Airing":
      return "Tayang";
    case "Airing":
      return "Tayang";
    case "Not yet aired":
      return "Mendatang";
    case "Cancelled":
      return "Dibatalkan";
    case "Hiatus":
      return "Hiatus";
    case "Unknown":
      return "?";
    default:
      return status;
  }
}

function mappingDay({ day }) {
  switch (day) {
    case "Sundays":
      return "Minggu";
    case "Mondays":
      return "Senin";
    case "Tuesdays":
      return "Selasa";
    case "Wednesdays":
      return "Rabu";
    case "Thursdays":
      return "Kamis";
    case "Fridays":
      return "Jumat";
    case "Saturdays":
      return "Sabtu";
    case "Unknown":
      return "?";
    default:
      return day;
  }
}

export { mappingStatus, mappingDay };
