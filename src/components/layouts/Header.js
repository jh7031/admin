import '../../App.css';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import homeImg from '../../public/images/home.png';
import logoImg from '../../public/images/logo.png';
import { useRecoilState } from 'recoil';
import { UserAtom } from '../../contexts/userAtom';
import { useId } from 'react';

function Header() {
  const [userInfo, setUserInfo] = useRecoilState(UserAtom);
  const id = useId();

  // 로그아웃
  function handleLogout() {
    if (userInfo.userId) {
      setUserInfo({ userId: '', role: '', token: '' });
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles['header-wrapper']}>
        <div className={styles.logo}>
          <Link to={'/'}>
            <img src={logoImg} alt="홈 페이지" />
          </Link>
        </div>
        <div className={styles.toplink}>
          <ul>
            <li id={id + 'home'}>
              <Link to={'/'}>
                <img src={homeImg} alt="GM 솔루션 홈 페이지" />
              </Link>
            </li>
            <li id={id + 'black'}> </li>
            <li id={id + 'loginout'} onClick={handleLogout}>
              <Link to={'/'}>{userInfo.userId ? '로그아웃' : '로그인'}</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
