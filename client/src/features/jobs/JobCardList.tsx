import styled from 'styled-components';
import JobCard from './JobCard';
import jobs from '../../data/mockJobData';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 60vw;
`;

function getDday(postedAt: string): string {
  const today = new Date();
  const postDate = new Date(postedAt);
  const diff = Math.floor((today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
  const due = 30 - diff;
  return due > 0 ? `D-${due}` : '마감';
}
export default function JobCardList({
  selectedJob,
  locationFilter,
  typeFilter,
  sortFilter,
}: {
  selectedJob: string;
  locationFilter: string;
  typeFilter: string;
  sortFilter: string;
}) {
  let filteredJobs = jobs.filter((job) => job.job.includes(selectedJob));

  if (locationFilter) {
    filteredJobs = filteredJobs.filter((job) => job.location.includes(locationFilter));
  }

  if (typeFilter) {
    filteredJobs = filteredJobs.filter((job) => job.type === typeFilter);
  }

  if (sortFilter === '등록오름차순') {
    filteredJobs.sort((a, b) => new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime());
  } else if (sortFilter === '등록내림차순') {
    filteredJobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  } else {
    // 기본정렬상태
    filteredJobs.sort((a, b) => new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime());
  }

  return (
    <ListWrapper>
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} dDay={getDday(job.postedAt)} />
      ))}
    </ListWrapper>
  );
}
