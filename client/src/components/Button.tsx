import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

// 1. 버튼 타입 정의하기
// text와 이벤트 함수를 제외한 모든 속성은 옵션
type ButtonProps = {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  color?: keyof typeof theme.colors | string;
  size?: keyof typeof theme.fontSize | string;
  padding?: string;
  transition?: string;
  hoverColor?: keyof typeof theme.colors | string;
  backgroundColor?: keyof typeof theme.colors | string;
  border?: string;
  boxShadow?: string;
};

// 2. 버튼 스타일 정의하기
// $를 붙여 DOM에 전달을 방지하여 스타일용으로만 사용할 것임을 명시
const ButtonStyle = styled.button<{
  $color?: keyof typeof theme.colors | string;
  $size?: keyof typeof theme.fontSize | string;
  $padding?: string;
  $transition?: string;
  $hoverColor?: keyof typeof theme.colors | string;
  $backgroundColor?: keyof typeof theme.colors | string;
  $border?: string;
  $boxShadow?: string;
}>`
  padding: ${({ $padding }) => $padding || '16px 24px'};
  background-color: ${({ theme, $backgroundColor }) =>
    $backgroundColor
      ? theme.colors[$backgroundColor as keyof typeof theme.colors] || $backgroundColor
      : theme.colors.primary};

  font-size: ${({ theme, $size }) => theme.fontSize[$size as keyof typeof theme.fontSize] || $size};
  color: ${({ theme, $color }) => theme.colors[$color as keyof typeof theme.colors] || $color};

  ${({ $border }) =>
    $border &&
    `
  border: ${$border};
`}
  border-radius:100px;

  ${({ $boxShadow }) =>
    $boxShadow &&
    `
  box-shadow: ${$boxShadow};
`}

  ${({ $transition }) => $transition && `transition: ${$transition};`}

${({ theme, $hoverColor }) =>
    $hoverColor &&
    `
  &:hover {
    background-color: ${theme.colors[$hoverColor as keyof typeof theme.colors] || $hoverColor};
    color: white;
  }
`}
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray400};
    color: white;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

// 3. 버튼 컴포넌트
export default function Button({
  text,
  onClick,
  disabled = false,
  color = 'white',
  size = '16px',
  padding = '16px 24px',
  transition,
  hoverColor,
  backgroundColor = 'primary',
  border,
  boxShadow,
}: ButtonProps) {
  return (
    <ButtonStyle
      onClick={onClick}
      disabled={disabled}
      $color={color}
      $size={size}
      $padding={padding}
      $transition={transition}
      $hoverColor={hoverColor}
      $backgroundColor={backgroundColor}
      $border={border}
      $boxShadow={boxShadow}
    >
      {text}
    </ButtonStyle>
  );
}

// props를 전달하지 않아도 적용되는 버튼 기본값 ✔️
// padding: 16px 24px;
// background-color: theme.colors.primary;
// font-size: theme.fontSize['16px'];
// color: white;
// border-radius: 100px;

// 사용 예시 ✔️
{
  /* <Button
  onClick={() => navigate('/test')}
  text={'지금 시작하기'}
  padding={'20px 72px'}
  size="lg" 또는 size="24px"
  color={'primary'}
  transition={'all 0.3s ease'}
  backgroundColor={'white'}
  hoverColor={'primary'}
  boxShadow={'0px 0px 10px rgba(79, 99, 255, 0.4)'}
/>; */
}
