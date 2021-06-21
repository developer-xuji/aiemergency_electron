/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { ClassInfo } from '../classInfo/classInfo';

// 比较当前时间和获取课表时间，结束时间早于当前时间则删除, 按照时间先后将课程排序
const cleanClassList = (classList: ClassInfo[], currentTime: string) => {
  const cleanedList = [];
  const tempCurrent = currentTime.split(':');

  for (const index in classList) {
    const hour = +classList[index].endHour;
    const minutes = +classList[index].endMinute;

    const currentHour = +tempCurrent[0];
    const currentMins = +tempCurrent[1];

    if (currentHour < hour || (currentHour === hour && currentMins < minutes)) {
      if (cleanedList.length === 0) {
        cleanedList.push(classList[index]);
      } else {
        let ifInsert = false;
        for (const i in cleanedList) {
          if (
            classList[index].teacher === 'CANCELED' ||
            hour < +cleanedList[i].endHour ||
            (hour === +cleanedList[i].endHour &&
              minutes < +cleanedList[i].endMinute)
          ) {
            cleanedList.splice(+i, 0, classList[index]);
            ifInsert = true;
            break;
          }
        }
        if (!ifInsert) {
          cleanedList.push(classList[index]);
        }
      }
    }
  }

  return cleanedList;
};
export default cleanClassList;
