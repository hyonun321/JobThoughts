import styled from 'styled-components';

export const Section = styled.section`
  width: 100vw;
  height: 400vh;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`;

export const BearWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 400px;
  height: auto;
  z-index: 1;
`;

export const PinWrapper = styled.div<{ pinned: boolean }>`
  position: ${({ pinned }) => (pinned ? 'fixed' : 'relative')};
  top: ${({ pinned }) => (pinned ? '0' : 'auto')};
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding-left: 20vw;

  @media (max-width: 1024px) {
    padding-left: 10vw;
  }

  @media (max-width: 768px) {
    padding-left: 0;
    align-items: center;
    gap: 1.5rem;
  }
`;

export const motionVariants = {
  hidden: {
    transform: 'translateX(300px)',
    opacity: 0,
  },
  visible: {
    transform: 'translateX(20px)',
    opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 12 },
  },
};
