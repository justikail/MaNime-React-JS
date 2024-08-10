function formattedTitle({ malId, title }) {
  return `/detail/${malId}/${title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "_")
    .replace(/\s+/g, "_")}`;
}

function formattedGenre({ malId, genreName }) {
  return `/genre/${malId}/${genreName
    .toLowerCase()
    .replace(/[^\w\s]/gi, "_")
    .replace(/\s+/g, "_")}`;
}

function formattedStudio({ malId, title }) {
  return `/producer/${malId}/${title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "_")
    .replace(/\s+/g, "_")}`;
}

export { formattedTitle, formattedGenre, formattedStudio };
