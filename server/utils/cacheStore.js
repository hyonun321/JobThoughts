// utils/cacheStore.js
import fs from 'fs';
import path from 'path';

const CACHE_PATH = path.join(process.cwd(), 'report-cache.json');

// 캐시 로딩
export const loadCacheFromFile = () => {
  if (fs.existsSync(CACHE_PATH)) {
    const raw = fs.readFileSync(CACHE_PATH, 'utf-8');
    return JSON.parse(raw);
  }
  return {};
};

// 캐시 저장
export const saveCacheToFile = (cache) => {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
};
