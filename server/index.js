import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

import { getQuestionsHandler } from './routes/questions.js';
import { getReportHandler } from './routes/report.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// 메모리 캐시 (기본 6시간 TTL)
const cache = new NodeCache({ stdTTL: 60 * 60 * 6 });

// 라우트 등록
app.get('/questions', getQuestionsHandler);
app.post('/report', (req, res) => getReportHandler(req, res, cache));

app.listen(PORT, () => {
  console.log(`✅  서버 실행: http://localhost:${PORT}`);
});
