import React, { Suspense } from 'react'
import { AppRouter } from './providers/router';
import { useTheme } from 'app/providers/ThemeProvider/';
import { Navbar } from 'widgets/Navbar';
import { classNames } from 'shared/lib/classNames/classNames';
import './styles/index.scss';
import { Sidebar } from 'widgets/Sidebar';
import { useTranslation } from 'react-i18next';



const Component = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>{t('Тестовый перевод')}</div>
  )
}

const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">

        <Navbar />
        <Component />
        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>

      </Suspense>
    </div>
  )
}

export default App;
