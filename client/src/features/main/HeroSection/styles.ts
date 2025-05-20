import styled from 'styled-components';
import { motion } from 'framer-motion';
export const Section = styled.section`
  width: 100%;
  height: 300vh;
  background-color: ${({ theme }) => theme.colors.black};
  position: relative;
`;
export const StickyWrapper = styled.div`
  position: fixed;
  max-width: 100%;
  top: 0;
  left: 0;
  right: 0;
  height: 100dvh;
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  z-index: 0;
  pointer-events: none;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Row = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  white-space: nowrap;
`;

export const JobText = styled(motion.span)<{ $outline?: boolean }>`
  font-weight: 900;
  display: inline-block;
  color: ${({ $outline, theme }) => ($outline ? 'transparent' : theme.colors.black)};
  -webkit-text-stroke: ${({ $outline }) => ($outline ? '1px black' : '0')};
`;

export const BlackSection = styled(motion.div)`
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  position: fixed;
  z-index: 1;
`;
