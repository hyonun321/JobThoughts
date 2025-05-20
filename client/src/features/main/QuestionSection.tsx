import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { theme } from '../../styles/theme';
import Text from '../../components/Text';
import useScrollAnimation from '../../hooks/useScrollAnimation'; // ✅ 수정됨

// 이미지 리소스
import worriedBear from '../../assets/bears/worried-bear.svg';
import dot from '../../assets/worried-bear-dot.png';

// ================= styled components =================
// 전체 레이아웃 스타일
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

// 이미지 스타일
const ImgWrapper = styled.div`
  width: clamp(250px, 30vw, 600px); // 반응형 곰돌이 크기 자동 조정
  img {
    width: 100%;
    object-fit: contain;
  }
`;

// 문장 스타일
const WordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 4vw, 2rem);
  h1 {
    font-size: clamp(22px, 3.125vw, ${theme.fontSize.xxl});
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    h1 {
      text-align: center;
      white-space: wrap;
    }
  }
`;

// 곰돌이 머리 위 점 스타일
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
      delay: i * 0.5,
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

// ================= component =================
export default function QuestionSection() {
  const lines = [
    '"이 길이 맞는지 고민만 하고 있어요"',
    '"나랑 어울리는 일이 뭘까요?"',
    '"막막한데, 어디서부터 봐야 하죠?"',
  ];

  const [dotAnimation, bearAnimation] = [useScrollAnimation(), useScrollAnimation()];
  const sentenceAnimation1 = useScrollAnimation();
  const sentenceAnimation2 = useScrollAnimation();
  const sentenceAnimation3 = useScrollAnimation();

  const sentenceAnimations = [sentenceAnimation1, sentenceAnimation2, sentenceAnimation3];

  const dots = () =>
    [0, 1, 2].map((i) => (
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
    ));

  const sentences = () =>
    lines.map((line, i) => {
      const { ref, controls } = sentenceAnimations[i]; // 각 문장마다 ref & controls 사용
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
    });

  return (
    <Section>
      {/* 곰돌이 & 점 찍기 */}
      <DotWrapper ref={dotAnimation.ref}>
        {/* 점 3개 순서대로 찍기 */}
        {dots()}
        <ImgWrapper ref={bearAnimation.ref}>
          <motion.div initial="hidden" animate={bearAnimation.controls} variants={fadeInVariants}>
            <img src={worriedBear} alt="곰돌이" />
          </motion.div>
        </ImgWrapper>
      </DotWrapper>

      {/* 순서대로 등장하는 문장 */}
      <WordWrapper>{sentences()}</WordWrapper>
    </Section>
  );
}
