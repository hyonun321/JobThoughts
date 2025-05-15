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

/* ===== 애니메이션 Variants ===== */
const containerVariants: Variants = { hidden: {}, visible: {} };

const shapeVariants: Variants = {
  hidden: () => ({ x: 0, y: 0, scale: 0.1, opacity: 0 }),
  visible: (pos) => ({
    x: pos.x * 700,
    y: pos.y * 700,
    scale: pos.size,
    opacity: 1,
    transition: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.5 },
  }),
};

const bearVariants: Variants = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.3, ease: 'easeOut', delay: 0.5 },
  },
};

/* ===== 컴포넌트 ===== */
export default function TitleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: false }); // 스크롤 진입·이탈 감지
  const controls = useAnimation();

  /* ⭐ 좌표를 state로 관리: inView 가 true일 때만 새로 만든다 */
  const [circles, setCircles] = useState<{ x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');

    if (inView) {
      /* 진입할 때마다 새 좌표 생성 */
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
      /* 뷰포트를 벗어나면 좌표를 비워 재생성 준비 */
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

        <motion.div
          variants={textVariants}
          custom={1}
          style={{ position: 'absolute', top: '30%', left: '15%' }}
        >
          <Text as="h1" size="120px" weight="bold" color="primary" align="left">
            무슨 생각?
          </Text>
        </motion.div>

        <motion.div
          variants={textVariants}
          custom={2}
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
