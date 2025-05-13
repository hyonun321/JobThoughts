import { mockAnswersData } from '../data/mockData.js';
import { requestCareerResultUrl } from '../services/careerAPI.js';
import getChartDataFromReportUrl from '../services/puppeteer.js';

export const getReportHandler = async (req, res, cache) => {
  try {
    const answersArray = req.body.answer || mockAnswersData;
    const answers = answersArray.join(' ');

    if (cache.has(answers)) {
      return res.json(cache.get(answers));
    }

    const resultUrl = await requestCareerResultUrl(answers);
    const results = await getChartDataFromReportUrl(resultUrl);

    const resultObj = { url: resultUrl, results };
    cache.set(answers, resultObj);
    res.json(resultObj);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('파싱 실패');
  }
};
