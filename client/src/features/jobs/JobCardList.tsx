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

export default function JobCardList({ selectedJob }: { selectedJob: string }) {
  const filteredJobs = jobs.filter((job) => job.job.includes(selectedJob));

  return (
    <ListWrapper>
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} dDay={getDday(job.postedAt)} />
      ))}
    </ListWrapper>
  );
}
