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

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.25,
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
    '"이 길이 맞는지 고민만 하고 있어요"',
    '"나랑 어울리는 일이 뭘까요?"',
    '"막막한데, 어디서부터 봐야 하죠?"',
  ];

  const bearAnimation = useScrollAnimation();
  const sentence1 = useScrollAnimation();
  const sentence2 = useScrollAnimation();
  const sentence3 = useScrollAnimation();

  const animations = [sentence1, sentence2, sentence3];

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

      {/* 순서대로 등장하는 문장 */}
      <WordWrapper>
        {lines.map((line, i) => {
          const { ref, controls } = animations[i]; // 각 문장마다 ref & controls 사용
          return (
            <motion.h1
              key={i}
              ref={ref} // 각 문장에 스크롤 감지 ref 걸기
              custom={i}
              initial="hidden"
              animate={controls} // 각 문장마다 애니메이션 상태 연동
              variants={wordVariants}
            >
              {line}
            </motion.h1>
          );
        })}
      </WordWrapper>
    </Section>
  );
}
