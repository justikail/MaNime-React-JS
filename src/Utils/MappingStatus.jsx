export const mappingStatus = (status) => {
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
};
