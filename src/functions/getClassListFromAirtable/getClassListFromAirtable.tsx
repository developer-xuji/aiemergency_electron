/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import airTableInstance from '../../libs/airtableInstance';
import info from '../../info.json';
import { ClassInfo, initClassInfo } from '../../utils/classInfo/classInfo';
import formatString from '../../utils/formatString';
import getCurrentTime from '../../utils/getCurrentTime';

const START = 0;
const END = 1;
const HOUR = 0;
const MINUTE = 1;

const getMelbourneTime = (record: any, which: number) => {
  return record.get('Melbourne Time').split('-')[which].trim().split(':');
};

const getClassListFromAirtable = (params: any) => {
  const { studioID } = params;
  airTableInstance('Timetable')
    .select({ view: info.dataView })
    .eachPage(
      function page(records: any, fetchNextPage: any) {
        // This function (`page`) will get called for each page of records.
        records.forEach((record: any) => {
          const studio = record.get('Studio (String)');
          const classInfo: ClassInfo = initClassInfo();
          // 拉取数据前 去掉studio名字中所有的空格
          const formatedStudio = formatString(studio, ' ');

          if (formatedStudio === studioID) {
            const startTime = getMelbourneTime(record, START);
            const endTime = getMelbourneTime(record, END);

            classInfo.id = record.get('record_id');
            classInfo.studio = studio;
            classInfo.startHour = startTime[HOUR];
            classInfo.startMinute = startTime[MINUTE];
            classInfo.endHour = endTime[HOUR];
            classInfo.endMinute = endTime[MINUTE];
            classInfo.teacher = record.get('Teacher (String)')
              ? record.get('Teacher (String)')
              : '';
            classInfo.teacherID = record.get('Deputy ID');
            classInfo.uniform = record.get('Uniform')
              ? record.get('Uniform')
              : '';
            classInfo.classString = record.get('Class (String)')
              ? record.get('Class (String)')
              : '';
            classInfo.topic = record.get('Topic (String)')
              ? record.get('Topic (String)')
              : '';
            classInfo.specialClass = record.get('Special Class')
              ? record.get('Special Class')
              : '';

            params.addClassInfo(classInfo);
          }
        });

        fetchNextPage();
      },
      async function done(err: any) {
        const currentTime = getCurrentTime();

        await params.afterReadData(currentTime);
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    );
};

export default getClassListFromAirtable;
