import { useRef } from 'react';
import { useInView } from 'framer-motion';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Number = styled.div<{ active: boolean }>`
  font-size: 2.5rem;
  font-weight: 700;
  display: flex;
  color: ${({ active }) => (active ? '#5668FF' : '#A0A3FF')};
  margin-right: 1rem;
  transition: color 0.3s;
`;

const Label = styled.div<{ active: boolean }>`
  background-color: ${({ active }) => (active ? '#5668FF' : '#D6DBFF')};
  color: ${({ active }) => (active ? '#ffffff' : 'rgba(255,255,255,0.7)')};
  margin-left: 3rem;
  border-radius: 18px;
  padding: 1rem 2rem;
  justify-content: center;
  display: flex;
  min-width: 300px;
  max-width: 300px;
  font-size: 2rem;
  font-weight: 500;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition:
    background-color 0.3s,
    color 0.3s,
    opacity 0.3s;
`;

export default function StepItem({ step, text }: { step: number; text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.5 });
  return (
    <Container ref={ref}>
      <Number active={inView}>{`Step ${step}`}</Number>
      <Label active={inView}>{text}</Label>
    </Container>
  );
}
