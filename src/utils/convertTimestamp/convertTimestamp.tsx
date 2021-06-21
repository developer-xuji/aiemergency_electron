// 时间戳转换为可读的时间
const convertTimestamp = (difference: number) => {
  let hours = Math.floor((difference / (1000 * 60 * 60)) % 24).toString();
  let minutes = Math.floor((difference / 1000 / 60) % 60).toString();
  let seconds = Math.floor((difference / 1000) % 60).toString();

  if (+hours < 10) {
    hours = `0${hours}`;
  }

  if (+minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (+seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};

export default convertTimestamp;
