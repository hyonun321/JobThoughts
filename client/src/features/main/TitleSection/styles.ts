import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { Variants } from 'framer-motion';

export const Section = styled.section`
  width: 100vw;
  height: 90vh;
  position: relative;
  overflow: hidden;
  background: black;
  z-index: 1;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

export const Shape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: #d0f5ff;
`;

export const Bear = styled(motion.img)`
  position: absolute;
  top: 20%;
  left: 60%;
  transform: translate(-50%, -50%);
  width: clamp(160px, 33vw, 500px);
  pointer-events: none;

  @media (max-width: 768px) {
    left: 55%;
    top: 30%;
  }
`;

export const TextGroup = styled(motion.div)`
  position: absolute;
  top: 25vh;
  left: 15vw;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 4vh, 3rem);

  @media (max-width: 768px) {
    top: 20vh;
    left: 15vw;
    gap: 1.5rem;
  }
`;

export const containerVariants: Variants = { hidden: {}, visible: {} };

export const shapeVariants: Variants = {
  hidden: () => ({ x: 0, y: 0, scale: 0.1, opacity: 0 }),
  visible: (pos) => ({
    x: pos.x * 700,
    y: pos.y * 700,
    scale: pos.size,
    opacity: 1,
    transition: { duration: 1.3, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export const textVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.4 },
  }),
};

export const bearVariants: Variants = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: 'easeOut', delay: 0.4 },
  },
};
