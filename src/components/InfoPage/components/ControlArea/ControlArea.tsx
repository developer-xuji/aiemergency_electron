import React from 'react';
import styled from 'styled-components';
import context from './ControlAreaContext';

const Layout = styled.div`
  flex: 0.5;
`;

const ControlArea: React.ComponentType = () => {
  const { onAreaClick } = React.useContext(context);
  return <Layout onClick={onAreaClick} />;
};

export default ControlArea;
