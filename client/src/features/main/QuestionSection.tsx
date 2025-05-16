import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView, useAnimation } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { theme } from '../../styles/theme';
import Text from '../../components/Text';

// 이미지
import worriedBear from '../../assets/bears/worried-bear.svg';
import dot from '../../assets/worried-bear-dot.png';

// ================= styled components =================
const Section = styled.section`
  display: flex;
  gap: clamp(0.75rem, 1vw, 1rem);
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150vh;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ImgWrapper = styled.div`
  width: clamp(250px, 30vw, 600px); // 반응형 곰돌이 크기 자동 조정
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const WordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 4vw, 2rem);
  h1 {
    font-size: clamp(${theme.fontSize.s}, 4vw, ${theme.fontSize.xxl});
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    h1 {
      text-align: center;
    }
  }
`;

const DotWrapper = styled.div`
  position: relative;
`;

const Dot = styled(motion.img)<{ index: number }>`
  position: absolute;
  top: -25px;
  left: ${({ index }) => `${39 + index * 8}%`}; // 오른쪽으로 퍼지게
  width: clamp(8px, 1vw, 12px);
  height: auto;
`;

// ================= animation variants =================
const dotVariants: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.5, // 점 하나씩 0.2초 간격 등장
    },
  }),
};

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
  const dotAnimation = useScrollAnimation();
  const sentence1 = useScrollAnimation();
  const sentence2 = useScrollAnimation();
  const sentence3 = useScrollAnimation();

  const animations = [sentence1, sentence2, sentence3];

  return (
    <Section>
      {/* 곰돌이 & 점 찍기 */}
      <DotWrapper ref={dotAnimation.ref}>
        {/* 점 3개 순서대로 찍기 */}
        {[0, 1, 2].map((i) => (
          <Dot
            key={i}
            index={i}
            src={dot}
            alt="곰돌이점"
            initial="hidden"
            animate={dotAnimation.controls}
            custom={i}
            variants={dotVariants}
          />
        ))}

        <ImgWrapper ref={bearAnimation.ref}>
          <motion.div initial="hidden" animate={bearAnimation.controls} variants={fadeInVariants}>
            <img src={worriedBear} alt="곰돌이" />
          </motion.div>
        </ImgWrapper>
      </DotWrapper>

      {/* 순서대로 등장하는 문장 */}
      <WordWrapper>
        {lines.map((line, i) => {
          const { ref, controls } = animations[i]; // 각 문장마다 ref & controls 사용
          return (
            <motion.div
              key={i}
              ref={ref} // 각 문장에 스크롤 감지 ref 걸기
              custom={i}
              initial="hidden"
              animate={controls} // 각 문장마다 애니메이션 상태 연동
              variants={wordVariants}
            >
              <Text as="h1" size="40px" weight="bold" color="gray900" align="left">
                {line}
              </Text>
            </motion.div>
          );
        })}
      </WordWrapper>
    </Section>
  );
}
