import React from 'react';
import { useNavigate } from 'react-router-dom';
import useScrollAnimation from '@/hooks/useScrollAnimation'; // ✅ 수정됨
import Button from '@/components/Button';
import Image from '@/components/Image';
import rocketImg from '@/assets/icons/icon-rocket.svg';
import keyImg from '@/assets/icons/icon-key.svg';
import bearBodyImg from '@/assets/bears/cta-body-bear.svg';
import bearHandImg from '@/assets/bears/cta-hand-bear.svg';
import arrowImg from '@/assets/icons/icon-start-arrow.svg';
import {
  PositionedWrapper,
  fadeInVariants,
  CTAWrapper,
  BearWrapper,
  ButtonWrapper,
  BearBodyWrapper,
  BearHandWrapper,
  MotionCharacter,
} from './styles';

type PositionedIconProps = {
  src: string;
  alt: string;
  top?: string;
  left?: string;
  right?: string;
  width?: string;
  refObj: React.Ref<HTMLDivElement>;
  animation: ReturnType<typeof useScrollAnimation>['controls'];
};

// ======================== 개별 아이콘 컴포넌트 ========================
function PositionedIcon({
  src,
  alt,
  top,
  left,
  right,
  width,
  refObj,
  animation,
}: PositionedIconProps) {
  return (
    <PositionedWrapper
      ref={refObj}
      initial="hidden"
      animate={animation}
      variants={fadeInVariants}
      top={top}
      left={left}
      right={right}
      width={width}
    >
      <Image src={src} alt={alt} width="100%" motion="float" />
    </PositionedWrapper>
  );
}

// ======================== 메인 컴포넌트 ========================
export default function StartCTASection() {
  const navigate = useNavigate();

  // 스크롤 애니메이션 제어 (커스텀 훅)
  const arrow = useScrollAnimation(0.4);
  const key = useScrollAnimation(0.4);
  const rocket = useScrollAnimation(0.4);
  const button = useScrollAnimation(0.4);
  const bear = useScrollAnimation(0.4);

  // 반복 렌더링을 위한 아이콘 리스트
  const iconList = [
    {
      refObj: arrow.ref,
      animation: arrow.controls,
      src: arrowImg,
      alt: '시작 화살표',
      top: '5%',
      width: '18vw',
    },
    {
      refObj: key.ref,
      animation: key.controls,
      src: keyImg,
      alt: '열쇠 이미지',
      top: '15%',
      left: '-2%',
      width: '25vw',
    },
    {
      refObj: rocket.ref,
      animation: rocket.controls,
      src: rocketImg,
      alt: '우주선 이미지',
      top: '5%',
      right: '-2%',
      width: '35vw',
    },
  ];

  return (
    <CTAWrapper>
      {/* 아이콘들 렌더링 */}
      {iconList.map((icon, idx) => (
        <PositionedIcon key={idx} {...icon} />
      ))}

      {/* 시작하기 버튼 */}
      <ButtonWrapper
        ref={button.ref}
        initial="hidden"
        animate={button.controls}
        variants={fadeInVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={() => navigate('/test')}
          variant="main"
          text="지금 시작하기"
          fontWeight="bold"
        />
      </ButtonWrapper>

      {/* 캐릭터 이미지 */}
      <MotionCharacter
        ref={bear.ref}
        initial="hidden"
        animate={bear.controls}
        variants={fadeInVariants}
      >
        <BearWrapper>
          <BearBodyWrapper>
            <Image src={bearBodyImg} alt="곰 몸통" width="100%" />
          </BearBodyWrapper>
          <BearHandWrapper>
            <Image src={bearHandImg} alt="곰 손" width="100%" motion="shake" />
          </BearHandWrapper>
        </BearWrapper>
      </MotionCharacter>
    </CTAWrapper>
  );
}
