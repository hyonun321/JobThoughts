import styled from 'styled-components';
import JobCard from './JobCard';
import jobs from '../../data/mockJobData';

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 60vw;
`;

export default function JobCardList({ selectedJob }: { selectedJob: string }) {
  const filteredJobs = jobs.filter((jobs) => jobs.job.includes(selectedJob));

  return (
    <ListWrapper>
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </ListWrapper>
  );
}
