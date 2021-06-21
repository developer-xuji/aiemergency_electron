/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';

import { ClassInfo } from './utils/classInfo/classInfo';
import InfoPage from './components/InfoPage';
import InfoPageContext from './components/InfoPage/InfoPageContext';
import EmergencyPage from './components/EmergencyPage';

import getClassListFromAirtable from './functions/getClassListFromAirtable';
import cleanClassList from './utils/cleanClassList';
import getStudioID from './utils/getStudioID';

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

      classList = cleanClassList(classList, `${currentHour}:${currentMinutes}`);
    },
  };
  getClassListFromAirtable(params);
};

export default function App() {
  getClassList(getStudioID);
  console.log(classList);

  const Info = () => {
    return (
      <InfoPageContext.Provider value={{ classList }}>
        <InfoPage />
      </InfoPageContext.Provider>
    );
  };

  return (
    <Router>
      <Switch>
        <Route path="/" component={Info} />
        <Route path="/emergency" component={EmergencyPage} />
      </Switch>
    </Router>
  );
}
