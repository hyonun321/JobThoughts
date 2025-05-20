import styled from 'styled-components';

export const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

export const BackgroundFloatWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
  img {
    position: absolute;
    pointer-events: none;
    z-index: 0;
  }

  .wave {
    left: 'calc(-3vw)';
    @media (max-width: 768px) {
      left: -10vw;
    }
  }

  .ring {
    left: 20vw;
    top: 75%;
    @media (max-width: 768px) {
      left: 1vw;
      top: 80%;
    }
  }
  .cube {
    right: 8vw;
    bottom: 5%;

    @media (max-width: 768px) {
      right: -7vw;
    }
  }
`;
