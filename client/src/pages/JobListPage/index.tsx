import { useLocation } from 'react-router-dom';
import JobListHeader from '@/features/jobs/JobListHeader';
import JobCardList from '@/features/jobs/JobCardList';
import Image from '@/components/Image';
import holdingBear from '@/assets/bears/job-holding-bear.svg';
import tool from '@/assets/icons/icon-tool.svg';
import megaphone from '@/assets/icons/icon-megaphone.svg';
import pin from '@/assets/icons/icon-pin.svg';
import jobs from '@/data/mock/mockJobData';
import { useEffect, useState } from 'react';
import {
  BearImage,
  HeaderWithBear,
  Icon,
  LoadingSpinner,
  PageContainer,
  SectionWrapper,
} from './styles';

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
    if (locationFilter !== '전체') {
      filteredJobs = filteredJobs.filter((job) => job.location.includes(locationFilter));
    }
  }
  if (typeFilter) {
    if (typeFilter !== '전체') {
      filteredJobs = filteredJobs.filter((job) => job.type === typeFilter);
    }
  }
  if (sortFilter === '내림차순') {
    // 기본 오름차순
    filteredJobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  } else {
    filteredJobs.sort((a, b) => new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime());
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
