import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import worriedBear from '../../assets/worried-bear.png';
import Text from '../../components/Text';

// ================= styled components =================
const Section = styled.section`
  display: flex;
  gap: 8rem;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 0 20px;
  background: #fff;
  overflow: hidden;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const ImgWrapper = styled.div`
  width: 400px;
  img {
    width: 100%;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    width: 300px;
  }
  @media (max-width: 480px) {
    width: 200px;
  }
`;

const WordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  h1 {
    font-size: 40px;
    white-space: nowrap;
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 30px;
    }
  }
  @media (max-width: 480px) {
    h1 {
      font-size: 20px;
      text-align: center;
    }
  }
`;

// ================= animation variants =================
const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const typingVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { index: number; baseDelay: number }) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom.baseDelay + custom.index * 0.09,
      duration: 0.1,
    },
  }),
};

// ================= custom hook =================
function useScrollAnimation(amount = 0.5) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, amount });
  const controls = useAnimation();

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [inView, controls]);

  return { ref, controls };
}

// ================= component =================
export default function QuestionSection() {
  const lines = [
    '이 길이 맞는지 고민만 하고 있어요',
    '나랑 어울리는 일이 뭘까요?',
    '막막한데, 어디서부터 봐야 하죠?',
  ];
  const bearAnimation = useScrollAnimation();
  const anim0 = useScrollAnimation();
  const anim1 = useScrollAnimation();
  const anim2 = useScrollAnimation();

  const animations = [anim0, anim1, anim2];

  return (
    <Section>
      {/* 곰돌이 이미지 */}
      <ImgWrapper ref={bearAnimation.ref}>
        <motion.div
          initial="hidden"
          animate={bearAnimation.controls}
          whileHover={{ scale: 1.05 }}
          variants={fadeInVariants}
        >
          <img src={worriedBear} alt="곰돌이" />
        </motion.div>
      </ImgWrapper>

      {/* 타이핑 문장 */}
      <WordWrapper>
        {lines.map((line, lineIndex) => {
          const { controls, ref } = animations[lineIndex];
          const baseDelay = lineIndex * line.length * 0.09;

          return (
            <motion.div key={lineIndex} ref={ref} initial="hidden" animate={controls}>
              <Text as="h1" weight="bold" color="black">
                {line.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    custom={{ index: i, baseDelay }}
                    initial="hidden"
                    animate={controls}
                    variants={typingVariants}
                    style={{ display: 'inline-block' }}
                  >
                    {char === ' ' ? '\u00A0' : char} {/* 공백 문자 안전하게 처리 */}
                  </motion.span>
                ))}
              </Text>
            </motion.div>
          );
        })}
      </WordWrapper>
    </Section>
  );
}
