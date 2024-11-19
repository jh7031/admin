import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserAtom } from '../contexts/userAtom';

function PrivateRoute() {
  // 리코일 로그인 전역변수 참조
  const [userInfo] = useRecoilState(UserAtom);

  // 로그인 된 경우
  if (userInfo.userId) {
    return <Outlet />;
  }

  // 미인증 시
  return <Navigate replace to="/login" />;
}

export default PrivateRoute;
