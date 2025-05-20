import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { theme } from '../../../styles/theme';

export const Section = styled.section`
  display: flex;
  gap: clamp(0.75rem, 1vw, 1rem);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150vh;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export const ImgWrapper = styled.div`
  width: clamp(250px, 30vw, 600px);
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export const WordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 4vw, 2rem);
  h1 {
    font-size: clamp(22px, 3.125vw, ${theme.fontSize.xxl});
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    h1 {
      text-align: center;
      white-space: wrap;
    }
  }
`;

export const DotWrapper = styled.div`
  position: relative;
`;

export const Dot = styled(motion.img)<{ index: number }>`
  position: absolute;
  top: -25px;
  left: ${({ index }) => `${39 + index * 8}%`};
  width: clamp(8px, 1vw, 12px);
  height: auto;
`;

export const dotVariants: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.5,
    },
  }),
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.25,
    },
  }),
};
