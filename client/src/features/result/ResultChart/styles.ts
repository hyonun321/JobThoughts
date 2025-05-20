import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Wrapper = styled.div`
  position: relative;
  width: clamp(250px, 40vw, 450px);
  aspect-ratio: 1 / 1;
`;

export const Label = styled.div<{ x: number; y: number; $active: boolean }>`
  position: absolute;
  transform: translate(-50%, -50%);
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  cursor: pointer;
  font-size: ${({ $active }) =>
    $active ? `clamp(14px, 2vw, ${theme.fontSize.ml})` : `clamp(12px, 1.8vw, ${theme.fontSize.m})`};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.gray900)};
  font-weight: ${({ $active }) => ($active ? theme.fontWeight.bold : theme.fontWeight.medium)};
  white-space: nowrap;

  &:hover {
    color: #4f63ff;
    font-weight: bold;
  }
`;
