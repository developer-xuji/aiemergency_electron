/* eslint-disable promise/valid-params */
/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import ButtonAreaContext from './ButtonAreaContext';
import getStage from '../../../../utils/getStage';
import setAlert from '../../../../functions/setAlert';
import { BACKEND_URL } from '../../../../config';
import { ALERT_URL, ALERT_LEVEL } from '../../../../constants';
import runCMDCommand from '../../../../utils/runCMDCommand';

const { GREEN } = ALERT_LEVEL;

const Layout = styled.div`
  flex: 1;
  display: flex;
`;

const EmergencyButton = styled.button`
  flex: 1;
  background: ${(props) =>
    props.value === 'Emergency' ? '#ff5555' : '#7dfab1'};

  border: none;
  appearance: none;
  font-size: 1.3rem;
  box-shadow: 0px 8px 28px -6px rgba(24, 39, 75, 0.12),
    0px 18px 88px -4px rgba(24, 39, 75, 0.14);
  transition: transform ease-in 0.1s;
  cursor: pointer;
`;

const ButtonArea: React.ComponentType = () => {
  const { switchToEmergency, currentClass } =
    React.useContext(ButtonAreaContext);
  const onEmergencyClick = () => {
    // runCMDCommand('.\\scripts\\playAudio.vbs');
    switchToEmergency(true);
  };

  const onReadyClick = () => {
    const stage = getStage(currentClass);
    setAlert(
      BACKEND_URL + ALERT_URL,
      GREEN,
      currentClass ? currentClass.id : null,
      '',
      stage
    );
  };

  return (
    <Layout>
      <EmergencyButton value="Ready" onClick={onReadyClick}>
        Ready
      </EmergencyButton>
      <EmergencyButton value="Emergency" onClick={onEmergencyClick}>
        Emergency
      </EmergencyButton>
    </Layout>
  );
};

export default ButtonArea;
