'use client';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { jobRows } from '../../data/jobRows';
import { useMediaQuery } from '../../hooks/useMediaQuery';
const Section = styled.section`
  width: 100%;
  height: 300vh;
  background-color: ${({ theme }) => theme.colors.black};
  position: relative;
  overflow: hidden;
`;

const StickyWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  background-color: white;
  align-items: center;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  white-space: nowrap;
`;

const JobText = styled(motion.span)<{ $outline?: boolean }>`
  font-weight: 900;
  display: inline-block;
  color: ${({ $outline, theme }) => ($outline ? 'transparent' : theme.colors.black)};
  -webkit-text-stroke: ${({ $outline }) => ($outline ? '1px black' : '0')};
`;

const BlackSection = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.black};
  position: fixed;
  z-index: 1;
`;

export default function HeroSection() {
  const containerRef = useRef(null);
  const [hideSticky, setHideSticky] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 40, // 탄성
    damping: 5, // 감속
    mass: 0.2, // 질량
  });
  useMotionValueEvent(smoothScroll, 'change', (latest) => {
    setHideSticky(latest > 0.9999999); // 기준값은 자유롭게 조정 가능
  });
  const blackOpacity = useTransform(smoothScroll, [0.5, 0.6], [0, 1]);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isHeightMobile = useMediaQuery('(max-height: 768px)');
  const calFromSize = isMobile ? '5.5rem' : '8rem';
  const fromSize = isHeightMobile ? '4.5rem' : calFromSize;
  const fontSize = useTransform(smoothScroll, [0, 1], [fromSize, '400rem']);
  return (
    <Section ref={containerRef}>
      {!hideSticky && (
        <>
          <BlackSection style={{ opacity: blackOpacity }} />
          <StickyWrapper>
            <Wrapper>
              {jobRows.map((row, rowIndex) => (
                <Row key={rowIndex}>
                  {row.map((job, i) => {
                    const isOutlineOnly = job.includes('이');
                    return (
                      <JobText
                        key={i}
                        style={{ fontSize }}
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
        </>
      )}
    </Section>
  );
}
