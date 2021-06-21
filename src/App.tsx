/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import './App.global.css';

import { remote } from 'electron';

import { ClassInfo } from './utils/classInfo/classInfo';
import InfoPage from './components/InfoPage';
import InfoPageContext from './components/InfoPage/InfoPageContext';
import EmergencyPage from './components/EmergencyPage';
import EmergencyPageContext from './components/EmergencyPage/EmergencyPageContext';

import getClassListFromAirtable from './functions/getClassListFromAirtable';
import cleanClassList from './utils/cleanClassList';
import getStudioID from './utils/getStudioID';
import {
  UNACTIVE_WINDOW_HEIGHT,
  UNACTIVE_WINDOW_WIDTH,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
} from './constants';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function App() {
  const [updateList, setUpdateList] = React.useState<ClassInfo[]>([]);
  const [emergency, setEmergency] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);

  let classList: ClassInfo[] = [];
  // 通过airtable获取课程时间
  const getClassList = (studioID: string) => {
    const listLength = classList.length;
    const params = {
      studioID,
      addClassInfo: (classInfo: ClassInfo) => classList.push(classInfo),
      afterReadData: async (currentTime: Date) => {
        const currentHour = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        // 清理旧数据
        for (let i = 0; i !== listLength; i += 1) classList.shift();

        classList = cleanClassList(
          classList,
          `${currentHour}:${currentMinutes}`
        );
        console.log(classList);
        setUpdateList(classList);
      },
    };
    getClassListFromAirtable(params);
  };

  // 隐藏/显示窗口
  const switchWindow = () => {
    const mainWindow = remote.getCurrentWindow();
    if (hidden) {
      mainWindow.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
      mainWindow.setOpacity(1.0);
    } else {
      mainWindow.setSize(UNACTIVE_WINDOW_WIDTH, UNACTIVE_WINDOW_HEIGHT);
      mainWindow.setOpacity(0.1);
    }

    setHidden(!hidden);
  };

  useEffect(() => getClassList(getStudioID), []);

  const switchToEmergency = (page: boolean) => {
    setEmergency(page);
    return page;
  };

  return (
    <Layout>
      {!emergency && (
        <InfoPageContext.Provider
          value={{
            classList: updateList || [],
            switchToEmergency,
            switchWindow,
            isHidden: hidden,
          }}
        >
          <InfoPage />
        </InfoPageContext.Provider>
      )}
      {emergency && (
        <EmergencyPageContext.Provider
          value={{ classList: updateList || [], switchToEmergency }}
        >
          <EmergencyPage />
        </EmergencyPageContext.Provider>
      )}
    </Layout>
  );
}
