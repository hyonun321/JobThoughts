export interface Question {
  qitemNo: number;
  question: string;
  answer01: string;
  answer02: string;
  answer03: string;
  answer04: string;
  answerScore01: string;
  answerScore02: string;
}

export const fetchQuestions = async (): Promise<Question[]> => {
  const res = await fetch('/api/questions');
  if (!res.ok) {
    throw new Error('질문지를 불러오지 못했습니다');
  }
  return res.json(); // 커리어넷 API의 실제 질문 목록을 반환
};
