import useScrollAnimation from '../../hooks/useScrollAnimation';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styled, { useTheme } from 'styled-components';
import Text from '../../components/Text';
import Image from '../../components/Image';
import iconScroll from '../../assets/icons/icon-scroll.png';
import iconStar from '../../assets/icons/icon-star.png';
import iconMoon from '../../assets/icons/icon-moon.png';
import lyingBear from '../../assets/lying-bear.png';

const NextSection = styled.section`
  width: 100vw;
  background: linear-gradient(to bottom, #000000 0%, #4f63ff 50%, #ffffff 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding: clamp(40px, 6vw, 100px) 0;
`;

const ResponsiveBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SectionGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(30px, 5vw, 60px);
  padding: clamp(85px, 6vw, 80px) 0;
`;

const WordWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
  padding: 0 5vw;
  text-align: center;

  span {
    font-size: clamp(1.6rem, 6vw, 3.75rem);
    font-weight: 700;
  }
`;

const Row = styled(motion.div)<{ align?: 'left' | 'right' }>`
  width: 100%;
  display: flex;
  justify-content: ${({ align }) =>
    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'};
  padding: ${({ align }) =>
    align === 'right' ? '0 0 0 10vw' : align === 'left' ? '0 10vw 0 0' : '0 10vw'};

  @media (max-width: 768px) {
    padding: 0 6vw;
  }
`;

const TextRow = styled(motion.div)<{ align?: 'left' | 'right'; isSecond?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ align }) =>
    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center'};
  padding: 0 10vw;

  @media (min-width: 1100px) {
    margin-right: ${({ isSecond }) => (isSecond ? '-70px' : '0')};
    margin-left: ${({ isSecond }) => (isSecond ? '0' : '-300px')};
  }

  @media (max-width: 1100px) {
    padding: 0 6vw;
    justify-content: center;
    margin: 0;
    text-align: center;
  }
`;

const MobileTextWrapper = styled.div<{ align?: 'left' | 'right' }>`
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  text-align: ${({ align }) => align || 'left'};

  @media (max-width: 1100px) {
    transform: scale(0.85);
    transform-origin: center;
    text-align: center;
  }
`;

const FinalSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 768px) {
    gap: 16px;
    margin-top: 20px;
  }
`;

export default function MessageSection() {
  const theme = useTheme();

  const scroll = useScrollAnimation();
  const star = useScrollAnimation();
  const text1 = useScrollAnimation();
  const text2 = useScrollAnimation();
  const moon = useScrollAnimation();
  const bear = useScrollAnimation();

  const words = ['잡생각은,', '이런', '걸', '합니다'];

  return (
    <NextSection>
      <ResponsiveBox>
        <SectionGroup>
          <motion.div
            ref={scroll.ref}
            initial="hidden"
            animate={scroll.controls}
            variants={fadeInVariants}
          >
            <Image
              src={iconScroll}
              alt="스크롤 아이콘"
              width="clamp(40px, 10vw, 80px)"
              motion="float"
            />
          </motion.div>
        </SectionGroup>

        <SectionGroup>
          <Row
            ref={star.ref}
            initial="hidden"
            animate={star.controls}
            variants={fadeInVariants}
            align="right"
          >
            <Image src={iconStar} alt="별 아이콘" width="clamp(50px, 12vw, 100px)" motion="float" />
          </Row>

          <TextRow
            ref={text1.ref}
            initial="hidden"
            animate={text1.controls}
            variants={fadeInVariants}
            align="left"
          >
            <MobileTextWrapper align="left">
              <Text
                as="h2"
                size="clamp(1.3rem, 6vw, 3.75rem)"
                weight="bold"
                color="white"
                align="center"
              >
                하고 싶은 일을 몰라도 괜찮아요
              </Text>
            </MobileTextWrapper>
          </TextRow>

          <TextRow
            ref={text2.ref}
            initial="hidden"
            animate={text2.controls}
            variants={fadeInVariants}
            align="right"
            isSecond
          >
            <MobileTextWrapper align="right">
              <Text
                as="h2"
                size="clamp(1.3rem, 6vw, 3.75rem)"
                weight="bold"
                color="white"
                align="center"
              >
                우리는 당신에게 맞는 길부터 찾으니까요
              </Text>
            </MobileTextWrapper>
          </TextRow>

          <Row
            ref={moon.ref}
            initial="hidden"
            animate={moon.controls}
            variants={fadeInVariants}
            align="left"
          >
            <Image src={iconMoon} alt="달 아이콘" width="clamp(60px, 14vw, 110px)" motion="float" />
          </Row>
        </SectionGroup>

        <SectionGroup
          as={FinalSection}
          ref={bear.ref}
          initial="hidden"
          animate={bear.controls}
          variants={fadeInVariants}
        >
          <Image
            src={lyingBear}
            alt="누워있는 곰"
            width="clamp(200px, 40vw, 450px)"
            motion="float"
          />
          <WordWrap>
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={wordVariants}
                viewport={{ once: false, amount: 0.5 }}
              >
                {i === 0 ? (
                  <>
                    <span style={{ color: theme.colors.primary }}>잡생각</span>은,
                  </>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </WordWrap>
        </SectionGroup>
      </ResponsiveBox>
    </NextSection>
  );
}

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.15,
    },
  }),
};
