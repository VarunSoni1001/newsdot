export default function formatTimeDifference(publishedAt) {
  const currentTime = new Date();
  const publishedTime = new Date(publishedAt);
  const timeDifferenceInSeconds = Math.floor((currentTime - publishedTime) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInWeek = 604800;
  const secondsInMonth = 2629746;
  const secondsInYear = 31536000;

  if (timeDifferenceInSeconds < secondsInMinute) {
    return `Recently`;
  } else if (timeDifferenceInSeconds < secondsInHour) {
    const minutesAgo = Math.floor(timeDifferenceInSeconds / secondsInMinute);
    return `${minutesAgo} min${minutesAgo !== 1 ? 's' : ''} ago`;
  } else if (timeDifferenceInSeconds < secondsInDay) {
    const hoursAgo = Math.floor(timeDifferenceInSeconds / secondsInHour);
    return `${hoursAgo} hr${hoursAgo !== 1 ? 's' : ''} ago`;
  } else if (timeDifferenceInSeconds < secondsInWeek) {
    const daysAgo = Math.floor(timeDifferenceInSeconds / secondsInDay);
    return `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
  } else if (timeDifferenceInSeconds < secondsInMonth) {
    const weeksAgo = Math.floor(timeDifferenceInSeconds / secondsInWeek);
    return `${weeksAgo} week${weeksAgo !== 1 ? 's' : ''} ago`;
  } else if (timeDifferenceInSeconds < secondsInYear) {
    const monthsAgo = Math.floor(timeDifferenceInSeconds / secondsInMonth);
    return `${monthsAgo} month${monthsAgo !== 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(timeDifferenceInSeconds / secondsInYear);
    return `${yearsAgo} year${yearsAgo !== 1 ? 's' : ''} ago`;
  }
};