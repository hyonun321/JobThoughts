import React from 'react';
import styled from 'styled-components';
import type { DefaultTheme } from 'styled-components';

// 📌텍스트컴포넌트 props 설정
// React.HTMLAttributes를 상속하면 className, style, onClick, data-* 등 기본 HTML 속성도 모두 쓸 수 있다.
interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4'; // element 태그 타입
  size?: keyof DefaultTheme['fontSize'] | number | string; // 폰트 크기: theme.fontSize 키값 중 하나 xs,s,m,ml,lg,xl 혹은 자율적으로 number입력시 자동으로 px단위로 조정
  weight?: keyof DefaultTheme['fontWeight']; // 폰트 두께: theme.fontWeight 키값 중 하나 light, medium, bold
  color?: keyof DefaultTheme['colors']; // 글자 색
  align?: 'left' | 'center' | 'right' | 'justify'; // 텍스트 정렬
}

// 📌styled-component으로 스타일 정의
const StyledText = styled.p<TextProps>`
  margin: 0;
  font-family: ${({ theme }) => theme.fontFamily};

  /* size 처리: number → px, theme 키 → theme 값, 그 외 string 그대로 */
  font-size: ${({ size = 'm', theme }) => {
    if (typeof size === 'number') {
      return `${size}px`;
    }
    // theme에 정의된 키인지 확인
    if (size in theme.fontSize) {
      return theme.fontSize[size as keyof DefaultTheme['fontSize']];
    }
    // 그 외엔 사용자 문자열 그대로
    return size;
  }};

  font-weight: ${({ weight = 'medium', theme }) => theme.fontWeight[weight]};
  color: ${({ color = 'gray900', theme }) => theme.colors[color]};
  text-align: ${({ align = 'left' }) => align};
`;

// 4) React 컴포넌트로 감싸기
const Text: React.FC<TextProps> = ({ as = 'p', size, weight, color, align, children, ...rest }) => {
  return (
    <StyledText as={as} size={size} weight={weight} color={color} align={align} {...rest}>
      {children}
    </StyledText>
  );
};

export default Text;

/*
<사용 예시>
    <Text as="span" size="s" weight="medium" color="area">
        * 필수 응답 항목입니다.
    </Text>

*/
