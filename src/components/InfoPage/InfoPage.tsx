/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';

import InfoPageContext from './InfoPageContext';
import ButtonArea from './components/ButtonArea';
import ButtonAreaContext from './components/ButtonArea/ButtonAreaContext';
import InfoArea from './components/InfoArea';
import InfoAreaContext from './components/InfoArea/InfoAreaContext';
import ControlArea from './components/ControlArea';
import ControlAreaContext from './components/ControlArea/ControlAreaContext';

import { initClassInfo } from '../../utils/classInfo/classInfo';

const Layout = styled.div`
  background: black;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const InfoPage: React.ComponentType = () => {
  const [currentClass, setCurrentClass] = React.useState(initClassInfo());
  const { classList, switchToEmergency, switchWindow, isHidden } =
    React.useContext(InfoPageContext);

  React.useEffect(() => {
    if (classList.length === 0) setCurrentClass(initClassInfo);
    else setCurrentClass(classList[0]);
  }, [classList, classList.length]);

  return (
    <Layout>
      <ControlAreaContext.Provider
        value={{ actived: !isHidden, onAreaClick: switchWindow }}
      >
        <ControlArea />
      </ControlAreaContext.Provider>
      {!isHidden && (
        <>
          <InfoAreaContext.Provider value={{ currentClass }}>
            <InfoArea />
          </InfoAreaContext.Provider>
          <ButtonAreaContext.Provider
            value={{ switchToEmergency, currentClass }}
          >
            <ButtonArea />
          </ButtonAreaContext.Provider>
        </>
      )}
    </Layout>
  );
};

export default InfoPage;
