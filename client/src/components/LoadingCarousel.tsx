import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Image from './Image';
import { theme } from '../styles/theme';
type Props = {
  images: string[];
  messages: string[];
};

const CarouselContainer = styled.div`
  margin-top: 2rem;
  height: 180px;
  width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (min-width: 768px) {
    width: 250px;
    height: 250px;
  }

  @media (min-width: 1024px) {
    width: 300px;
    height: 300px;
  }
`;

const CarouselItem = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Message = styled.p`
  font-size: ${theme.fontSize.ml};
  color: ${({ theme }) => theme.colors.gray600};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (min-width: 768px) {
    font-size: ${theme.fontSize.lg};
  }

  @media (min-width: 1024px) {
    font-size: ${theme.fontSize.xl};
  }
`;

export default function LoadingCarousel({ images, messages }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 3초마다 변경
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <CarouselContainer>
      <AnimatePresence mode="wait">
        <CarouselItem
          key={index}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.6 }}
        >
          <Image src={images[index]} width={'100%'} alt="loading visual" />
          <Message>{messages[index]}</Message>
        </CarouselItem>
      </AnimatePresence>
    </CarouselContainer>
  );
}
