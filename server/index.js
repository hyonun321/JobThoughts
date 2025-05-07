const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('서버 작동중!');
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 작동중입니다`);
});
