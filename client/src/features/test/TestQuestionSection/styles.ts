import styled from 'styled-components';
import { motion } from 'framer-motion';
import Card from '@/components/Card';
import Button from '@/components/Button';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MotionWrapper = motion(Wrapper);

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5%;
  row-gap: 2vh;

  @media (max-width: 780px) {
    gap: 0.5rem;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 2vh;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ResponsiveCard = styled(Card)`
  flex: 1 1 40%;
  max-width: 45%;
  min-width: 30%;
  aspect-ratio: 1 / 1;
`;

export const ResponsiveButton = styled(Button)`
  font-size: ${({ theme }) => theme.fontSize.s};
  padding: 0.75rem 1.5rem;
  min-width: 100px;

  @media (max-width: 1024px) {
    min-width: 80px;
    font-size: ${({ theme }) => theme.fontSize.xs};
    padding: 0.6rem 1.2rem;
  }

  @media (max-width: 768px) {
    min-width: 60px;
    font-size: ${({ theme }) => theme.fontSize.xxs};
    padding: 0.5rem 1rem;
    width: 70%;
  }
`;

export const QuestionTextWrapper = styled.div`
  margin-top: 0;

  @media (max-width: 920px) {
    margin-top: 2.5rem;
  }
`;
