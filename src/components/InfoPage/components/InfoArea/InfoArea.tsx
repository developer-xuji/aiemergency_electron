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
  display: flex;
  flex-direction: column;
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
  if (value === '' || value === ':') return 'Not Ready';
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
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-left: 10vw;
    padding-right: 10vw;
    font-size: 20px;
    font-weight: 900;
    color: white;
    margin-bottom: 1vh;
  `;

  const Title = styled.div`
    width: 40vw;
  `;

  const Constent = styled.div`
    width: 40vw;
    color: ${(props: any) => props.color};
  `;

  return (
    <Layout>
      <Text color={getText(currentClass.uniform)}>
        <Title id="Uniform">Uniform: </Title>
        <Constent id="Uniform" color={getUniformStyle(currentClass.uniform)}>{getText(currentClass.uniform)}</Constent>
      </Text>
      <Text>
        <Title id="Studio">Studio:</Title>
        <Constent id="Studio">{getText(currentClass.studio)}</Constent>
      </Text>
      <Text>
        <Title id="Teacher">Teacher:</Title>
        <Constent id="Teacher">{getText(currentClass.teacher)}</Constent>
      </Text>
      <Text>
        <Title id="start_time">Start time:</Title>
        <Constent id="start_time">
          {getText(`${currentClass.startHour}:${currentClass.startMinute}`)}
        </Constent>
      </Text>
      <Text>
        <Title id="Topic">Topic:</Title>
        <Constent id="Topic">{getText(currentClass.topic)}</Constent>
      </Text>
      <Text>
        <Title id="time_to_class">Time To Class:</Title>
        <Constent id="time_to_class">{timeToClass < 0 ? 0 : timeToClass} mins</Constent>
      </Text>
    </Layout>
  );
};

export default InfoArea;
