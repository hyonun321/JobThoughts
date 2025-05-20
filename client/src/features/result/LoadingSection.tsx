import styled from 'styled-components';
import LoadingCarousel from '../../components/LoadingCarousel';
import loading1 from '../../assets/bears/bears-2.svg';
import loading2 from '../../assets/bears/hi-bear.svg';
import loading3 from '../../assets/bears/bears-5.svg';
import loading4 from '../../assets/bears/bears-6.svg';
import loading5 from '../../assets/bears/stop-bear.svg';
import Loading from '../../components/Loading';
import { useEffect } from 'react';
const images = [loading1, loading2, loading3, loading4, loading5];

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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;
