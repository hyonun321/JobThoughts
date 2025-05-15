import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Number = styled.div<{ active: boolean }>`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ active }) => (active ? '#5668FF' : '#A0A3FF')};
  margin-right: 1rem;
  transition: color 0.3s;
`;

const Label = styled.div<{ active: boolean }>`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.background};
  color: ${({ active, theme }) => (active ? theme.colors.white : 'rgba(255,255,255,0.7)')};
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

export default function StepItem({
  step,
  text,
  active,
}: {
  step: number;
  text: string;
  active: boolean;
}) {
  return (
    <Container>
      <Number active={active}>{`Step ${step}`}</Number>
      <Label active={active}>{text}</Label>
    </Container>
  );
}
