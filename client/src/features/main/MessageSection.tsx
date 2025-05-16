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

// ======================= styled components =======================
const NextSection = styled.section`
  width: 100vw;
  height: auto;
  background: linear-gradient(to bottom, #000000 0%, #4f63ff 50%, #ffffff 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const WordWrap = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

// ======================= animation variants =======================
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

// ======================= component =======================
export default function MessageSection() {
  const theme = useTheme();

  // 요소별 애니메이션 제어
  const scroll = useScrollAnimation();
  const star = useScrollAnimation();
  const text1 = useScrollAnimation();
  const text2 = useScrollAnimation();
  const moon = useScrollAnimation();
  const bear = useScrollAnimation();

  const words = ['잡생각은,', '이런', '걸', '합니다'];

  return (
    <NextSection>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
        {/* 1. 스크롤 아이콘 */}
        <motion.div
          ref={scroll.ref}
          initial="hidden"
          animate={scroll.controls}
          variants={fadeInVariants}
        >
          <Image src={iconScroll} alt="스크롤 아이콘" width="80px" motion="float" />
        </motion.div>

        {/* 2. 별 아이콘 */}
        <motion.div
          ref={star.ref}
          initial="hidden"
          animate={star.controls}
          variants={fadeInVariants}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '40px 0',
            marginRight: '35%',
            width: '100vw',
          }}
        >
          <Image src={iconStar} alt="별 아이콘" width="100px" motion="float" />
        </motion.div>

        {/* 3. 문장 1 */}
        <motion.div
          ref={text1.ref}
          initial="hidden"
          animate={text1.controls}
          variants={fadeInVariants}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            margin: '40px 0',
            marginLeft: '35%',
            width: '100vw',
          }}
        >
          <Text as="h2" size="60px" weight="bold" color="white" align="left">
            하고 싶은 일을 몰라도 괜찮아요
          </Text>
        </motion.div>

        {/* 4. 문장 2 */}
        <motion.div
          ref={text2.ref}
          initial="hidden"
          animate={text2.controls}
          variants={fadeInVariants}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '40px 0',
            marginRight: '25%',
            width: '100vw',
          }}
        >
          <Text as="h2" size="60px" weight="bold" color="white" align="right">
            우리는 당신에게 맞는 길부터 찾으니까요
          </Text>
        </motion.div>

        {/* 5. 달 아이콘 */}
        <motion.div
          ref={moon.ref}
          initial="hidden"
          animate={moon.controls}
          variants={fadeInVariants}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            margin: '40px 0',
            marginTop: '-10px',
            marginLeft: '30%',
            width: '100vw',
          }}
        >
          <Image src={iconMoon} alt="달 아이콘" width="110px" motion="float" />
        </motion.div>

        {/* 6. 누운 곰 + 최종 문장 */}
        <motion.div
          ref={bear.ref}
          initial="hidden"
          animate={bear.controls}
          variants={fadeInVariants}
          style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Image src={lyingBear} alt="누워있는 곰" width="450px" motion="float" />

          {/* 마지막 문장 - 단어별 애니메이션 */}
          <WordWrap>
            {words.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                variants={wordVariants}
                viewport={{ once: false, amount: 0.5 }}
                style={{ fontSize: '60px', fontWeight: 700, color: theme.colors.gray900 }}
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
        </motion.div>
      </div>
    </NextSection>
  );
}
