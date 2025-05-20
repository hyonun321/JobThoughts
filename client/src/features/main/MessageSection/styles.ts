import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styled from 'styled-components';

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 50, transition: { duration: 0.4, ease: 'easeOut' } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.15,
      ease: 'easeOut',
    },
  }),
};

export const NextSection = styled.section`
  width: 100vw;
  background: linear-gradient(to bottom, #000000 0%, #4f63ff 50%, #ffffff 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding: clamp(40px, 6vw, 100px) 0;
`;

export const ResponsiveBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const SectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(30px, 5vw, 60px);
  padding: clamp(85px, 6vw, 80px) 0;
`;

export const WordWrap = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 0 5vw;
  text-align: center;

  span {
    font-size: clamp(1.6rem, 6vw, 3.75rem);
    font-weight: 700;
  }
`;

export const Row = styled(motion.div)<{ align?: 'left' | 'right' }>`
  width: 100%;
  display: flex;
  justify-content: ${({ align }) =>
    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'};
  padding: ${({ align }) =>
    align === 'right' ? '0 0 0 10vw' : align === 'left' ? '0 10vw 0 0' : '0 10vw'};

  @media (max-width: 768px) {
    padding: 0 6vw;
  }
`;

export const TextRow = styled(motion.div)<{ align?: 'left' | 'right'; isSecond?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ align }) =>
    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'};
  padding: 0 10vw;

  @media (min-width: 1100px) {
    margin-right: ${({ isSecond }) => (isSecond ? '-15%' : '0')};
    margin-left: ${({ isSecond }) => (isSecond ? '0' : '-32%')};
  }

  @media (max-width: 1100px) {
    padding: 0 6vw;
    justify-content: center;
    margin: 0;
    text-align: center;
  }
`;

export const MobileTextWrapper = styled.div<{ align?: 'left' | 'right' }>`
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  text-align: ${({ align }) => align || 'left'};

  @media (max-width: 1100px) {
    transform: scale(0.85);
    transform-origin: center;
    text-align: center;
  }
`;

export const FinalSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 768px) {
    gap: 16px;
    margin-top: 20px;
  }
`;
