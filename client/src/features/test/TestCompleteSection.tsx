import FullScreenSection from '../../components/FullScreenSection';
import { useNavigate } from 'react-router-dom';
type Props = {
  answers: string[];
};
export default function TestCompleteSection({ answers }: Props) {
  const navigate = useNavigate();
  console.log(answers, '추후 api로 넘길 데이터');
  return (
    <FullScreenSection>
      <div>✅</div>
      <button onClick={() => navigate('/result')}>결과 보기</button>
    </FullScreenSection>
  );
}
