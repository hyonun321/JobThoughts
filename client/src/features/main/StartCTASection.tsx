import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView, type Variants } from 'framer-motion';
import FullScreenSection from '../../components/FullScreenSection';
import Button from '../../components/Button';
import Image from '../../components/Image';
import rocketImg from '../../assets/icons/icon-rocket.png';
import keyImg from '../../assets/icons/icon-key.png';
import compassImg from '../../assets/icons/icon-compass.png';
import bearImg from '../../assets/start-bear.png';
import arrowImg from '../../assets/icons/icon-start-arrow.png';

// ======================== styled-components ========================
const CTAWrapper = styled(FullScreenSection)`
  width: 100vw;
  height: 150vh;
  background: linear-gradient(to bottom, #ffffff 0%, #4f63ff 50%, #000000 100%);
  position: relative;
  overflow: hidden;
`;

const PositionedElement = styled(motion.div)<{
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

const RocketWrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  pointer-events: none;
`;

const RocketImage = styled(motion.img)`
  position: absolute;
  top: 300px;
  right: -100px;
  width: 300px;
  transform: rotate(-20deg);
  z-index: 10;
`;

const CTAButtonWrapper = styled(motion.div)`
  z-index: 2;

  button {
    background-color: rgba(255, 255, 255, 0.85);
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover:enabled {
      background-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 4px 4px 20px rgba(79, 99, 255, 1);
      color: white;
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;

const MotionCharacter = styled(motion.div)`
  margin-top: 40px;
  width: 280px;
  z-index: 2;
  display: flex;
  justify-content: center;
`;

// ======================== animation variants ========================
const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

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

// ======================== custom hook ========================
function useScrollAnimation(amount = 0.5) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount });
  const controls = useAnimation();

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [inView, controls]);

  return { ref, controls };
}

// ======================== 컴포넌트 ========================
export default function StartCTASection() {
  const navigate = useNavigate();

  // scroll-based animation
  const arrow = useScrollAnimation(0.4);
  const key = useScrollAnimation(0.4);
  const compass = useScrollAnimation(0.4);
  const button = useScrollAnimation(0.4);
  const bear = useScrollAnimation(0.4);

  // rocket animation control
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
      {/* 화살표 */}
      <PositionedElement
        ref={arrow.ref}
        initial="hidden"
        animate={arrow.controls}
        variants={fadeInVariants}
        top="10px"
        width="250px"
      >
        <Image src={arrowImg} alt="시작 화살표" width="100%" motion="float" />
      </PositionedElement>

      {/* 열쇠 */}
      <PositionedElement
        ref={key.ref}
        initial="hidden"
        animate={key.controls}
        variants={fadeInVariants}
        top="200px"
        left="100px"
        width="250px"
      >
        <Image src={keyImg} alt="열쇠 이미지" width="100%" motion="float" />
      </PositionedElement>

      {/* 나침반 */}
      <PositionedElement
        ref={compass.ref}
        initial="hidden"
        animate={compass.controls}
        variants={fadeInVariants}
        top="480px"
        right="100px"
        width="200px"
      >
        <Image src={compassImg} alt="나침반 이미지" width="100%" motion="float" />
      </PositionedElement>

      {/* 우주선 */}
      <RocketWrapper ref={rocketRef}>
        <RocketImage
          src={rocketImg}
          alt="rocket"
          variants={rocketVariants}
          initial="initial"
          animate={rocketControls}
        />
      </RocketWrapper>

      {/* 시작 버튼 */}
      <CTAButtonWrapper
        ref={button.ref}
        initial="hidden"
        animate={button.controls}
        variants={fadeInVariants}
        whileHover={{ scale: 1.1 }} // hover 시 확대
        whileTap={{ scale: 0.98 }} // 클릭 시 살짝 축소
      >
        <Button onClick={() => navigate('/test')} variant="main" text={'지금 시작하기'} />
      </CTAButtonWrapper>

      {/* 캐릭터 */}
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
