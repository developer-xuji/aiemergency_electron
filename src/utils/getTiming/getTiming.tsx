/* eslint-disable no-console */
/* eslint-disable promise/always-return */
/* eslint-disable global-require */
/* eslint-disable import/extensions */
import { TIMING, STUDIO_CONFIG } from '../../constants';
import getTimeDifference from '../getTimeDifference';
import { BACKEND_URL } from '../../config';
import getCurrentTime from '../getCurrentTime';
import fetchData from '../../functions/fetchData';

const {
  CLASS_BEGIN,
  NOTICE_BEFORE_CLASS,
  CLASS_END,
  HALF_HOUR_BEFORE_CLASS,
  NORMAL,
  PREPARING,
  WARNING,
} = TIMING;

const NO_TIME = 0;
const NOTICE_TIME = 5;
const PREPARE_TIME = 15;
const HALF_HOUR = 30;
const GET_CONFIG_URL: string = BACKEND_URL + STUDIO_CONFIG;

let prepare = PREPARE_TIME;
let notice = NOTICE_TIME;
let firstTimeStart = true;

const getConfig = async () => {
  // 获取当前studio的config
  const os = require('os');
  const hostName = os.hostname();

  fetchData(GET_CONFIG_URL, 'POST', { studioName: hostName })
    .then((response) => {
      return response.json();
    })
    .then((config) => {
      prepare = config.prepare_time ? config.prepare_time : PREPARE_TIME;
      notice = config.notice_time ? config.notice_time : NOTICE_TIME;
    })
    .catch((error) => console.log(error));
};

const getTiming = (
  startHour: string,
  startMinute: string,
  endHour: string,
  endMinute: string
) => {
  const currentTime = getCurrentTime();

  const startTimeDifference: number = getTimeDifference(
    currentTime.getHours(),
    currentTime.getMinutes(),
    startHour,
    startMinute
  );

  const endTimeDifference: number = getTimeDifference(
    currentTime.getHours(),
    currentTime.getMinutes(),
    endHour,
    endMinute
  );

  if (firstTimeStart) {
    getConfig();
    firstTimeStart = false;
  }

  // 距离上课时间30分钟
  if (startTimeDifference === HALF_HOUR) return HALF_HOUR_BEFORE_CLASS;
  // 距离上课时间超过准备时间
  if (startTimeDifference > prepare) return PREPARING;
  // 距离上课时间超过提示时间
  if (startTimeDifference > notice) return WARNING;
  // 距离上课时间为提示时间
  if (startTimeDifference === notice) return NOTICE_BEFORE_CLASS;
  // 开始上课后（小于提示时间则视为上课开始）判断是否已经下课
  if (startTimeDifference < notice) {
    if (endTimeDifference <= NO_TIME) return CLASS_END;
    return CLASS_BEGIN;
  }
  return NORMAL;
};

export default getTiming;
