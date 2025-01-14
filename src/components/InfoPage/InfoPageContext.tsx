/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';
import { ClassInfo } from '../../utils/classInfo/classInfo';

const INIT_CLASSLIST: ClassInfo[] = [];

const InfoPageContext = createContext({
  classList: INIT_CLASSLIST,
  switchToEmergency: (page: boolean) => page,
  switchWindow: () => {},
  isHidden: false,
});

export default InfoPageContext;
