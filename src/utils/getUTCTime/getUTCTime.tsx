import { allClassList } from '../../classData';

const getUTCTime = () => {
  if (allClassList.length === 0) return null;

  const currentDate = new Date();
  const utcStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    allClassList[0].startHour,
    allClassList[0].startMinute
  );
  const utcEnd = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    allClassList[0].endHour,
    allClassList[0].endMinute
  );

  return {
    utcStart,
    utcEnd,
    current: currentDate,
  };
};

export default getUTCTime;
