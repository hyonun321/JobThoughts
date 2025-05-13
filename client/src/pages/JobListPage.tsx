import { useLocation } from 'react-router-dom';
import JobListHeader from '../features/jobs/JobListHeader';
import JobCardList from '../features/jobs/JobCardList';
import FullScreenSection from '../components/FullScreenSection';

export default function JobListPage() {
  const location = useLocation();
  const selectedJob = location.state?.selectedJob || '웹 디자이너';

  return (
    <FullScreenSection style={{ alignItems: 'stretch', padding: '2rem' }}>
      <JobListHeader selectedJob={selectedJob} />
      <JobCardList selectedJob={selectedJob} />
    </FullScreenSection>
  );
}
