import { useLocation } from 'react-router-dom';
import JobListHeader from '../features/jobs/JobListHeader';
import JobCardList from '../features/jobs/JobCardList';
import Image from '../components/Image';
import holdingBear from '../assets/bears/job-holding-bear.svg';
import styled from 'styled-components';
import tool from '../assets/icons/icon-tool.svg';
import megaphone from '../assets/icons/icon-megaphone.svg';
import pin from '../assets/icons/icon-pin.svg';
import jobs from '../data/mockJobData';
import { useEffect, useState } from 'react';
import { theme } from '../styles/theme';

const Icon = styled.div<{ top: string; left?: string; right?: string }>`
  position: fixed;
  top: ${({ top }) => top};
  left: ${({ left }) => left || 'auto'};
  right: ${({ right }) => right || 'auto'};
  width: 100px;
  z-index: 0;
`;

const HeaderWithBear = styled.div`
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  padding-top: 200px;
`;

const BearImage = styled.div`
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  z-index: 1;
`;

const SectionWrapper = styled.section`
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
  z-index: 1;
`;
const LoadingSpinner = styled.div`
  position: absolute;
  bottom: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;

  &::after {
    content: '';
    width: 36px;
    height: 36px;
    border: 4px solid ${theme.colors.white};
    border-top: 4px solid ${theme.colors.primary}; // 회전 강조 색
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;

  /* 배경을 바로 줌 */
  background: linear-gradient(to bottom, #ffffff 35%, rgba(172, 196, 255, 0.75) 71%, #d8cfff 100%);
  background-attachment: fixed;
`;

export default function JobListPage() {
  const location = useLocation();
  const selectedJob = location.state?.selectedJob || '';
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const jobsForSelectedJob = jobs.filter((job) => job.job.includes(selectedJob));

  // 2단계: 필터 적용
  let filteredJobs = jobsForSelectedJob;

  if (locationFilter) {
    filteredJobs = filteredJobs.filter((job) => job.location.includes(locationFilter));
  }
  if (typeFilter) {
    filteredJobs = filteredJobs.filter((job) => job.type === typeFilter);
  }
  if (sortFilter === '오름차순') {
    filteredJobs.sort((a, b) => new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime());
  } else {
    filteredJobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  }
  const visibleJobs = filteredJobs.slice(0, visibleCount);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      const isNearBottom = scrollY + viewportHeight >= fullHeight - 100;
      const hasMore = visibleCount < filteredJobs.length;

      if (isNearBottom && hasMore && !isLoading) {
        setIsLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => Math.min(prev + 5, filteredJobs.length));
          setIsLoading(false);
        }, 800);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredJobs.length, visibleCount, isLoading]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageContainer>
        <SectionWrapper>
          <HeaderWithBear>
            <BearImage>
              <Image src={holdingBear} alt="job-holding-bear" width="100%" />
            </BearImage>
            <JobListHeader
              selectedJob={selectedJob}
              jobCount={filteredJobs.length}
              totalCount={jobsForSelectedJob.length}
              locationFilter={locationFilter}
              setLocationFilter={setLocationFilter}
              typeFilter={typeFilter}
              setTypeFilter={setTypeFilter}
              sortFilter={sortFilter}
              setSortFilter={setSortFilter}
            />
          </HeaderWithBear>
          <JobCardList jobs={visibleJobs} />
          {isLoading && <LoadingSpinner />}
        </SectionWrapper>
        <Icon top="25vh" left="0%">
          <Image src={tool} width="15vw" motion="float" />
        </Icon>
        <Icon top="80vh" left="0%">
          <Image src={pin} width="15vw" motion="float" />
        </Icon>
        <Icon top="60vh" left="85%">
          <Image src={megaphone} width="15vw" motion="float" />
        </Icon>
      </PageContainer>
    </>
  );
}
