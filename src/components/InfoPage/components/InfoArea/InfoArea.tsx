/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable import/extensions */
/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import InfoAreaContext from './InfoAreaContext';
import getTimeDifference from '../../../../utils/getTimeDifference';

const AI_ENGLISH_GREEN = '#52aa35';
const PEARSON_AI_ENGLISH_GREEN = '#D1F7C4';
const RISE_BLUE = '#8aaaf3';
const SHANE_BLUE = '#D0F0FD';
const AI_PLAY_COSTUME = '#F99DE2';
const BANGBANGTANG = '#fee2d5';

const Layout = styled.div`
  flex: 2.5;
  padding-left: 5px;
`;

const getUniformStyle = (uniform: string) => {
  switch (uniform) {
    case 'Ai English Green':
      return AI_ENGLISH_GREEN;
    case 'Pearson with Ai English Green':
      return PEARSON_AI_ENGLISH_GREEN;
    case 'Rise Blue':
      return RISE_BLUE;
    case 'Shane Blue':
      return SHANE_BLUE;
    case 'Ai Play Costume':
      return AI_PLAY_COSTUME;
    case 'BangBangTang with Ai English Green':
      return BANGBANGTANG;
    default:
      return 'white';
  }
};

const getText = (value: string) => {
  if (value === '') return 'Not Ready';
  return value;
};

const InfoArea: React.ComponentType = () => {
  const { currentClass } = React.useContext(InfoAreaContext);
  const currentTime = new Date();
  const timeToClass = getTimeDifference(
    currentTime.getHours(),
    currentTime.getMinutes(),
    currentClass.startHour,
    currentClass.startMinute
  );

  const Text = styled.div`
    color: white;
    font-size: 20px;
  `;

  const UNIFORM = styled.div`
    color: ${(props: any) => getUniformStyle(props.color)};
    font-size: 30px;
  `;

  return (
    <Layout>
      <UNIFORM color={getText(currentClass.uniform)}>
        Uniform: {getText(currentClass.uniform)}
      </UNIFORM>
      <Text>Studio: {getText(currentClass.studio)}</Text>
      <Text>Teacher: {getText(currentClass.teacher)}</Text>
      <Text>
        Start time:{' '}
        {getText(`${currentClass.startHour}:${currentClass.startMinute}`)}
      </Text>
      <Text>Topic: {getText(currentClass.topic)}</Text>
      <Text>Time To Class: {timeToClass < 0 ? 0 : timeToClass} mins</Text>
    </Layout>
  );
};

export default InfoArea;
