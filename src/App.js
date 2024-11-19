import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import DefLayout from './components/layouts/DefLayout';
import NavLayout from './components/layouts/NavLayout';
import PageEmpty from './components/pages/PageEmpty';
import PageLogin from './components/pages/PageLogin';
import PageMain from './components/pages/PageMain';
import PageOpRateCst from './components/pages/PageOpRateCst';
import PageUseParam from './components/pages/PageUseParam';
/*
npm install -g json-server // json 서버 설치
json-server --watch ./src/db/data.json --port 3001 // json 서버 스타트
*/

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<NavLayout />}>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<PageMain />} />
              <Route path="/op_rate_cst" element={<PageOpRateCst />} />
              <Route path="/use_param/:id" element={<PageUseParam />} />
              <Route path="/*" element={<PageEmpty />} />
            </Route>
          </Route>
          <Route element={<DefLayout />}>
            <Route path="/login" element={<PageLogin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
