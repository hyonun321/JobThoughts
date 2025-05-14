import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import worriedBear from '../../assets/worried-bear.png';
import Text from '../../components/Text';

// ================= styled components =================
const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 0 10px;
  background: #fff;
  overflow: hidden;
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
  @media (max-width: 480px) {
    h1 {
      font-size: 20px;
    }
  }
`;

// ================= animation variants =================
const typingVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.09,
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
  const line1 = useScrollAnimation(0.5);
  const line2 = useScrollAnimation(0.5);
  const line3 = useScrollAnimation(0.5);

  const renderTyping = (text: string, controls: any, ref: any, lineIndex: number) => {
    const baseDelay = lineIndex * text.length * 0.09; // 줄마다 시작 딜레이 누적
    return (
      <motion.div ref={ref} initial="hidden" animate={controls}>
        <Text as="h1" weight="bold" color="black">
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: baseDelay + i * 0.09,
                    duration: 0.1,
                  },
                },
              }}
              style={{ display: 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </Text>
      </motion.div>
    );
  };

  return (
    <Section>
      <ImgWrapper>
        <motion.img src={worriedBear} />
      </ImgWrapper>

      <WordWrapper>
        {renderTyping('뭐가 맞는지 솔직히 모르겠고', line1.controls, line1.ref, 0)}
        {renderTyping('나랑 어울리는 일이 있을까?', line2.controls, line2.ref, 1)}
        {renderTyping('막막한데, 어디서부터 봐야 하지?', line3.controls, line3.ref, 2)}
      </WordWrapper>
    </Section>
  );
}
