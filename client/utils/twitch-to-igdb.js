// Some Twitch game slugs don't match their IGDB counterparts
// This function changes known slug differences

const twitchToIgdb = (slug) => {
  switch(slug) {
    case 'fall-guys':
      return 'fall-guys-ultimate-knockout';
    default:
      return slug;
  }
}

export default twitchToIgdb;