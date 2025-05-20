import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const MotionSection = motion(Wrapper);

export const TextWrapper = styled.div`
  padding-bottom: 20px;
`;

export const ExampleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(0.5rem, 2vw, 1.5rem);

  @media (max-width: 780px) {
    align-items: center;
  }
`;

export const SampleWrapper = styled.div`
  width: 100%;
  height: clamp(170px, 33vh, 250px);
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-height: 170px;
  }
`;

export const TextGroup = styled.div`
  margin-bottom: clamp(0.5rem, 1.5vw, 2.5rem);
`;

export const InfoTag = styled.div`
  padding: 3px 35px;
  background-color: white;
  color: black;
  border-radius: 100px;
  font-size: clamp(0.75rem, 1.2vw, 1.125rem);
  box-shadow: 1px 2px 6px rgba(79, 99, 255, 0.4);
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: clamp(1rem, 3vh, 3rem);
`;

export const InfoCardWrapper = styled.div`
  display: flex;
  gap: clamp(25px, 2.7vw, 35px);

  & > * {
    cursor: default !important;
  }
`;
