import React from 'react';
import styled from 'styled-components';
import { remote } from 'electron';

import ButtonArea from './components/ButtonArea';
import InfoArea from './components/InfoArea';
import ControlArea from './components/ControlArea';
import ControlAreaContext from './components/ControlArea/ControlAreaContext';
import {
  UNACTIVE_WINDOW_HEIGHT,
  UNACTIVE_WINDOW_WIDTH,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from '../../constants';

const Layout = styled.div`
  background: black;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const InfoPage: React.ComponentType = () => {
  const [actived, setActived] = React.useState(false);

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

  return (
    <Layout>
      <ControlAreaContext.Provider value={{ actived, onAreaClick }}>
        <ControlArea />
      </ControlAreaContext.Provider>
      {actived && (
        <>
          <InfoArea />
          <ButtonArea />
        </>
      )}
    </Layout>
  );
};

export default InfoPage;
