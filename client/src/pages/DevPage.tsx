import { useState } from 'react';

export default function DevPage() {
  const [questionData, setQuestionData] = useState(null);
  const [reportUrl, setReportUrl] = useState('');
  const [results, setResults] = useState([]);

  const handleQuestionClick = async () => {
    try {
      const response = await fetch('http://localhost:3000/questions');
      if (!response.ok) throw new Error('서버 응답 오류 (문항)');
      const data = await response.json();
      setQuestionData(data);
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
      setReportUrl(data.url);
      setResults(data.results);
    } catch (error) {
      console.error('결과 API 호출 실패:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>💡 커리어넷 테스트 개발용</h2>

      <button onClick={handleQuestionClick} style={{ marginRight: 10 }}>
        📥 문항 받아오기
      </button>

      <button onClick={handleReportClick}>📊 결과지 요청</button>

      {reportUrl && (
        <div style={{ marginTop: 20 }}>
          <h4>🔗 결과 URL</h4>
          <a href={reportUrl} target="_blank" rel="noopener noreferrer">
            {reportUrl}
          </a>
        </div>
      )}

      {questionData && (
        <div style={{ marginTop: 20 }}>
          <h4>📝 문항 데이터</h4>
          <pre
            style={{
              background: '#f4f4f4',
              padding: 10,
              borderRadius: 6,
              height: '300px', // 높이 고정
              overflowY: 'auto', // 세로 스크롤
              whiteSpace: 'pre-wrap', // 줄바꿈 처리 (선택)
            }}
          >
            {JSON.stringify(questionData, null, 2)}
          </pre>
        </div>
      )}

      {results && (
        <div style={{ marginTop: 20 }}>
          <h4>📈 결과 데이터</h4>
          <pre
            style={{
              background: '#f4f4f4',
              padding: 10,
              borderRadius: 6,
              height: '300px', // 높이 고정
              overflowY: 'auto', // 세로 스크롤
              whiteSpace: 'pre-wrap', // 줄바꿈 처리 (선택)
            }}
          >
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
