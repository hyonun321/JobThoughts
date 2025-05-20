import JobCard from '../JobCard';
import type { Job } from '@/types';
import { MotionListWrapper } from './styles';

function getDday(postedAt: string): string {
  const today = new Date();
  const postDate = new Date(postedAt);
  const diff = Math.floor((today.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
  const due = 30 - diff;
  return due > 0 ? `D-${due}` : '마감';
}

export default function JobCardList({ jobs }: { jobs: Job[] }) {
  return (
    <MotionListWrapper>
      {jobs.length > 0
        ? jobs.map((job) => <JobCard key={job.id} job={job} dDay={getDday(job.postedAt)} />)
        : ''}
    </MotionListWrapper>
  );
}
