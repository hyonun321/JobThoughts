import styled from 'styled-components';
import FilterBar from './FilterBar';

const HeaderWrapper = styled.div`
  background: #f0f4ff;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 2rem;
`;

type Props = {
  selectedJob: string;
};

export default function JobListHeader({ selectedJob }: Props) {
  return (
    <HeaderWrapper>
      <h2>
        <span style={{ color: '#4d6fff', fontWeight: 'bold' }}>{selectedJob}</span>
        채용공고를 모아봤어요!
      </h2>
      <p>직무에 맞는 기업만 모아서 보여드려요</p>
      <FilterBar />
    </HeaderWrapper>
  );
}
