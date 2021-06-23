/* eslint-disable import/extensions */
import { createContext } from 'react';
import { initClassInfo } from '../../../../utils/classInfo/classInfo';

const ButtonAreaContext = createContext({
  switchToEmergency: (page: boolean) => page,
  currentClass: initClassInfo(),
  switchWindow: () => {},
});

export default ButtonAreaContext;
