// src/services/careerAPI.js
import axios from 'axios';

export const requestCareerResultUrl = async (answers) => {
  const apiKey = process.env.CAREER_API_KEY;

  const { data: r } = await axios.post(
    'https://www.career.go.kr/inspct/openapi/test/report',
    {
      apikey: apiKey,
      qestrnSeq: '6',
      trgetSe: '100209',
      gender: '100323',
      school: '일반',
      grade: '1',
      startDtm: Date.now(),
      answers,
    },
    { headers: { 'Content-Type': 'application/json' } }
  );

  if (r.SUCC_YN !== 'Y') {
    throw new Error('결과 생성 실패: ' + r.ERROR_REASON);
  }

  return r.RESULT.url;
};
