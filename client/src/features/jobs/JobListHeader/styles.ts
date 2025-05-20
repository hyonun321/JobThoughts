import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const HeaderWrapper = styled.div`
  background: ${theme.colors.deco2};
  padding: 2rem;
  border-radius: 20px;
  box-shadow:
    8px 12px 30px rgba(63, 94, 255, 0.15),
    inset -1px -1px 3px ${theme.colors.background + '80'}; /* 안쪽 그림자 */
  text-align: center;
  margin-bottom: 2rem;
  max-width: 1000px;
  width: 80vw;
  z-index: 2;
`;

export const MobileOnlyBr = styled.span`
  display: none;

  @media (max-width: 768px) {
    display: block;
    height: 0;
  }
`;
