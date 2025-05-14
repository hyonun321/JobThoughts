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

const MotionCharacter = styled(motion.div)`
  position: absolute;
  bottom: 380px;
  transform: translateX(-50%);
  width: 280px;
  z-index: 2;
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
      rocketControls.set('initial'); // reset
      rocketControls.start('animate'); // trigger animation
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
      <motion.div
        ref={button.ref}
        initial="hidden"
        animate={button.controls}
        variants={fadeInVariants}
        style={{ zIndex: 2 }}
      >
        <Button
          onClick={() => navigate('/test')}
          text="지금 시작하기"
          padding="20px 72px"
          size="lg"
          color="primary"
          transition="all 0.3s ease"
          backgroundColor="white"
          hoverColor="primary"
          boxShadow="0px 0px 10px rgba(79, 99, 255, 0.4)"
        />
      </motion.div>

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
