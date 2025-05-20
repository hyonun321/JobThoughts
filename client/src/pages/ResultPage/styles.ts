import styled from 'styled-components';
import { motion } from 'framer-motion';
import ClickFinger from '@/assets/icons/icon-click-finger.svg';
import { theme } from '@/styles/theme';

export const ResultSection = styled.div`
  padding: 0px 20px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

export const ChartInfoText = styled.div`
  position: relative;
  margin: 0 auto;

  h1 {
    text-align: center;
    color: ${theme.colors.gray900};
    font-size: clamp(12px, 3vw, ${theme.fontSize.lg});
    font-weight: normal;
  }

  span {
    color: ${theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    background-image: url(${ClickFinger});
    background-size: contain;
    background-repeat: no-repeat;
    width: clamp(40px, 18vw, 150px);
    height: clamp(40px, 18vw, 200px);
    top: -30%;
    left: calc(100% - 30px);
  }
`;

export const ResultTopWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  justify-content: center;
  align-items: center;
  min-height: clamp(400px, 60vw, 500px);
`;

export const DescriptionWrapper = styled(motion.div)`
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const layoutSpring = {
  type: 'spring',
  stiffness: 40,
  damping: 10,
};

export const slideInVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: layoutSpring,
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: layoutSpring,
  },
};
