import { useNavigate } from 'react-router-dom';
import FullScreenSection from '../../components/FullScreenSection';
import Button from '../../components/Button';

export default function StartCTASection() {
  const navigate = useNavigate();
  return (
    <FullScreenSection>
      <Button onClick={() => navigate('/test')} variant="main" text={'지금 시작하기'} />
    </FullScreenSection>
  );
}
