export function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '')  // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

function pad (number) {
  return number < 10 ? `0${number}` : number.toString();
}

export function formatEpisodeNumber (seasonNumber, episodeNumber) {
  return `S${pad(seasonNumber)}E${pad(episodeNumber)}`;
}
