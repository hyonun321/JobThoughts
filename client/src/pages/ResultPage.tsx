import ResultChart from '../features/result/ResultChart';
import ResultDescriptionCard from '../features/result/ResultDescriptionCard';
import JobGroupSection from '../features/result/JobGroupSection';
import styled from 'styled-components';

const ResultSection = styled.div`
  padding: 20px 20px;
`;

const ResultTopWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  > * {
    flex: 1 1 300px; /* 최소 300px까지 줄어듦 */
    max-width: 600px; /* (선택) 너무 커지지 않게 제한 */
  }
`;

export default function ResultPage() {
  return (
    <ResultSection>
      <ResultTopWrapper>
        <ResultChart />
        <ResultDescriptionCard />
      </ResultTopWrapper>
      <JobGroupSection />
    </ResultSection>
  );
}
