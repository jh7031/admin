import '../../App.css';
import styles from './NavLayout.module.css';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import MainLayout from './MainLayout';
import NavBar from './NavBar';

function NavLayout() {
  const navigate = useNavigate();
  function handleRoute(key) {
    navigate('/' + key);
  }

  return (
    <div className={styles.layout}>
      <Header />
      <NavBar onRoute={handleRoute} />
      <MainLayout>
        <Outlet />
      </MainLayout>
      <Footer />
    </div>
  );
}

export default NavLayout;
