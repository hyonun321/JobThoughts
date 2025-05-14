import styled from 'styled-components';
import React from 'react';

type CardFrameProps = {
  children: React.ReactNode;
};

const FrameWrapper = styled.div`
  position: relative;
  width: 65%;
  height: 65%;
`;

const BaseCard = styled.div<{ rotation?: number; color?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background-color: ${({ theme, color }) => color || theme.colors.deco2};
  transform: ${({ rotation }) => `rotate(${rotation || 0}deg)`};
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;
`;

const BackCard = styled(BaseCard)`
  z-index: 0;
`;

const MiddleCard = styled(BaseCard)`
  z-index: 1;
`;

const TopCard = styled(BaseCard)`
  z-index: 2;
  transform: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function CardFrame({ children }: CardFrameProps) {
  return (
    <FrameWrapper>
      <BackCard rotation={3} color="#b2d3ff" />
      <MiddleCard rotation={-3} color="#4f63ff" />
      <TopCard>{children}</TopCard>
    </FrameWrapper>
  );
}
