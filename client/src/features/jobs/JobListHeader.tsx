import styled from 'styled-components';
import FilterBar from './FilterBar';
import Text from '../../components/Text';
import { theme } from '../../styles/theme';

const HeaderWrapper = styled.div`
  background: #f0f4ff;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  margin-bottom: 2rem;
  max-width: 1000px;
  width: 60vw;
`;

type Props = {
  selectedJob: string;
};

export default function JobListHeader({ selectedJob }: Props) {
  return (
    <HeaderWrapper>
      <Text as="span" size="xl" weight="bold">
        <span style={{ color: `${theme.colors.primary}`, fontWeight: 'bold' }}>{selectedJob}</span>
        채용공고를 모아봤어요!
      </Text>
      <br />
      <Text as="span" size="ml" weight="medium">
        직무에 맞는 기업만 모아서 보여드려요
      </Text>
      <FilterBar />
    </HeaderWrapper>
  );
}
