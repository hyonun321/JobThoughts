import { useNavigate } from 'react-router-dom';
import FullScreenSection from '../../components/FullScreenSection';

export default function StartCTASection() {
  const navigate = useNavigate();
  return (
    <FullScreenSection>
      <button onClick={() => navigate('/test')}>지금 시작하기</button>
    </FullScreenSection>
  );
}
