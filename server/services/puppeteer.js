import puppeteer, { executablePath } from 'puppeteer';

export default async function getChartDataFromReportUrl(resultUrl) {
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: executablePath(),
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  try {
    await page.goto(resultUrl, { waitUntil: 'networkidle2' });

    // 1. 그래프 데이터
    await page.waitForSelector('#chart', { timeout: 3000 });
    await page.waitForFunction(() => !!Chart.getChart('chart'), { timeout: 3000 });
    const scores = await page.evaluate(() => {
      const chart = Chart.getChart('chart');
      if (!chart) return [];
      return chart.data.datasets[0].data.map((score, idx) => ({
        score,
        name: chart.data.labels[idx],
      }));
    });

    // 2. 가장 중요하게 생각하는 가치 2개 (topValues)
    const topValues = await page.evaluate(() => {
      const spans = Array.from(document.querySelectorAll('p.txt_guide span.emph_b'));
      return [spans[1]?.textContent.trim(), spans[2]?.textContent.trim()];
    });

    // 3. 종사자 평균 전공별 표 파싱
    const jobsByMajor = await page.evaluate(() => {
      const tables = Array.from(document.querySelectorAll('strong.tit_bar'));
      let targetTable;

      for (let el of tables) {
        if (el.textContent.includes('종사자 평균 전공별')) {
          // 제목 다음 형제 요소 중 테이블을 찾아야 함
          let next = el.nextElementSibling;
          while (next && !next.matches('table.tbl_result')) {
            next = next.nextElementSibling;
          }
          targetTable = next;
          break;
        }
      }

      if (!targetTable) return {};

      const result = {};
      const rows = targetTable.querySelectorAll('tbody tr');

      rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 2) return;

        const major = cells[0].textContent.trim();
        const jobs = Array.from(cells[1].querySelectorAll('a.link_job')).map((a) =>
          a.textContent.trim()
        );

        result[major] = jobs;
      });

      return result;
    });

    await browser.close();
    return { scores, topValues, jobsByMajor };
  } catch (err) {
    console.error('Puppeteer 렌더링 실패:', err.message);
    await browser.close();
    return { scores: [], topValues: [], jobsByMajor: {} };
  }
}
