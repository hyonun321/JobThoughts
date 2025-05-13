import axios from 'axios';

export const getQuestionsHandler = async (req, res) => {
  try {
    const apiKey = process.env.CAREER_API_KEY;
    const testKey = 6;
    const url = `https://www.career.go.kr/inspct/openapi/test/questions?apikey=${apiKey}&q=${testKey}`;
    const { data } = await axios.get(url);
    res.json(data.RESULT);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('문항 요청 실패');
  }
};
