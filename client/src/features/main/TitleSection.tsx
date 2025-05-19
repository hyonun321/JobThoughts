import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styled from 'styled-components';
import Text from '../../components/Text';
import spaceBear from '../../assets/space-bear.png';

/* ===== styled-components ===== */
const Section = styled.section`
  width: 100vw;
  height: 90vh;
  position: relative;
  overflow: hidden;
  background: black;
  z-index: 1;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const Shape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: #d0f5ff;
`;

const Bear = styled(motion.img)`
  position: absolute;
  top: 20%;
  left: 60%;
  transform: translate(-50%, -50%);
  width: clamp(180px, 33vw, 500px);
  pointer-events: none;

  @media (max-width: 768px) {
    left: 55%;
    top: 30%;
  }
`;

const TextGroup = styled(motion.div)`
  position: absolute;
  top: 25vh;
  left: 15vw;
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 4vh, 3rem);

  @media (max-width: 768px) {
    top: 20vh;
    left: 10vw;
    gap: 1.5rem;
  }
`;

/* ===== 애니메이션 Variants ===== */
const containerVariants: Variants = { hidden: {}, visible: {} };

const shapeVariants: Variants = {
  hidden: () => ({ x: 0, y: 0, scale: 0.1, opacity: 0 }),
  visible: (pos) => ({
    x: pos.x * 700,
    y: pos.y * 700,
    scale: pos.size,
    opacity: 1,
    transition: { duration: 1.3, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.4 },
  }),
};

const bearVariants: Variants = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.1, ease: 'easeOut', delay: 0.4 },
  },
};

/* ===== 컴포넌트 ===== */
export default function TitleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: false });
  const controls = useAnimation();

  const [circles, setCircles] = useState<{ x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');

    if (inView) {
      const newCircles = Array.from({ length: 30 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random();
        const size = Math.random() * 0.6 + 0.4;
        return {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          size,
        };
      });
      setCircles(newCircles);
    } else {
      setCircles([]);
    }
  }, [inView, controls]);

  return (
    <Section>
      <motion.div
        ref={ref}
        style={{ width: '100%', height: '100%' }}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {circles.map((pos, i) => (
          <Shape
            key={i}
            variants={shapeVariants}
            initial="hidden"
            animate="visible"
            custom={pos}
            style={{
              top: '50%',
              left: '50%',
              width: `${20 * pos.size}px`,
              height: `${20 * pos.size}px`,
            }}
          />
        ))}

        <TextGroup>
          <motion.div variants={textVariants} custom={1}>
            <Text
              as="h1"
              size="clamp(2.8rem, 8vw, 7.5rem)"
              weight="bold"
              color="primary"
              align="left"
            >
              무슨 생각?
            </Text>
          </motion.div>

          <motion.div variants={textVariants} custom={2}>
            <Text
              as="h1"
              size="clamp(2.5rem, 8vw, 7.5rem)"
              weight="bold"
              color="white"
              align="left"
            >
              잡 생각
            </Text>
          </motion.div>
        </TextGroup>

        <Bear src={spaceBear} alt="우주곰" variants={bearVariants} />
      </motion.div>
    </Section>
  );
}
