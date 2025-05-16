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
import { useState } from 'react';

const BackgroundWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 200vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #ffffff 35%, rgba(172, 196, 255, 0.75) 71%, #d8cfff 100%);
`;

const Icon = styled.div<{ top: string; left?: string; right?: string }>`
  position: absolute;
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
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Divider = styled.div`
  width: 100vw;
  height: 10vh;
`;
export default function JobListPage() {
  const location = useLocation();
  const selectedJob = location.state?.selectedJob || '';
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('');

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
  return (
    <BackgroundWrapper>
      <SectionWrapper>
        <HeaderWithBear>
          <BearImage>
            <Image src={holdingBear} alt="job-holding-bear" width="100%" />
          </BearImage>
          <JobListHeader
            selectedJob={selectedJob}
            jobCount={filteredJobs.length}
            totalCount={jobsForSelectedJob.length} // 👉 전체 중에서 필터 걸리기 전 개수
            locationFilter={locationFilter}
            setLocationFilter={setLocationFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            sortFilter={sortFilter}
            setSortFilter={setSortFilter}
          />
        </HeaderWithBear>
        <JobCardList jobs={filteredJobs} />
      </SectionWrapper>
      <Icon top="25%" left="0%">
        <Image src={tool} width="15vw" motion="float" />
      </Icon>
      <Icon top="90%" left="0%">
        <Image src={pin} width="15vw" motion="float" />
      </Icon>
      <Icon top="60%" left="85%">
        <Image src={megaphone} width="15vw" motion="float" />
      </Icon>
      <Divider />
    </BackgroundWrapper>
  );
}
