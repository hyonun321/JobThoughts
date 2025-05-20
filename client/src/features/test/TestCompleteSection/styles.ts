import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.2rem;
`;

export const ButtonWrapper = styled.div`
  margin-top: auto;

  button {
    height: 30px; // 기본 높이

    @media (max-width: 768px) {
      height: 25px; // 모바일에서 더 작게
    }
  }
`;
