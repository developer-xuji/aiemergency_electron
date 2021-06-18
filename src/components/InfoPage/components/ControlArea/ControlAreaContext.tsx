import { createContext } from 'react';

const ControlAreaContext = createContext({
  actived: false,
  onAreaClick: () => {},
});

export default ControlAreaContext;
