import { hot } from 'react-hot-loader/root';
import React from 'react';
import reactDOM from 'react-dom';

import styles from './index.scss';
import url from './assets/images/81139df0-3d99-41b5-8076-007608b8a8c3_xls87dfd00a-8485-44d7-80bb-e4d7bd35af01.png';

console.log(url);
if (process.env.NODE_ENV === 'production') {
  console.log(author);
}
// window.address = 'a';
const App = hot(() => (
  <div>
    <h1 className={styles.appContainer}>9527</h1>
    <img src={url} />
  </div>
));

reactDOM.render(<App />, document.getElementById('root'));
