import { motion } from 'framer-motion';
import Text from '@/components/Text';
import useScrollAnimation from '@/hooks/useScrollAnimation'; // ✅ 수정됨
import worriedBear from '@/assets/bears/worried-bear.svg';
import dot from '@/assets/bears/png/worried-bear-dot.png';
import {
  Dot,
  dotVariants,
  Section,
  DotWrapper,
  ImgWrapper,
  WordWrapper,
  wordVariants,
  fadeInVariants,
} from './styles';

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
