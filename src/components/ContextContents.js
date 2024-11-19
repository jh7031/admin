import styles from './ContextContents.module.css';
import { Typography } from 'antd';

function ContextContents(prop) {
  return (
    <div className={styles.context}>
      <Typography.Text>{prop.contents}</Typography.Text>
    </div>
  );
}

export default ContextContents;
