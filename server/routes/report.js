import { requestCareerResultUrl } from '../services/careerAPI.js';
import getChartDataFromReportUrl from '../services/puppeteer.js';
import { loadCacheFromFile, saveCacheToFile } from '../utils/cacheStore.js';

let persistentCache = loadCacheFromFile();

export const getReportHandler = async (req, res) => {
  const { answers } = req.body;

  if (!answers) {
    return res.status(400).json({ error: 'answers 값이 필요합니다.' });
  }

  // 캐시 체크
  if (persistentCache[answers]) {
    return res.json(persistentCache[answers]);
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

    // 캐시에 저장 + 파일로 저장
    persistentCache[answers] = responseData;
    saveCacheToFile(persistentCache);

    // 5. 클라이언트에 결과 전송
    return res.json(responseData);
  } catch (error) {
    console.error('❌ 결과 생성 실패:', error.message);
    return res.status(500).json({ error: '결과 처리 중 오류' });
  }
};
