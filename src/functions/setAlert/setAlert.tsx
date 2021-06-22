/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import fetchData from '../fetchData';
import getCurrentTime from '../../utils/getCurrentTime';
import getUTCTime from '../../utils/getUTCTime';

const os = require('os');

const HOSTNAME: string = os.hostname();
const setAlert = async (
  url: string,
  alertLevel: number,
  classInfo: any,
  message: string,
  stage: string
) => {
  const utcTime = getUTCTime();

  try {
    const currentTime = getCurrentTime();
    const alertTime = String(
      `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`
    );
    const data = {
      alertLevel,
      alertTime,
      hostName: HOSTNAME.toUpperCase(),
      class_id: classInfo,
      message,
      stage,
      utcTime,
    };
    console.log(data);

    return await fetchData(url, 'PUT', data);
  } catch (error: any) {
    console.log(error);
    return undefined;
  }
};

export default setAlert;
