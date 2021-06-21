/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import { BACKEND_URL } from '../../config';
import { STUDIO_URL } from '../../constants';
import fetchData from '../fetchData';

// 获取studio的警报状态
const getStudioAlert = async () => {
  try {
    return fetchData(BACKEND_URL + STUDIO_URL, 'GET', {});
  } catch (error) {
    console.log(error);
  }
};

export default getStudioAlert;
