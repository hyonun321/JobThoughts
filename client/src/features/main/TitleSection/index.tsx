import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Text from '@/components/Text';
import spaceBear from '@/assets/bears/png/space-bear.png';
import {
  Section,
  TextGroup,
  Shape,
  Bear,
  bearVariants,
  textVariants,
  shapeVariants,
  containerVariants,
} from './styles';

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
              size="clamp(2.5rem, 8vw, 7.5rem)"
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
