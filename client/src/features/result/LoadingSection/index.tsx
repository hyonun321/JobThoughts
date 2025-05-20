import LoadingCarousel from '@/components/LoadingCarousel';
import Loading from '@/components/Loading';
import { useEffect } from 'react';
import { LoadingContainer, images } from './styles';

const messages = [
  '직업 성향 분석 중...',
  '나와 맞는 직무를 찾는 중...',
  '채용 정보를 매칭 중...',
  '최적의 결과를 정리 중...',
  '곧 결과를 보여드릴게요!',
];

export default function LoadingSection() {
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);
  return (
    <LoadingContainer>
      <LoadingCarousel images={images} messages={messages} />
      <Loading message="" />
    </LoadingContainer>
  );
}
