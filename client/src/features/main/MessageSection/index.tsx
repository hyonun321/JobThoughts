import useScrollAnimation from '@/hooks/useScrollAnimation';
import { motion } from 'framer-motion';
import { useTheme } from 'styled-components';
import Text from '@/components/Text';
import Image from '@/components/Image';
import iconScroll from '@/assets/icons/icon-scroll.png';
import iconStar from '@/assets/icons/icon-star.png';
import iconMoon from '@/assets/icons/icon-moon.png';
import lyingBear from '@/assets/bears/lying-bear.svg';
import {
  NextSection,
  ResponsiveBox,
  SectionGroup,
  FinalSection,
  fadeInVariants,
  wordVariants,
  Row,
  TextRow,
  MobileTextWrapper,
  WordWrap,
} from './styles';

export default function MessageSection() {
  const theme = useTheme();

  const scroll = useScrollAnimation();
  const star = useScrollAnimation();
  const text1 = useScrollAnimation();
  const text2 = useScrollAnimation();
  const moon = useScrollAnimation();
  const bear = useScrollAnimation();
  const word = useScrollAnimation();

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
          <WordWrap
            ref={word.ref}
            initial="hidden"
            animate={word.controls}
            variants={fadeInVariants}
          >
            {words.map((wordText, i) => (
              <motion.span key={i} custom={i} variants={wordVariants}>
                {i === 0 ? (
                  <>
                    <span style={{ color: theme.colors.primary }}>잡생각</span>은,
                  </>
                ) : (
                  wordText
                )}
              </motion.span>
            ))}
          </WordWrap>
        </SectionGroup>
      </ResponsiveBox>
    </NextSection>
  );
}
