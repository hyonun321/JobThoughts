import type { Answer } from '../store/useTestStore';
import { API_BASE_URL } from './config';

export const formatAnswers = (answers: Answer[]) => {
  return answers.map((a) => `B${a.qitemNo}=${a.answerScore}`).join(' ');
};

export const postReport = async (answers: Answer[]) => {
  const formatted = formatAnswers(answers);

  const res = await fetch(`${API_BASE_URL}/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers: formatted }),
  });

  if (!res.ok) throw new Error('결과 요청 실패');

  return res.json();
};
