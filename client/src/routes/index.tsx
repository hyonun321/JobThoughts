import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import TestPage from '../pages/TestPage';
import ResultPage from '../pages/ResultPage';
import JobListPage from '../pages/JobListPage';
import DevPage from '../pages/DevPage';

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
    path: '/dev',
    element: <DevPage />,
  },
]);

export default router;
