import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

import { getQuestionsHandler } from './routes/questions.js';
import { getReportHandler } from './routes/report.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('체크:', __dirname);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: ['https://job-thoughts-client.vercel.app', 'http://localhost:5173'],
    credentials: true,
  })
);

// 라우트 등록
app.get('/questions', getQuestionsHandler);
app.post('/report', (req, res) => getReportHandler(req, res));

app.listen(PORT, () => {
  console.log(`✅  서버 실행: http://localhost:${PORT}`);
});
