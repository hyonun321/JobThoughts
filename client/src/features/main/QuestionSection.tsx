import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import worriedBear from '../../assets/worried-bear.png';
import Text from '../../components/Text';
import { style } from 'framer-motion/client';
import { useAnimate } from 'framer-motion';

// 스타일 정의하기
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

// 애니메이션 적용하기

// 최적화하기 (훅 사용)

export default function QuestionSection() {
  return (
    <Section>
      {/* 1. 걱정하는 곰돌이 이미지 */}
      <ImgWrapper>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <img src={worriedBear} />
        </motion.div>
      </ImgWrapper>
      <WordWrapper>
        {/* 2. 문장 - 1 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Text as="h1" weight="bold" color="black" align="left">
            "이 길이 맞는지 고민만 하고 있어요"
          </Text>
        </motion.div>
        {/* 3. 문장 - 2 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Text as="h1" weight="bold" color="black" align="left">
            "나랑 어울리는 일이 뭘까요?"
          </Text>
        </motion.div>
        {/* 4. 문장 - 3 */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          whileTap={{ scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Text as="h1" weight="bold" color="black" align="left">
            "막막한데 어디서부터 봐야 하죠?"
          </Text>
        </motion.div>
      </WordWrapper>
    </Section>
  );
}
