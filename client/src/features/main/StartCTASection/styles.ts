import styled from 'styled-components';
import { motion, type Variants } from 'framer-motion';
import FullScreenSection from '../../../components/FullScreenSection';

export const CTAWrapper = styled(FullScreenSection)`
  width: 100vw;
  height: clamp(100vh, 160vh, 200vh);
  background: linear-gradient(to bottom, #ffffff 0%, #4f63ff 40%, #000000 100%);
  position: relative;
  overflow: hidden;
`;

// 캐릭터 위치 스타일
export const MotionCharacter = styled(motion.div)`
  margin-top: clamp(1rem, 4vw, 4rem);
  width: clamp(160px, 60vw, 260px);
  z-index: 2;
  display: flex;
  justify-content: center;
`;

// CTA버튼 위치 지정용 wrapper
export const ButtonWrapper = styled(motion.div)`
  z-index: 2;
  display: flex;
  justify-content: center;
`;

export const BearWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 300px;
`;

export const BearHandWrapper = styled.div`
  position: absolute;
  top: 0px;
  z-index: 1;
`;

export const BearBodyWrapper = styled.div`
  position: relative;
  z-index: 2;
`;
// 아이콘(화살표/열쇠/우주선) 위치 지정용 wrapper
export const PositionedWrapper = styled(motion.div)<{
  top?: string;
  left?: string;
  right?: string;
  width?: string;
}>`
  position: absolute;
  top: ${({ top }) => top || 'auto'};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  width: ${({ width }) => (width ? `clamp(160px, ${width}, 400px)` : 'auto')};
  z-index: 1;

  @media (max-width: 768px) {
    width: ${({ width }) => (width ? `clamp(160px, calc(${width}), 250px)` : 'auto')};
  }
`;

// ======================== 애니메이션 정의 ========================
export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
