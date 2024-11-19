import '../../App.css';
import styles from './DefLayout.module.css';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import MainLayout from './MainLayout';

function DefLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <MainLayout>
        <Outlet />
      </MainLayout>
      <Footer />
    </div>
  );
}

export default DefLayout;
