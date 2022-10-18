export const msToMinutesAndSeconds = (ms) => {
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);

  if (isNaN(ms)) {
    return "00:00";
  }
  const hoursStr = hours > 9 ? hours : `0${hours}`;
  const minutesStr = minutes > 9 ? minutes : `0${minutes}`;
  const secondsStr = seconds > 9 ? seconds : `0${seconds}`;

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
};
