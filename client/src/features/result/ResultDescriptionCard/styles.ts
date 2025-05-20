import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Card = styled.div`
  position: relative;
  width: clamp(150px, 40vw, 500px);
  min-height: clamp(300px, 50vw, 400px);
  display: flex;
  flex-direction: column;
  background: #f9fbff;
  border-radius: 16px;
  padding: 16px 24px;
  box-shadow:
    inset 10px 10px 10px 4px rgba(255, 255, 255, 0.6),
    inset -5px -5px 15px 4px rgba(193, 215, 249, 1);

  & p {
    padding-left: clamp(8px, 1vw, 10px);
  }

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}`;

export const SectionTitle = styled.h3`
  width: clamp(80px, 20vw, 100px);
  background-color: white;
  border-radius: 100px;
  box-shadow: 0px 1px 3px rgba(79, 99, 255, 0.5);
  padding: clamp(3px, 0.8vw, 5px) clamp(8px, 1vw, 12px);
  text-align: center;
  font-size: clamp(${theme.fontSize.xs}, 2vw, ${theme.fontSize.m});
`;

export const SectionContent = styled.p`
  font-size: clamp(${theme.fontSize.xs}, 2vw, ${theme.fontSize.m});
  line-height: clamp(18px, 4vw, 28px);
`;
