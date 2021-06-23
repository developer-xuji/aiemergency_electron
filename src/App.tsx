/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import './App.global.css';

import { remote } from 'electron';
import nodeOs from 'os';

import { ClassInfo } from './utils/classInfo/classInfo';
import InfoPage from './components/InfoPage';
import InfoPageContext from './components/InfoPage/InfoPageContext';
import EmergencyPage from './components/EmergencyPage';
import EmergencyPageContext from './components/EmergencyPage/EmergencyPageContext';

import getClassListFromAirtable from './functions/getClassListFromAirtable';
import cleanClassList from './utils/cleanClassList';
import getStudioID from './utils/getStudioID';
import checkStudio from './utils/checkStudio';
import {
  UNACTIVE_WINDOW_HEIGHT,
  UNACTIVE_WINDOW_WIDTH,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  ALERT_URL,
  ALERT_LEVEL,
  TIMING,
} from './constants';
import setAlert from './functions/setAlert';
import { BACKEND_URL } from './config';
import alertByTiming from './utils/alertByTiming';
import screenSender from './functions/screenSender';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;
const { RED, YELLOW, WHITE, BLUE } = ALERT_LEVEL;
const { PREPARING, WARNING, NOTICE_BEFORE_CLASS, CLASS_BEGIN, CLASS_END } =
  TIMING;
const ONE_MINUTE = 60000;
const TEN_SECONDS = 10000;
const THREE_STARS = '⭐⭐⭐';
const AUDIO_FILE = '.\\scripts\\playAudio.vbs';
const HOSTNAME: string = nodeOs.hostname();

export default function App() {
  const [updateList, setUpdateList] = React.useState<ClassInfo[]>([]);
  const [emergency, setEmergency] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);
  const [timeLeft, setTimeLeft] = React.useState(0);

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

  // 课前检查studio状态 没有ready或者emergency则发出No teacher警报
  const checkStudioBeforeClass = () => {
    const dependency = {
      constents: [HOSTNAME, YELLOW, RED, BACKEND_URL, ALERT_URL],
      classID: classList[0].id,
    };
    checkStudio(dependency);
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

  const switchToEmergency = (page: boolean) => {
    setEmergency(page);
    return page;
  };

  // 初始化Timer, 从airtable获取数据，与本机hostname比对，获取当前主机的上课时间表
  useEffect(() => {
    // 获取当前studio时间表(也可以使用info.json中的给定ID)
    getClassList(getStudioID);
    let counter = 0;

    // 每分钟监听一次当前时间
    const interval = setInterval(async () => {
      // 每5分钟更新classList
      if (counter > 5) {
        console.log('class refresh');
        getClassList(getStudioID);
        counter = 0;
      }
      counter += 1;

      if (classList.length === 0)
        setAlert(BACKEND_URL + ALERT_URL, WHITE, null, '', '');
      else if (classList.length > 0) {
        const params = {
          currentClass: classList[0],
          setTimeLeft: (timeBeforClass: number) => setTimeLeft(timeBeforClass),
          onPanelSwitch: () => (hidden ? 0 : switchWindow()),
          checkStudioBeforeClass: () => checkStudioBeforeClass(),
          getClassList: (studioID: string) => getClassList(studioID),
          timings: [
            PREPARING,
            WARNING,
            NOTICE_BEFORE_CLASS,
            CLASS_BEGIN,
            CLASS_END,
          ],
          constents: [
            BACKEND_URL,
            ALERT_URL,
            AUDIO_FILE,
            getStudioID,
            THREE_STARS,
            BLUE,
            YELLOW,
          ],
        };
        alertByTiming(params);
      }
    }, ONE_MINUTE);
    return () => clearInterval(interval);
  }, []);

  setInterval(() => screenSender(), TEN_SECONDS);

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
          value={{
            classList: updateList || [],
            switchToEmergency,
            switchWindow,
          }}
        >
          <EmergencyPage />
        </EmergencyPageContext.Provider>
      )}
    </Layout>
  );
}
