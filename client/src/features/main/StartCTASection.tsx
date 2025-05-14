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

// ======================== types ========================
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

// ======================== styled-components ========================
const CTAWrapper = styled(FullScreenSection)`
  width: 100vw;
  height: 150vh;
  background: linear-gradient(to bottom, #ffffff 0%, #4f63ff 50%, #000000 100%);
  position: relative;
  overflow: hidden;
`;

const MotionCharacter = styled(motion.div)`
  margin-top: 40px;
  width: 280px;
  z-index: 2;
  display: flex;
  justify-content: center;
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

// ======================== components ========================
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
  <motion.div
    ref={refObj}
    initial="hidden"
    animate={animation}
    variants={fadeInVariants}
    style={{ position: 'absolute', top, left, right, width, zIndex: 1 }}
  >
    <Image src={src} alt={alt} width="100%" motion="float" />
  </motion.div>
);

export default function StartCTASection() {
  const navigate = useNavigate();

  const arrow = useScrollAnimation(0.4);
  const key = useScrollAnimation(0.4);
  const compass = useScrollAnimation(0.4);
  const button = useScrollAnimation(0.4);
  const bear = useScrollAnimation(0.4);

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
      <PositionedIcon
        refObj={arrow.ref}
        animation={arrow.controls}
        src={arrowImg}
        alt="시작 화살표"
        top="30px"
        width="250px"
      />
      <PositionedIcon
        refObj={key.ref}
        animation={key.controls}
        src={keyImg}
        alt="열쇠 이미지"
        top="200px"
        left="100px"
        width="250px"
      />
      <PositionedIcon
        refObj={compass.ref}
        animation={compass.controls}
        src={compassImg}
        alt="나침반 이미지"
        top="480px"
        right="100px"
        width="200px"
      />
      <motion.div
        ref={rocketRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <RocketImage
          src={rocketImg}
          alt="rocket"
          variants={rocketVariants}
          initial="initial"
          animate={rocketControls}
        />
      </motion.div>

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
