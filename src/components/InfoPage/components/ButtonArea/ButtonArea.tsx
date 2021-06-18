import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  flex: 1;
  display: flex;
`;

const EmergencyButton = styled.button`
  flex: 1;
  background: ${(props) => (props.value === 'Emergency' ? 'yellow' : 'green')};

  border: none;
  appearance: none;
  font-size: 1.3rem;
  box-shadow: 0px 8px 28px -6px rgba(24, 39, 75, 0.12),
    0px 18px 88px -4px rgba(24, 39, 75, 0.14);
  transition: transform ease-in 0.1s;
  cursor: pointer;
`;

const ButtonArea: React.ComponentType = () => {
  return (
    <Layout>
      <EmergencyButton value="Ready" />
      <EmergencyButton value="Emergency" />
    </Layout>
  );
};

export default ButtonArea;
