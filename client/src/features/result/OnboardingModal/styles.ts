import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(3px);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > div {
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  button {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
  }
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;
