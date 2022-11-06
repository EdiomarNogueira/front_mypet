import React from 'react';
import { MainRoutes } from './routes/MainRoutes';
import styles from './styles_global.module.css';

const App = () => {

  return (
    <div className={styles.background_geral}>
      <MainRoutes />  
    </div>
  )
}

export default App;