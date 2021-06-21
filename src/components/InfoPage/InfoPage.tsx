/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import { remote } from 'electron';

import InfoPageContext from './InfoPageContext';
import ButtonArea from './components/ButtonArea';
import InfoArea from './components/InfoArea';
import InfoAreaContext from './components/InfoArea/InfoAreaContext';
import ControlArea from './components/ControlArea';
import ControlAreaContext from './components/ControlArea/ControlAreaContext';
import {
  UNACTIVE_WINDOW_HEIGHT,
  UNACTIVE_WINDOW_WIDTH,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from '../../constants';

import { initClassInfo } from '../../utils/classInfo/classInfo';

const Layout = styled.div`
  background: black;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const InfoPage: React.ComponentType = () => {
  const [actived, setActived] = React.useState(false);
  const [currentClass, setCurrentClass] = React.useState(initClassInfo());
  const { classList } = React.useContext(InfoPageContext);

  React.useEffect(() => {
    if (classList.length === 0) setCurrentClass(initClassInfo);
    else setCurrentClass(classList[0]);
  }, [classList, classList.length]);

  // 点击空白部分隐藏/显示窗口
  const onAreaClick = () => {
    const mainWindow = remote.getCurrentWindow();
    if (!actived) {
      mainWindow.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
      mainWindow.setOpacity(1.0);
    } else {
      mainWindow.setSize(UNACTIVE_WINDOW_WIDTH, UNACTIVE_WINDOW_HEIGHT);
      mainWindow.setOpacity(0.1);
    }

    setActived(!actived);
  };

  console.log(currentClass);

  return (
    <Layout>
      <ControlAreaContext.Provider value={{ actived, onAreaClick }}>
        <ControlArea />
      </ControlAreaContext.Provider>
      {actived && (
        <>
          <InfoAreaContext.Provider value={{ currentClass }}>
            <InfoArea />
          </InfoAreaContext.Provider>

          <ButtonArea />
        </>
      )}
    </Layout>
  );
};

export default InfoPage;
