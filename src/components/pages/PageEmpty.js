/**
 * 사용자가 서비스 불가 url로 진입한 경우 보여주는 페이지
 */
import { Link } from 'react-router-dom';

function PageEmpty() {
  return (
    <>
      <h2>잘못된 접근입니다.</h2>
      <Link to="/">돌아가기</Link>
    </>
  );
}

export default PageEmpty;
