import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import TestPage from '../pages/TestPage';
import ResultPage from '../pages/ResultPage';
import JobListPage from '../pages/JobListPage';
import JobDetailPage from '../pages/JobDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
  {
    path: '/result',
    element: <ResultPage />,
  },
  {
    path: '/jobs',
    element: <JobListPage />,
  },
  {
    path: '/jobs/:jobId',
    element: <JobDetailPage />,
  },
]);

export default router;
