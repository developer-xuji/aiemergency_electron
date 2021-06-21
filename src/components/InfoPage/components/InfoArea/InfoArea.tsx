import React from 'react';
import styled from 'styled-components';
import InfoAreaContext from './InfoAreaContext';

const Layout = styled.div`
  flex: 2.5;
  border: 1px solid red;
`;

const Text = styled.div`
  color: blue;
`;

const InfoArea: React.ComponentType = () => {
  const { currentClass } = React.useContext(InfoAreaContext);
  return (
    <Layout>
      <Text>
        Uniform {currentClass.id === '' ? 'NotReady' : currentClass.uniform}
      </Text>
    </Layout>
  );
};

export default InfoArea;
