import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { motion, type Variants } from 'framer-motion';
import FullScreenSection from '../../components/FullScreenSection';
import Button from '../../components/Button';
import Image from '../../components/Image';
import rocketImg from '../../assets/icons/icon-rocket.svg';
import keyImg from '../../assets/icons/icon-key.svg';
import bearBodyImg from '../../assets/bears/bears-cta-body.svg';
import bearHandImg from '../../assets/bears/bears-cta-hand.svg';
import arrowImg from '../../assets/icons/icon-start-arrow.svg';

// ======================== 타입 ========================
type PositionedIconProps = {
  src: string;
  alt: string;
  top?: string;
  left?: string;
  right?: string;
  width?: string;
  refObj: React.Ref<HTMLDivElement>;
  animation: ReturnType<typeof useScrollAnimation>['controls'];
};

// ======================== 스타일 ========================

// CTA 전체 영역 (배경 및 전체 화면 섹션)
const CTAWrapper = styled(FullScreenSection)`
  width: 100vw;
  height: clamp(100vh, 160vh, 200vh);
  background: linear-gradient(to bottom, #ffffff 0%, #4f63ff 40%, #000000 100%);
  position: relative;
  overflow: hidden;
`;

// 캐릭터 위치 스타일
const MotionCharacter = styled(motion.div)`
  margin-top: clamp(1rem, 4vw, 4rem);
  width: clamp(160px, 60vw, 260px);
  z-index: 2;
  display: flex;
  justify-content: center;
`;

// CTA버튼 위치 지정용 wrapper
const ButtonWrapper = styled(motion.div)`
  z-index: 2;
  display: flex;
  justify-content: center;
`;

const BearWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 300px;
`;

const BearHandWrapper = styled.div`
  position: absolute;
  top: 0px;
  z-index: 1;
`;

const BearBodyWrapper = styled.div`
  position: relative;
  z-index: 2;
`;
// 아이콘(화살표/열쇠/우주선) 위치 지정용 wrapper
const PositionedWrapper = styled(motion.div)<{
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
const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// ======================== 개별 아이콘 컴포넌트 ========================
const PositionedIcon = ({
  src,
  alt,
  top,
  left,
  right,
  width,
  refObj,
  animation,
}: PositionedIconProps) => (
  <PositionedWrapper
    ref={refObj}
    initial="hidden"
    animate={animation}
    variants={fadeInVariants}
    top={top}
    left={left}
    right={right}
    width={width}
  >
    <Image src={src} alt={alt} width="100%" motion="float" />
  </PositionedWrapper>
);

// ======================== 메인 컴포넌트 ========================
export default function StartCTASection() {
  const navigate = useNavigate();

  // 스크롤 애니메이션 제어 (커스텀 훅)
  const arrow = useScrollAnimation(0.4);
  const key = useScrollAnimation(0.4);
  const rocket = useScrollAnimation(0.4);
  const button = useScrollAnimation(0.4);
  const bear = useScrollAnimation(0.4);

  // 반복 렌더링을 위한 아이콘 리스트
  const iconList = [
    {
      refObj: arrow.ref,
      animation: arrow.controls,
      src: arrowImg,
      alt: '시작 화살표',
      top: '5%',
      width: '18vw',
    },
    {
      refObj: key.ref,
      animation: key.controls,
      src: keyImg,
      alt: '열쇠 이미지',
      top: '15%',
      left: '-2%',
      width: '25vw',
    },
    {
      refObj: rocket.ref,
      animation: rocket.controls,
      src: rocketImg,
      alt: '우주선 이미지',
      top: '5%',
      right: '-2%',
      width: '35vw',
    },
  ];

  return (
    <CTAWrapper>
      {/* 아이콘들 렌더링 */}
      {iconList.map((icon, idx) => (
        <PositionedIcon key={idx} {...icon} />
      ))}

      {/* 시작하기 버튼 */}
      <ButtonWrapper
        ref={button.ref}
        initial="hidden"
        animate={button.controls}
        variants={fadeInVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={() => navigate('/test')}
          variant="main"
          text="지금 시작하기"
          fontWeight="bold"
        />
      </ButtonWrapper>

      {/* 캐릭터 이미지 */}
      <MotionCharacter
        ref={bear.ref}
        initial="hidden"
        animate={bear.controls}
        variants={fadeInVariants}
      >
        <BearWrapper>
          <BearBodyWrapper>
            <Image src={bearBodyImg} alt="곰 몸통" width="100%" />
          </BearBodyWrapper>
          <BearHandWrapper>
            <Image src={bearHandImg} alt="곰 손" width="100%" motion="shake" />
          </BearHandWrapper>
        </BearWrapper>
      </MotionCharacter>
    </CTAWrapper>
  );
}
