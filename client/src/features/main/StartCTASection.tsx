import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { motion, useAnimation, useInView, type Variants } from 'framer-motion';
import FullScreenSection from '../../components/FullScreenSection';
import Button from '../../components/Button';
import Image from '../../components/Image';
import rocketImg from '../../assets/icons/icon-rocket.png';
import keyImg from '../../assets/icons/icon-key.png';
import compassImg from '../../assets/icons/icon-compass.png';
import bearImg from '../../assets/start-bear.png';
import arrowImg from '../../assets/icons/icon-start-arrow.png';

// ======================== 타입 ========================
type PositionedIconProps = {
  src: string;
  alt: string;
  top?: string;
  left?: string;
  right?: string;
  width?: string;
  refObj: React.Ref<HTMLDivElement>;
  animation: ReturnType<typeof useAnimation>;
};

// ======================== 스타일 ========================

// CTA 전체 영역 (배경 및 전체 화면 섹션)
const CTAWrapper = styled(FullScreenSection)`
  width: 100vw;
  height: 150vh;
  background: linear-gradient(to bottom, #ffffff 0%, #4f63ff 50%, #000000 100%);
  position: relative;
  overflow: hidden;
`;

// 우주선 이미지 스타일
const RocketImage = styled(motion.img)`
  position: absolute;
  top: 300px;
  right: -100px;
  width: 300px;
  transform: rotate(-20deg);
  z-index: 10;
`;

// 우주선 wrapper (포인터 이벤트 막기용)
const RocketWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  pointer-events: none;
`;

// 캐릭터 위치 스타일
const MotionCharacter = styled(motion.div)`
  margin-top: 40px;
  width: 280px;
  z-index: 2;
  display: flex;
  justify-content: center;
`;

// 아이콘(화살표/열쇠/나침반 등) 위치 지정용 wrapper
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
  width: ${({ width }) => width || 'auto'};
  z-index: 1;
`;

// ======================== 애니메이션 정의 ========================

// 스크롤 등장용 fade-in 애니메이션
const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// 우주선 날아가는 애니메이션
const rocketVariants: Variants = {
  initial: { x: 0, y: 0, opacity: 1, scale: 1 },
  animate: {
    x: -2000,
    y: -800,
    opacity: 0,
    scale: 3,
    transition: { duration: 4, ease: 'easeInOut' },
  },
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
  const compass = useScrollAnimation(0.4);
  const button = useScrollAnimation(0.4);
  const bear = useScrollAnimation(0.4);

  // 반복 렌더링을 위한 아이콘 리스트
  const iconList = [
    {
      refObj: arrow.ref,
      animation: arrow.controls,
      src: arrowImg,
      alt: '시작 화살표',
      top: '50px',
      width: '250px',
    },
    {
      refObj: key.ref,
      animation: key.controls,
      src: keyImg,
      alt: '열쇠 이미지',
      top: '200px',
      left: '100px',
      width: '250px',
    },
    {
      refObj: compass.ref,
      animation: compass.controls,
      src: compassImg,
      alt: '나침반 이미지',
      top: '480px',
      right: '100px',
      width: '200px',
    },
  ];

  // 우주선 애니메이션 제어
  const rocketRef = useRef(null);
  const inView = useInView(rocketRef, { amount: 0.3 });
  const rocketControls = useAnimation();

  useEffect(() => {
    if (inView) {
      rocketControls.set('initial');
      rocketControls.start('animate');
    }
  }, [inView, rocketControls]);

  return (
    <CTAWrapper>
      {/* 아이콘들 렌더링 */}
      {iconList.map((icon, idx) => (
        <PositionedIcon key={idx} {...icon} />
      ))}

      {/* 우주선 애니메이션 */}
      <RocketWrapper ref={rocketRef}>
        <RocketImage
          src={rocketImg}
          alt="rocket"
          variants={rocketVariants}
          initial="initial"
          animate={rocketControls}
        />
      </RocketWrapper>

      {/* 시작하기 버튼 */}
      <motion.div
        ref={button.ref}
        initial="hidden"
        animate={button.controls}
        variants={fadeInVariants}
        style={{ zIndex: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button onClick={() => navigate('/test')} variant="main" text="지금 시작하기" />
      </motion.div>

      {/* 캐릭터 이미지 */}
      <MotionCharacter
        ref={bear.ref}
        initial="hidden"
        animate={bear.controls}
        variants={fadeInVariants}
      >
        <Image src={bearImg} alt="곰 캐릭터" width="100%" />
      </MotionCharacter>
    </CTAWrapper>
  );
}
