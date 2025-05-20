import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

export default function useScrollAnimation(threshold = 0.3, rootMargin = '7% 0px -10% 0px') {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: false,
  });

  const controls = useAnimation();

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [inView, controls]);

  return { ref, controls };
}
