import { requestCareerResultUrl } from '../services/careerAPI.js';
import getChartDataFromReportUrl from '../services/puppeteer.js';

export const getReportHandler = async (req, res, cache) => {
  const { answers } = req.body;

  if (!answers) {
    return res.status(400).json({ error: 'answers 값이 필요합니다.' });
  }

  // 1. 캐시 확인
  const cached = cache.get(answers);
  if (cached) {
    console.log('📦 캐시된 데이터 반환');
    return res.json(cached);
  }

  try {
    // 2. 결과 URL 생성
    const resultUrl = await requestCareerResultUrl(answers);

    // 3. Puppeteer로 실제 결과 크롤링
    const reportData = await getChartDataFromReportUrl(resultUrl);

    const responseData = {
      url: resultUrl,
      results: reportData,
    };

    // 4. 캐시에 저장
    cache.set(answers, responseData);

    // 5. 클라이언트에 결과 전송
    return res.json(responseData);
  } catch (error) {
    console.error('❌ 결과 생성 실패:', error.message);
    return res.status(500).json({ error: '결과 처리 중 오류' });
  }
};
