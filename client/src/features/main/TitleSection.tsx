// TitleSection.tsx
import { useMemo, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styled from 'styled-components';
import Text from '../../components/Text';
import spaceBear from '../../assets/space-bear.png';

// ===== styled-components =====
const Section = styled.section`
  width: 100vw;
  height: 90vh;
  position: relative;
  overflow: hidden;
  background: black;
`;

const Shape = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: #d0f5ff;
`;

const Bear = styled(motion.img)`
  position: absolute;
  bottom: 10%;
  right: 13%;
  width: 500px;
  pointer-events: none;
`;

// ===== 애니메이션 Variants =====
const containerVariants: Variants = { hidden: {}, visible: {} };

const shapeVariants: Variants = {
  hidden: { scale: 0.1, opacity: 0 },
  visible: (pos: { x: number; y: number; size: number }) => ({
    x: pos.x * 700,
    y: pos.y * 700,
    scale: pos.size,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  }),
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.3 },
  }),
};

const bearVariants: Variants = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 },
  },
};

// ===== 컴포넌트 =====
export default function TitleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: false });
  const controls = useAnimation();

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [inView, controls]);

  const circles = useMemo(() => {
    return Array.from({ length: 30 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random();
      const size = Math.random() * 0.6 + 0.4;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        size,
      };
    });
  }, []);

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
            custom={pos}
            style={{
              top: '50%',
              left: '50%',
              width: `${20 * pos.size}px`,
              height: `${20 * pos.size}px`,
            }}
          />
        ))}

        <motion.div
          variants={textVariants}
          custom={0}
          style={{ position: 'absolute', top: '30%', left: '15%' }}
        >
          <Text as="h1" size="120px" weight="bold" color="primary" align="left">
            무슨 생각?
          </Text>
        </motion.div>

        <motion.div
          variants={textVariants}
          custom={1}
          style={{ position: 'absolute', top: '55%', left: '15%' }}
        >
          <Text as="h1" size="120px" weight="bold" color="white" align="left">
            잡 생각
          </Text>
        </motion.div>

        <Bear src={spaceBear} alt="우주곰" variants={bearVariants} />
      </motion.div>
    </Section>
  );
}
