'use client';
import { useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { jobRows } from '@/data/jobRows';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Section, BlackSection, StickyWrapper, Row, Wrapper, JobText } from './styles';

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
