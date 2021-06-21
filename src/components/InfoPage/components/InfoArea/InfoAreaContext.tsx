import { createContext } from 'react';
import {
  ClassInfo,
  initClassInfo,
} from '../../../../utils/classInfo/classInfo';

const INIT_CLASSINFO: ClassInfo = initClassInfo();

const InfoAreaContext = createContext({
  currentClass: INIT_CLASSINFO,
});

export default InfoAreaContext;
