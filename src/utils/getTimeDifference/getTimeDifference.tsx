const getTimeDifference = (
  currentHour: number,
  currentMintues: number,
  hour: string,
  minute: string
) => {
  const hourDifference: number = Number(hour) - currentHour;
  const minuteDifference = Number(minute) - currentMintues;
  const timeDifference: number = hourDifference * 60 + minuteDifference;

  return timeDifference;
};

export default getTimeDifference;
