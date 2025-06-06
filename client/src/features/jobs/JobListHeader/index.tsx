import FilterBar from '../FilterBar';
import Text from '@/components/Text';
import { HeaderWrapper, MobileOnlyBr } from './styles';

type Props = {
  selectedJob: string;
  jobCount: number;
  locationFilter: string;
  setLocationFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  sortFilter: string;
  setSortFilter: (value: string) => void;
  totalCount: number;
};

export default function JobListHeader({
  selectedJob,
  jobCount,
  locationFilter,
  setLocationFilter,
  typeFilter,
  setTypeFilter,
  sortFilter,
  setSortFilter,
  totalCount,
}: Props) {
  return (
    <HeaderWrapper>
      <Text as="span" size="clamp(1.5rem, 4vw, 2.5rem)" weight="bold" color="black">
        <Text as="span" size="clamp(1.5rem, 4vw, 2.5rem)" weight="bold" color="primary">
          {selectedJob}
        </Text>
        <MobileOnlyBr />
        {jobCount > 0 ? ' 채용공고를 모아봤어요!' : ' 채용공고가 없어요'}
      </Text>
      <br />
      <Text as="span" size="ml" weight="medium">
        {jobCount > 0
          ? '  직무에 맞는 기업만 모아서 보여드려요'
          : totalCount === 0
            ? ' 다른 직무를 선택해보세요 '
            : ' 다른 필터를 선택해보세요'}
      </Text>
      {totalCount > 0 ? (
        <FilterBar
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sortFilter={sortFilter}
          setSortFilter={setSortFilter}
        />
      ) : (
        ''
      )}
    </HeaderWrapper>
  );
}
