'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styled from 'styled-components';
const jobRows = [
  [
    '투자 전문가',
    'SNS 마케터',
    '천문학자',
    '3D 디자이너',
    '콘셉트 아티스트',
    '자동차 설계자',
    '웹 퍼블리셔',
    '기후학자',
    '시장조사 분석가',
    '한의사',
  ],
  [
    '보안 전문가',
    '게임 개발자',
    'AI 연구원',
    '치과의사',
    '그래픽 디자이너',
    'UI 디자이너',
    '응급구조사',
    '프론트엔드 개발자',
    '산업 디자이너',
    '회계사',
  ],
  [
    '세무사',
    '브랜드 매니저',
    '광고 기획자',
    '시스템 엔지니어',
    '임상병리사',
    'UX 디자이너',
    '토목 엔지니어',
    '에너지 기술자',
    '보험계리사',
    '콘텐츠 플래너',
  ],
  [
    'PR 매니저',
    '앱 개발자',
    '재정 컨설턴트',
    '제품 디자이너',
    '서비스 디자이너',
    '재무 분석가',
    '보건분석가',
    '모션 디자이너',
    '전기전자 엔지니어',
    '환경 공학자',
  ],
  [
    '로봇 연구원',
    '세일즈 플래너',
    '게임 개발자',
    '작업치료사',
    '임베디드 개발자',
    '풀스택 개발자',
    '생명과학자',
    '데이터 분석가',
    'UX 디자이너',
    '항공우주 기술자',
  ],
  [
    '연구개발(R&D) 연구원',
    '자산운용 매니저',
    '퍼포먼스 마케터',
    '로봇 개발자',
    '타이포그래퍼',
    '은행원',
    '기계 설계자',
    '배터리 개발자',
    '증권 애널리스트',
    '백엔드 개발자',
  ],
  [
    '의사',
    '그래픽 디자이너',
    '재활치료사',
    '자산운용 매니저',
    '서비스 디자이너',
    '보안 전문가',
    '보건의료분석가',
    '학습 디자이너',
    '콘텐츠 플래너',
    '시스템 엔지니어',
  ],
];

const Section = styled.section`
  width: 100vw;
  height: 200vh;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  overflow: hidden;
`;

const StickyWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  pointer-events: none;
`;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease-out;
`;

const Row = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  white-space: nowrap;
`;

const JobText = styled(motion.span)<{ $outline?: boolean }>`
  font-size: 6rem;
  font-weight: 900;
  color: ${({ $outline }) => ($outline ? 'transparent' : `${({ theme }) => theme.colors.black}`)};
  -webkit-text-stroke: ${({ $outline }) => ($outline ? '1px black' : '0')};
`;

const BlackSection = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
`;

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 50]);
  const blackOpacity = useTransform(scrollYProgress, [0.6, 0.7], [0, 1]);

  return (
    <Section ref={containerRef}>
      <StickyWrapper>
        <Wrapper style={{ scale }}>
          {jobRows.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map((job, i) => {
                const isOutlineOnly = job.includes('이');
                return (
                  <JobText
                    key={i}
                    initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: rowIndex * 0.3 + i * 0.1,
                      type: 'spring',
                    }}
                    $outline={isOutlineOnly}
                  >
                    {job}
                  </JobText>
                );
              })}
            </Row>
          ))}
        </Wrapper>
      </StickyWrapper>

      <BlackSection style={{ opacity: blackOpacity }} />
    </Section>
  );
}
