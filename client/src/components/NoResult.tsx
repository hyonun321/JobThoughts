import styled from 'styled-components';
import NoResultBear from '../../src/assets/bears/no-result-bear.svg';
import Button from './Button';
import { theme } from '../styles/theme';
import type React from 'react';

const NoResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: clamp(1rem, 2rem, 4rem);
  padding: 20px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  img {
    width: clamp(200px, 40vw, 400px);
    height: auto;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;

  h1 {
    font-size: clamp(${theme.fontSize.ml}, 4vw, ${theme.fontSize.xxl});
  }

  h2 {
    font-size: clamp(${theme.fontSize.m}, 3vw, ${theme.fontSize.lg});
    font-weight: ${theme.fontWeight.light};
  }

  p {
    font-size: clamp(${theme.fontSize.s}, 1.5vw, ${theme.fontSize.m});
    font-weight: ${theme.fontWeight.light};
    line-height: 1.8;
  }
`;

type NoResultProps = {
  title: string;
  description?: string | React.ReactNode;
  subDescription?: string | React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
};

export default function NoResult({
  title,
  description = '테스트가 제대로 제출되지 않았거나, 결과를 불러오는 데 문제가 있었어요.',
  subDescription,
  buttonText = '다시 검사하기',
  onButtonClick,
}: NoResultProps) {
  return (
    <NoResultContainer>
      <ImageContainer>
        <img src={NoResultBear} alt="결과없음곰돌이" />
      </ImageContainer>
      <TextContainer>
        <h1>{title}</h1>
        <h2>{description}</h2>
        {subDescription && <p>{subDescription}</p>}
        {onButtonClick && (
          <Button
            variant="link"
            text={buttonText}
            onClick={onButtonClick}
            width="30%"
            padding="2%"
          />
        )}
      </TextContainer>
    </NoResultContainer>
  );
}
