/**
 * Login Page: 로그인이 필요한 서비스 접근 시 router => redirection 됨
 *  - 로그인 성공 시 전역 세션 스토리지에 사용자 아이디, role, token 저장
 */
import styles from './PageLogin.module.css';
import { useNavigate, useNavigationType } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserAtom } from '../../contexts/userAtom';
import useDebounce from '../../hooks/useDebounce';
import { useEffect, useId, useState } from 'react';
import callLogin from '../../utils/callLogin';

/*
id 속성 - 고유한 식별을 목적으로 하는 경우 사용
 - lable - input, 표와 표 설명 연결
class 속성 - css 쿼리문 및 재사용을 목적으로 하는 경우 사용
 - 여러/한 영역에서 중복 정의 허용
name 속성 - form 컨트롤 요소의 값(value)을 서버로 전송하기 위해 필요한 속성
*/

function PageLogin(props) {
  const [userInfo, setUserInfo] = useRecoilState(UserAtom);
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState(null);
  const [loginFaultCheck, setLoginFaultCheck] = useState(false); // 로그인 결과(실패) 체크
  const [isLogined, setIsLogined] = useState(userInfo.userId ? true : false);
  const id = useId();

  const navigate = useNavigate();
  const navigationType = useNavigationType;

  // 렌더링 후 호출되어 라우트 실행
  useEffect(() => {
    if (isLogined) {
      if (navigationType === 'PUSH') {
        navigate(-1); // redirect로 왔다면 이전 페이지로
      } else {
        navigate('/');
      }
    }
  }, [isLogined, navigationType, navigate]);

  function login() {
    // HTML.body 생성
    const body = { userId, password };
    const result = callLogin('login', body);

    if (result.ok) {
      // ------------------------------------------------------------
      // 전역 세션 스토리지에 사용자 아이디, role, token 저장
      setUserInfo({
        ...userInfo,
        userId: result.userId,
        role: result.role,
        token: result.token,
      });

      // 로그인 결과(실패) 설정
      setLoginFaultCheck(false);
      setIsLogined(true);
    } else {
      // 로그인 결과(실패) 설정
      setLoginFaultCheck(true);
      setIsLogined(false);
    }
  }

  // 로그인 연속 클릭 방지 디바운스 적용
  const handleLoginEvent = useDebounce(login, 100);

  return (
    <>
      <div className={styles.background}></div>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          handleLoginEvent();
        }}
      >
        <h3 className={styles.h3}>GM Solution Admin</h3>
        <label htmlFor={id + 'id'} className={styles.label}>
          사용자 아이디
        </label>
        <input
          type="text"
          id={id + 'id'}
          className={styles.input}
          placeholder="user id"
          onChange={(event) => {
            // 사용자 아이디 변경 저장
            setUserId(event.target.value);
            if (loginFaultCheck) {
              // 로그인 결과(에러) 리셋
              setLoginFaultCheck(false);
            }
          }}
        />
        <label htmlFor={id + 'passwrod'} className={styles.label}>
          비밀번호
        </label>
        <input
          type="password"
          id={id + 'passwrod'}
          className={styles.input}
          placeholder="Password"
          onChange={(event) => {
            // 패스워드 변경 저장
            setPassword(event.target.value);
            if (loginFaultCheck) {
              // 로그인 결과(에러) 리셋
              setLoginFaultCheck(false);
            }
          }}
        />
        {loginFaultCheck && (
          <label className={styles.errLabel}>
            사용자 아이디 / 비밀번호가 틀렸습니다.
          </label>
        )}
        {!loginFaultCheck && (
          <label className={styles.infoLabel}>로그인해 주세요.</label>
        )}
        <button type="submit" className={styles.button}>
          Log In
        </button>
      </form>
    </>
  );
}

export default PageLogin;
