import StepItem from '@/components/StepItem';
import Image from '@/components/Image';
import flowBear from '@/assets/bears/flow-bear.svg';
import { motion, useScroll, useTransform } from 'framer-motion';
import useScrollAnimation from '@/hooks/useScrollAnimation'; // ✅ 수정됨
import { useRef, useState, useEffect } from 'react';
import { BearWrapper, PinWrapper, StepWrapper, Section, motionVariants } from './styles';

export default function FlowButtonSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const steps = [
    { step: 1, text: '직업 가치관 검사' },
    { step: 2, text: '직무 추천' },
    { step: 3, text: '채용 공고 연결' },
  ];

  const { ref, controls } = useScrollAnimation(0);
  const [activeStep, setActiveStep] = useState(0);
  const [pinned, setPinned] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'], // 시작과 끝 기준
  });

  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const opacityf = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;

      const { top, bottom } = sectionRef.current.getBoundingClientRect();
      const inView = top <= 0 && bottom > window.innerHeight * 0.4;
      setPinned(inView);

      const sectionHeight = sectionRef.current.offsetHeight;
      const scrolled = Math.min(
        Math.max(window.scrollY - sectionRef.current.offsetTop, 0),
        sectionHeight * 0.6
      );
      const progress = scrolled / (sectionHeight * 0.6);
      const stepIndex = Math.min(Math.floor(progress * steps.length), steps.length - 1);
      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [steps.length]);

  return (
    <Section ref={sectionRef}>
      <motion.div style={{ opacity: opacityf }}>
        <motion.div style={{ opacity }}>
          <PinWrapper pinned={pinned}>
            <StepWrapper>
              {steps.map(({ step, text }, index) => (
                <StepItem key={step} step={step} text={text} active={activeStep === index} />
              ))}
            </StepWrapper>
            <BearWrapper ref={ref}>
              <motion.div
                animate={controls}
                variants={motionVariants}
                style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}
              >
                <Image
                  style={{ width: 'clamp(150px, 25vw, 450px)', height: 'auto' }}
                  src={flowBear}
                  alt="flow bear"
                  motion="float"
                />
              </motion.div>
            </BearWrapper>
          </PinWrapper>
        </motion.div>
      </motion.div>
    </Section>
  );
}
