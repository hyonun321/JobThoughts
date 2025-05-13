import { useState } from 'react';

export default function DevPage() {
  const [questionData, setQuestionData] = useState(null);
  const [reportUrl, setReportUrl] = useState('');
  const [scores, setScores] = useState([]);

  const handleQuestionClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/questions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('서버 응답 오류 (문항)');

      const data = await response.json();
      console.log('문항 결과:', data);
      setQuestionData(data.RESULT); // 문항 리스트 저장
    } catch (error) {
      console.error('문항 API 호출 실패:', error);
    }
  };

  const handleReportClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('서버 응답 오류 (결과)');

      const data = await response.json();
      console.log('결과 URL:', data);
      setReportUrl(data.url); // 결과 URL 저장
    } catch (error) {
      console.error('결과 API 호출 실패:', error);
    }
  };

  const handleGetScoresClick = async () => {
    if (!reportUrl) return alert('먼저 결과지 URL을 받아와야 합니다.');

    try {
      const u = new URL(reportUrl);
      const seqEnc = u.searchParams.get('seq') || '';
      const seq = atob(seqEnc); // base64 디코딩
      const apiUrl = `https://www.career.go.kr/cloud/api/inspect/report?seq=${seq}`;

      const res = await fetch(apiUrl, {
        headers: {
          Referer: reportUrl,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      const data = await res.json();
      console.log('🎯 점수 JSON 응답:', data);

      const scoresArray = Array.from({ length: 8 }, (_, i) => ({
        code: data[`code${i + 1}`],
        score: data[`w${i + 1}`],
      }));

      setScores(scoresArray);
    } catch (err) {
      console.error('프론트 JSON 점수 요청 실패:', err);
    }
  };

  return (
    <>
      <button onClick={handleQuestionClick}>문항 받아오기</button>
      <button onClick={handleReportClick}>결과지 요청</button>
      <button onClick={handleGetScoresClick}>🎯 점수 직접 요청 (클라이언트)</button>

      {questionData && (
        <div>
          <h3>받은 문항 (예시 3개):</h3>
          <ul>
            {questionData.slice(0, 3).map((q, idx) => (
              <li key={idx}>{q.question}</li>
            ))}
          </ul>
        </div>
      )}

      {reportUrl && (
        <div>
          <h3>결과지 URL:</h3>
          <a href={reportUrl} target="_blank" rel="noopener noreferrer">
            {reportUrl}
          </a>
        </div>
      )}

      {scores.length > 0 && (
        <div>
          <h3>점수 결과 (클라이언트 요청):</h3>
          <ul>
            {scores.map((s, i) => (
              <li key={i}>
                {s.code}: {s.score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
