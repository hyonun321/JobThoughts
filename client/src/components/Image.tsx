import React from 'react';
import styled, { css, keyframes } from 'styled-components';

// 📌이미지컴포넌트 props 설정
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  motion?: 'float' | 'none';
}

// 📌자체 애니메이션 정의
// float: 둥실둥실 떠있는 효과
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

// 📌Styled 컴포넌트
const StyledImage = styled.img<{ $motion?: ImageProps['motion'] }>`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  display: block;
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};

  ${({ $motion }) =>
    $motion === 'float' &&
    css`
      animation: ${float} 2.5s ease-in-out infinite;
    `}
`;

// ✅ Image 컴포넌트
const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  motion = 'none',
  onClick,
  ...rest // 외부 애니메이션 라이브러리용 data-* 속성 포함
}) => {
  return (
    <StyledImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      $motion={motion}
      onClick={onClick}
      {...rest} // data-aos 등 외부 속성 허용
    />
  );
};

export default Image;

/* 
<사용예시>

<Image
  src="/assets/rocket.png"
  alt="로켓 이미지"
  width="200px"
  motion="float"
/>

<Image
  src="/assets/card.png"
  alt="직업 카드"
  data-aos="slide-left" // AOS사용시 예시시
  onClick={() => alert('카드 클릭!')}
/>

<Image
  src="/cat.png"
  alt="고양이"
  motion="float"
  data-aos="fade-up"
  loading="lazy"
  decoding="async"
/>
*/
