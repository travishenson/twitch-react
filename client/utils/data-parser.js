// Some basic helper functions for parsing data

export const parseBoxArtUrl = (url) => {
  return url.replace('{width}', '272').replace('{height}', '380');
}

export const parseUnixDate = (unix) => {
  let UTCString = new Date(unix * 1000).toUTCString().substring(4, 17);
  let date = parseInt(UTCString.substring(0, 3), 10);
  let month = UTCString.substring(4, 8);
  let year = UTCString.substring(8, 12);

  if (date > 3 && date < 21) {
    date += 'th'
  } else {
    switch (date % 10) {
      case 1:  date += "st";
      case 2:  date += "nd";
      case 3:  date += "rd";
      default: date += "th";
    }
  }

  return `${month} ${date}, ${year}`;
}