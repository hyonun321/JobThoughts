import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import worriedBear from '../../assets/worried-bear.png';
import Text from '../../components/Text';
import { style } from 'framer-motion/client';
import { useAnimate } from 'framer-motion';

// ======================= styled components =======================
const Section = styled.section`
  border: 1px solid red;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 5rem;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 0px 10px;

  @media (max-width: 768px) {
    gap: 0.5rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    gap: 0.25rem;
    flex-direction: column;
  }
`;

const ImgWrapper = styled.div`
  border: 1px solid blue;
  width: 400px;
  height: auto;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    width: 250px;
  }

  @media (max-width: 480px) {
    width: 200px;
  }
`;

const WordWrapper = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    font-size: 40px;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    h1 {
      font-size: 25px;
    }
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    flex-direction: column;
    h1 {
      font-size: 20px;
    }
  }
`;

// ======================= animation variants =======================
const typingVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const lineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 2, // 줄마다 2초 간격으로 등장
      staggerChildren: 0.1, // 글자마다 0.1초씩 타이핑
    },
  }),
};

export default function QuestionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const sentences = [
    '뭐가 맞는지 솔직히 모르겠고',
    '대충 살고 싶진 않은데',
    '일단 해봐야 아는 거 맞죠?',
  ];

  return (
    <Section ref={containerRef}>
      {/* 1. 걱정하는 곰돌이 이미지 */}
      <ImgWrapper>
        <motion.img
          src={worriedBear}
          drag
          dragConstraints={containerRef} // 화면 기준 범위 제한
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </ImgWrapper>

      <WordWrapper>
        {sentences.map((sentence, lineIndex) => (
          <motion.div
            key={lineIndex}
            custom={lineIndex}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
          >
            <Text as="h1" weight="bold" color="black" style={{ whiteSpace: 'nowrap' }}>
              {sentence.split('').map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={typingVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: lineIndex * 2 + i * 0.1,
                    duration: 0,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </Text>
          </motion.div>
        ))}
      </WordWrapper>
    </Section>
  );
}
