import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Icon = styled.div<{ top: string; left?: string; right?: string }>`
  position: fixed;
  top: ${({ top }) => top};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  width: 100px;
  z-index: 0;
`;

export const HeaderWithBear = styled.div`
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  padding-top: 200px;
`;

export const BearImage = styled.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  z-index: 999;
`;

export const SectionWrapper = styled.section`
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
  z-index: 1;
`;
export const LoadingSpinner = styled.div`
  position: absolute;
  bottom: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  &::after {
    content: '';
    width: 36px;
    height: 36px;
    border: 4px solid ${theme.colors.white};
    border-top: 4px solid ${theme.colors.primary}; // 회전 강조 색
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const PageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;

  /* 배경을 바로 줌 */
  background: linear-gradient(to bottom, #ffffff 35%, rgba(172, 196, 255, 0.75) 71%, #d8cfff 100%);
  background-attachment: fixed;
`;
