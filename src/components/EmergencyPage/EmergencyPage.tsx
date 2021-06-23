import React from 'react';
import styled from 'styled-components';
import EmergencyPageContext from './EmergencyPageContext';
import getStage from '../../utils/getStage';
import setAlert from '../../functions/setAlert';
import { BACKEND_URL } from '../../config';
import { ALERT_URL, ALERT_LEVEL } from '../../constants';

const { RED } = ALERT_LEVEL;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const OptionButton = styled.button`
  height: 20vh;
  font-size: 20px;
  text-align: center;
  background-color: ${(props) => props.color};
  color: ${(props) => (props.color === 'white' ? 'black' : 'white')};
`;

const EmergencyPage: React.ComponentType = () => {
  const { classList, switchToEmergency, switchWindow } =
    React.useContext(EmergencyPageContext);

  const currentClass = classList.length === 0 ? null : classList[0];
  const sendEmergency = (text: string) => {
    if (currentClass) {
      const stage = getStage(currentClass);
      setAlert(BACKEND_URL + ALERT_URL, RED, currentClass.id, text, stage);
    }
    switchToEmergency(false);
    switchWindow();
  };

  const options = [
    {
      text: 'Hide',
      color: 'white',
      click: () => {
        switchToEmergency(false);
        switchWindow();
      },
    },
    {
      text: 'Audio/Video Issues',
      color: '#20C933',
      click: () => sendEmergency('Audio/Video Issues'),
    },
    {
      text: 'No Students',
      color: '#18BFFF',
      click: () => sendEmergency('No Students'),
    },
    {
      text: 'PPT Frozen/Missing',
      color: '#FCB400',
      click: () => sendEmergency('PPT Frozen/Missing'),
    },
    {
      text: 'Other',
      color: '#FF6F2C',
      click: () => sendEmergency('Other'),
    },
  ];

  return (
    <Layout>
      {options.map((o) => {
        return (
          <OptionButton key={o.text} onClick={o.click} color={o.color}>
            {o.text}
          </OptionButton>
        );
      })}
    </Layout>
  );
};

export default EmergencyPage;
