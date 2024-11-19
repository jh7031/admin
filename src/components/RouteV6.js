import NavLayout from './layouts/NavLayout';
import PageEmpty from './pages/PageEmpty';
import PageMain from './pages/PageMain';
import PageOpRateCst from './pages/PageOpRateCst';

/*
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouteV6 } from './components/RouteV6';

// createBrowserRouter로 경로 지정
const RouterObject = createBrowserRouter(RouteV6);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider
        router={RouterObject}
        future={{ v7_startTransition: true }}
      />
    </RecoilRoot>
  </React.StrictMode>
);
*/

export const RouteV6 = [
  {
    path: '/',
    element: <NavLayout />,
    children: [
      {
        index: true,
        element: <PageMain />,
        label: 'main',
      },
      {
        path: '/op_rate_cst',
        element: <PageOpRateCst />,
        label: '가동율현황',
      },
      {
        path: '/*',
        element: <PageEmpty />,
        label: '빈 페이지',
      },
    ],
  },
];
