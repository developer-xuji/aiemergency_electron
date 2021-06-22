import { createContext } from 'react';
import { ClassInfo } from '../../utils/classInfo/classInfo';

const INIT_CLASSLIST: ClassInfo[] = [];

const EmergencyPageContext = createContext({
  classList: INIT_CLASSLIST,
  switchToEmergency: (page: boolean) => page,
  switchWindow: () => {},
});

export default EmergencyPageContext;
