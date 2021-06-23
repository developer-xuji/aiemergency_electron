/* eslint-disable promise/valid-params */
/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import ButtonAreaContext from './ButtonAreaContext';
import getStage from '../../../../utils/getStage';
import setAlert from '../../../../functions/setAlert';
import { BACKEND_URL } from '../../../../config';
import { ALERT_URL, ALERT_LEVEL } from '../../../../constants';

const { GREEN } = ALERT_LEVEL;

const Layout = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 5vh;
`;

const EmergencyButton = styled.button`
  flex: ${(props) => (props.value === 'Emergency' ? '1' : '2')};
  background: ${(props) =>
    props.value === 'Emergency' ? '#f26c4f' : '#66ac64'};

  border: none;
  appearance: none;
  font-size: 1.3rem;
  box-shadow: 0px 8px 28px -6px rgba(24, 39, 75, 0.12),
    0px 18px 88px -4px rgba(24, 39, 75, 0.14);
  transition: transform ease-in 0.1s;
  cursor: pointer;
  width: 50vw;
  border-radius: ${(props) => (props.value === 'Emergency' ? '17px' : '30px')};
  margin-bottom: 2vh;
  border: 2px solid white;
  color: white;
`;

const ButtonArea: React.ComponentType = () => {
  const { switchToEmergency, currentClass, switchWindow } =
    React.useContext(ButtonAreaContext);
  const onEmergencyClick = () => {
    switchToEmergency(true);
  };

  const onReadyClick = () => {
    switchWindow();
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
