import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import Home from './Home'
import './../reset.css'

export default function() {
  return (
    <div className={styles.normal}>
      <Home />
      <ul className={styles.list}>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            {formatMessage({ id: 'index.start' })}
          </a>
        </li>
      </ul>
    </div>
  );
}
