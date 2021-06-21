/* eslint-disable no-console */
import fetchData from '../fetchData';
import { CLASSTABLE } from '../../constants';
import { BACKEND_URL } from '../../config';
import { initClassInfo } from '../../utils/classInfo/classInfo';

const classSync = (classlist) => {
  return fetchData(
    BACKEND_URL + CLASSTABLE,
    'PUT',
    classlist[0] ? classlist[0] : initClassInfo()
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export default classSync;
