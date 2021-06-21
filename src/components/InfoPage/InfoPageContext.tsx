import { createContext } from 'react';
import { ClassInfo } from '../../utils/classInfo/classInfo';

const INIT_CLASSLIST: ClassInfo[] = [];

const InfoPageContext = createContext({
  classList: INIT_CLASSLIST,
});

export default InfoPageContext;
