import React from 'react';
import { MainRoutes } from './routes/MainRoutes';
import styles from './styles_global.module.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <div className={styles.background_geral}>
      <MainRoutes />  
    </div>
  )
}

export default App;