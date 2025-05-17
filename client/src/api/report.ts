import type { Answer } from '../store/useTestStore';

export const formatAnswers = (answers: Answer[]) => {
  return answers.map((a) => `B${a.qitemNo}=${a.answerScore}`).join(' ');
};

export const postReport = async (answers: Answer[]) => {
  const formatted = formatAnswers(answers);
  console.log('formatted answers string:', formatted);

  const res = await fetch('/api/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers: formatted }),
  });

  if (!res.ok) throw new Error('결과 요청 실패');

  return res.json(); // { scores, topValues, jobsByMajor }
};
