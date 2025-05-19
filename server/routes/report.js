import { requestCareerResultUrl } from '../services/careerAPI.js';
import getChartDataFromReportUrl from '../services/puppeteer.js';

export const getReportHandler = async (req, res) => {
  const { answers } = req.body;

  if (!answers) {
    return res.status(400).json({ error: 'answers 값이 필요합니다.' });
  }

  try {
    // 1. 결과 URL 생성
    const resultUrl = await requestCareerResultUrl(answers);

    // 2. Puppeteer로 실제 결과 크롤링
    const reportData = await getChartDataFromReportUrl(resultUrl);

    // 3. 클라이언트에 결과 전송
    return res.json({
      url: resultUrl,
      results: reportData,
    });
  } catch (error) {
    console.error('❌ 결과 생성 실패:', error.message);
    return res.status(500).json({ error: '결과 처리 중 오류' });
  }
};
