import '../../App.css';
import styles from './MainLayout.module.css';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
}

export default MainLayout;
