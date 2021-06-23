/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
/* eslint-disable import/extensions */
import getTiming from '../getTiming';
import getCurrentTime from '../getCurrentTime';
import getTimeDifference from '../getTimeDifference';
import setAlert from '../../functions/setAlert';
import runCMDCommand from '../runCMDCommand';
import { currentTiming, setCurrentTiming } from '../../classData';

const alertByTiming = (params: any) => {
  const { currentClass } = params;
  const { startHour, startMinute, endHour, endMinute } = currentClass;
  const timing = getTiming(startHour, startMinute, endHour, endMinute);
  const currentTime = getCurrentTime();

  const timeBeforClass = getTimeDifference(
    currentTime.getHours(),
    currentTime.getMinutes(),
    startHour,
    startMinute
  );
  params.setTimeLeft(timeBeforClass);
  const [PREPARING, WARNING, NOTICE_BEFORE_CLASS, CLASS_BEGIN, CLASS_END] =
    params.timings;
  const [
    BACKEND_URL,
    ALERT_URL,
    AUDIO_FILE,
    AIRTABLE_STUDIO,
    THREE_STARS,
    BLUE,
    YELLOW,
  ] = params.constents;

  console.log('Timing: ', timing);
  console.log('CurrentTiming', currentTiming);

  switch (timing) {
    // 上课前超过准备 发送蓝色警报
    case PREPARING:
      if (currentTiming !== PREPARING) {
        setCurrentTiming(PREPARING);
        setAlert(
          BACKEND_URL + ALERT_URL,
          BLUE,
          currentClass.id,
          '',
          'before_class'
        );
      }
      break;
    // 上课前超过提示时间 发送黄色警报
    case WARNING:
      if (currentTiming !== WARNING) {
        setCurrentTiming(WARNING);
        setAlert(
          BACKEND_URL + ALERT_URL,
          YELLOW,
          currentClass.id,
          '',
          'before_class'
        );
      }
      break;
    // 到达上课前提示时间 自动弹出紧急按钮 (非Multi版本)
    case NOTICE_BEFORE_CLASS:
      setCurrentTiming(NOTICE_BEFORE_CLASS);
      const starsIndex = currentClass.specialClass.indexOf(THREE_STARS);
      if (starsIndex >= 0) break;
      params.onPanelSwitch();
      runCMDCommand(AUDIO_FILE);
      break;
    // 开始上课后 判断studio是否已经ready，没有则发送红色警报
    case CLASS_BEGIN:
      setCurrentTiming(CLASS_BEGIN);
      params.checkStudioBeforeClass();
      break;
    // 下课时刷新classList
    case CLASS_END:
      setCurrentTiming(CLASS_END);
      params.getClassList(AIRTABLE_STUDIO);
      break;
    default:
  }
};
export default alertByTiming;
