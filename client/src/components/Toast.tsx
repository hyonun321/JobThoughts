import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Toast = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: ${theme.colors.gray900};
  color: ${theme.colors.white};
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-size: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 99999;
  opacity: 0.95;
  animation: fadeInOut 2s ease forwards;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    15% {
      opacity: 0.95;
      transform: translateY(0);
    }
    80% {
      opacity: 0.95;
    }
    100% {
      opacity: 0;
      transform: translateY(10px);
    }
  }
`;
